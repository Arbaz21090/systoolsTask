import { Select } from "antd";
import React, { useState } from "react";
import * as xlsx from "xlsx";

const { Option } = Select;

const Task = () => {
  const [excelData, setExcelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records =
    currentPage === "all" ? excelData : excelData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(excelData.length / recordsPerPage);

  const pageNumbers = ["all", ...Array.from({ length: totalPages }, (_, i) => i + 1)];

  const readExcelFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const excelfile = xlsx.read(data, { type: "array" });
    const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
    const exceljson = xlsx.utils.sheet_to_json(excelsheet);
    setExcelData(exceljson);
    setCurrentPage(1); // Reset to the first page when new data is loaded
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <h1>File</h1>
      <div>
        <input
          type="file"
          className="form-control w-25 m-auto"
          onChange={(e) => readExcelFile(e)}
        />

        <Select
          placeholder="Select Page"
          value={currentPage}
          onChange={(value) => handlePageChange(value)}
          style={{
            width: "25%",
          }}
        >
          {pageNumbers.map((page) => (
            <Option key={page} value={page}>
              {page === "all" ? "All" : page}
            </Option>
          ))}
        </Select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Column Desciption</th>
            <th>Possible values</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, i) => (
            <tr key={i}>
              <td>{currentPage === "all" ? i + 1 : (currentPage - 1) * recordsPerPage + i + 1}</td>
              <td>{item.name}</td>
              <td>{item.cdescription}</td>
              <td>{item.values}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Task;

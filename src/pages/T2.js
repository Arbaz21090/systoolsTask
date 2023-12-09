/** @format */

import { Input, Select } from "antd";
import React, { useState } from "react";
import * as xlsx from "xlsx";

/** @format */

const { Option } = Select;

const Task = () => {
  const [excelData, setExcelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const recordsPerPage = 10;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const filteredRecords = excelData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );
  const records =
    currentPage === "all"
      ? filteredRecords
      : filteredRecords.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const pageNumbers = [
    "all",
    ...Array.from({ length: totalPages }, (_, i) => i + 1),
  ];

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

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search value changes
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
            marginRight: "10px",
          }}
        >
          {pageNumbers.map((page) => (
            <Option key={page} value={page}>
              {page === "all" ? "All" : page}
            </Option>
          ))}
        </Select>

        <Input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearch}
          style={{
            width: "25%",
          }}
        />
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
              <td>
                {currentPage === "all"
                  ? i + 1
                  : (currentPage - 1) * recordsPerPage + i + 1}
              </td>
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

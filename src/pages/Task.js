/** @format */

import { Select } from "antd";
import React, { useState } from "react";
import * as xlsx from "xlsx";

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

/** @format */

const Option = "Select";
const Task = () => {
  const [excelData, setExcelData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = excelData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(excelData.length / recordsPerPage);

  const numbers = [...Array(npage + 1).keys()].slice(1);

  const readExcelFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const excelfile = xlsx.read(data, { type: "array" });
    const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
    const exceljson = xlsx.utils.sheet_to_json(excelsheet);
    setExcelData(exceljson);
  };

  const changeCpage = (id) => {
    setCurrentPage(id);
  };

  return (
    <>
      <h1>File</h1>
      <div className="row justify-content-center">
        <div className="col-4">
          <input
            type="file"
            className="form-control w-50 m-auto"
            onChange={(e) => readExcelFile(e)}
          />
        </div>
        <div className="col-4">
          <Select
            placeholder="search by type"
            value={currentPage}
            onChange={(value) => changeCpage(value)}
            style={{
              width: "50%",
            }}
          >
            {numbers.map((n, i) => (
              <Option>{n}</Option>
            ))}
          </Select>
        </div>
        <div className="col-4"></div>
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
              <td>{(currentPage - 1) * recordsPerPage + i + 1}</td>
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

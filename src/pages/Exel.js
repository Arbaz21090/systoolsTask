/** @format */

import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
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

const Exel = () => {
  const [excelData, setExcelData] = useState([]);
  const [records, setRecords] = useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Excel pdf",
    onAfterPrint: () => alert("save"),
  });

  const readExcel = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer(file);
    const excelfile = xlsx.read(data);
    const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
    const exceljson = xlsx.utils.sheet_to_json(excelsheet);
    console.log(exceljson);
    setExcelData(exceljson);
    setRecords(exceljson);
    console.log("setrecord", exceljson);
  };
  const filter = (e) => {
    setRecords(
      excelData.filter((f) => f.name.toLowerCase().includes(e.target.value))
    );
  };
  return (
    <>
      <input
        type="file"
        className="form-control"
        name="exelfile"
        onChange={(e) => readExcel(e)}
      />
      <button className="btn btn-success m-3" onClick={handlePrint}>
        Download data
      </button>
      <input
        type="text"
        className="form-control w-25 m-auto"
        placeholder="Search"
        onChange={filter}
      />
      <div ref={componentRef}>
        {excelData.length > 1 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Class</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {records?.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.Name}</td>
                  <td>{item.Age}</td>
                  <td>{item.Class}</td>
                  <td>{item.Address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Exel;

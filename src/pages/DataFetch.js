/** @format */

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

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

const DataFetch = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const Datafetch = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    setData(data);
    console.log(data);
  };
  useEffect(() => {
    Datafetch();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "User Data",
    onAfterPrint: () => alert("Data saved in pdf"),
  });
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const chageCPage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <h2> Fetch Data from Api</h2>
      <button className="btn btn-success" onClick={handlePrint}>
        download here
      </button>
      <div ref={componentRef}>
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Body</th>
            </tr>
          </thead>

          {records?.map((item, i) => {
            return (
              <>
                <tbody>
                  <tr key={i}>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.body}</td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
        {
          <ul className="pagination pb-5 text-center">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>

            {numbers?.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a href="#" className="page-link" onClick={() => chageCPage(n)}>
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        }
      </div>
    </>
  );
};

export default DataFetch;

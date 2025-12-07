import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3001";

const Mobile = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(baseURL);
    setData(response.data);
  };

  useEffect(() => {
    fetchData()
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <table className="table table-bordered text-center mt-3">
        <thead>
          <tr>
            <th colSpan={5}>
              <h3>MOBILE LIST</h3>
            </th>
          </tr>
          <tr>
            <th>Model</th>
            <th>Brand</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mobile) => (
            <tr key={mobile.id}>
              <td>{mobile.model}</td>
              <td>{mobile.brand}</td>
              <td>${mobile.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mobile;

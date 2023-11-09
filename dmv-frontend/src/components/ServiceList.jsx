import React, { useState, useEffect } from "react";
import "./css/dashboard.css";

function ServiceList() {
  const [services, setServices] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5555/api/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServices(data);
      });
  }, []);
  return (
    <div className="clients">
      <table>
        <thead>
          <tr>
            <th
              style={{
                cursor: "pointer",
              }}
            >
              ✅
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Jobs</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr
              style={{
                color: service.isActive ? "green" : "red",
                cursor: "pointer",
              }}
              onClick={() => {
                if (selectedIds.includes(service.id)) {
                  setSelectedIds(selectedIds.filter((id) => id !== service.id));
                } else {
                  setSelectedIds([...selectedIds, service.id]);
                }
              }}
              key={service.id}
            >
              <td>
                <input type="checkbox" />
              </td>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.Job?.length}</td>
              <td> {service.isActive ? "Active" : "Inactive"}</td>
              <td>{service.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceList;

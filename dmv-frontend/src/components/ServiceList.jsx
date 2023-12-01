import React, { useState, useEffect } from "react";
import "./css/dashboard.css";

function ServiceList() {
  const [services, setServices] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

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

  const handleActive = (e) => {
    const ids = selectedIds;
    fetch("http://localhost:5555/api/services/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ids,
        isActive: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // find the service that was updated in the services array
        // update the isActive property of that service

        let service = services.find((service) => service.id === data.id);
        console.log(service);
      });
  };
  const handleInactive = (e) => {
    const ids = selectedIds;
    fetch("http://localhost:5555/api/services/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ids,
        isActive: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="clients">
      <button
        style={{ margin: "10px", backgroundColor: "green" }}
        onClick={handleActive}
      >
        Mark as Active
      </button>
      <button
        style={{ margin: "10px", backgroundColor: "orange" }}
        onClick={handleInactive}
      >
        Mark as Inactive
      </button>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => {
                setIsSelectAll(!isSelectAll);
                if (!isSelectAll) {
                  setSelectedIds(services.map((service) => service.id));
                } else {
                  setSelectedIds([]);
                }
              }}
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
          {services?.map((service) => (
            <tr
              style={{
                cursor: "pointer",
              }}
              onChange={(e) => {
                console.log(e.target.checked);
                if (e.target.checked) {
                  setSelectedIds([...selectedIds, service.id]);
                } else {
                  setSelectedIds(selectedIds.filter((id) => id !== service.id));
                }

                console.log(selectedIds);
              }}
              key={service.id}
            >
              <td>
                <input
                  checked={selectedIds.includes(service.id)}
                  type="checkbox"
                />
              </td>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.Job?.length}</td>
              <td
                style={{
                  color: service.isActive ? "green" : "red",
                }}
              >
                {" "}
                {service.isActive ? "Active" : "Inactive"}
              </td>
              <td>{service.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        {selectedIds.map((id) => {
          return <span>{id}</span>;
        })}
      </p>
    </div>
  );
}

export default ServiceList;

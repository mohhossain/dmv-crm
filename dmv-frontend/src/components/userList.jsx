import React, { useState, useEffect } from "react";
import { useClientContext } from "../context/clientContext";
import "./css/dashboard.css";

function UserList() {
  const { clients } = useClientContext();
  const { getClients } = useClientContext();
  // const [clientList, setClientList] = useState(getClients());

  useEffect(() => {
    getClients();
    console.log(clients);
  }, []);

  const convertDate = (date) => {
    const createDate = new Date(date);
    const formattedDate = createDate.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
  };

  return (
    <div className="clients">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Last Service</th>
            <th>Service Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              <td
                style={{
                  color: "grey",
                }}
              >
                {user.Job[0]?.service?.name
                  ? user.Job[0]?.service?.name
                  : "None"}
              </td>
              <td
                style={{
                  color: "grey",
                }}
              >
                {user.Job[0]?.service
                  ? convertDate(user.Job[0]?.createdAt)
                  : "None"}
              </td>

              <td>
                <div
                  className="action-buttons"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p>✏️</p>
                  <p>📄</p>
                  <p>🗑️</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

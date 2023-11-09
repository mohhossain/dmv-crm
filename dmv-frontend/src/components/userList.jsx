import React, { useState, useEffect } from "react";
import { useClientContext } from "../context/clientContext";
import "./css/dashboard.css";
import Search from "./Search";

function UserList() {
  const { clients } = useClientContext();
  const { getClients } = useClientContext();
  // const [clientList, setClientList] = useState(getClients());
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (searchTerm) => {
    console.log(searchTerm);
    setSearchTerm(searchTerm);
    // const filteredClients = clientList.filter((client) => {
    //   return client.name.toLowerCase().includes(searchTerm.toLowerCase());
    // });
    // setClientList(filteredClients);
  };

  const filterClients = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
    <>
      <Search onSearch={onSearch} />
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
              <th>Referral</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterClients.map((user) => (
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

                <td>N/A</td>

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
    </>
  );
}

export default UserList;

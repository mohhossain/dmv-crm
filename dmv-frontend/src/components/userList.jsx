import React, { useState, useEffect } from "react";
import { useClientContext } from "../context/clientContext";

function UserList() {
  const { clients } = useClientContext();
  const { getClients } = useClientContext();
  // const [clientList, setClientList] = useState(getClients());

  useEffect(() => {
    getClients();
    console.log(clients);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone Number</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;

import React, { useState, useEffect } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5555/api/transactions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTransactions(data);
      });
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
    <div>
      <h1>Transactions</h1>
      <div className="clients">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Service</th>
              <th>Client</th>
              <th>Transaction Date</th>
              <th>Transaction Type</th>
              <th>Transaction Amount</th>
              <th>Payment Status</th>
              <th>Pay date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr>
                <td>{transaction.Payment?.id}</td>
                <td>{transaction.service?.name}</td>
                <td>{transaction.client?.name}</td>
                <td>{convertDate(transaction.Payment.createdAt)}</td>
                <td>{transaction.Payment.method}</td>
                <td>{transaction.Payment.amount}</td>
                <td>{transaction.Payment.isPaid ? "✅" : "⏳"}</td>
                <td>
                  {transaction.Payment.isPaid === false
                    ? "N/A"
                    : convertDate(transaction.Payment.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;

import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";

import { useJobContext } from "../context/jobContext";

function NewJobForm() {
  const { addJob } = useJobContext();
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5555/api/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const job = {
      serviceId: e.target.service.value,
      clientId: e.target.client.value,
      amount: e.target.amount.value,
    };

    addJob(job);

    // fetch("http://localhost:5555/api/jobs", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify(job),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  };

  return (
    <div>
      <form className="new-user-form" onSubmit={handleSubmit}>
        <select name="service" id="service" required>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>

        <input type="text" name="client" id="client" placeholder="Client" />
        <input type="text" name="amount" id="amount" placeholder="Amount" />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default NewJobForm;

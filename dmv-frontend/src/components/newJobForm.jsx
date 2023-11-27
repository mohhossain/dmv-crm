import React, { useState, useEffect } from "react";
// import Popup from "reactjs-popup";
import "./css/forms.css";

import { useJobContext } from "../context/jobContext";

function NewJobForm() {
  const { addJob } = useJobContext();
  const { message } = useJobContext();
  console.log(message);
  const [services, setServices] = useState([]);
  // get all the list of services
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
      note: e.target.notes.value,
    };

    addJob(job);
  };

  return (
    <div>
      <form className="job-form" onSubmit={handleSubmit}>
        <h1>Add New Job</h1>
        <select name="service" id="service" required>
          {services.map((service) =>
            service.isActive ? (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ) : null
          )}
        </select>

        <input type="text" name="client" id="client" placeholder="Client" />
        <input type="text" name="amount" id="amount" placeholder="Amount" />

        <textarea type="text" name="notes" id="notes" placeholder="Notes" />

        <input type="submit" value="Submit" />
        <p>{message}</p>
      </form>
    </div>
  );
}

export default NewJobForm;

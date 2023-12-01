import React, { useState, useEffect } from "react";

import { useJobContext } from "../context/jobContext";
import Note from "./micro-components/Note";
import convertDate from "./micro-components/dateConverter.js";

function JobDetails({ job }) {
  const [jobDetails, setJobDetails] = useState(job);
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    amount: job.Payment.amount,
    method: job.Payment.method,
    isPaid: job.Payment.isPaid,
  });

  const { fetchJobs } = useJobContext();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`http://localhost:5555/api/notes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        note: e.target.note.value,
        jobId: job.id,
      }),
    });

    const data = await res.json();

    if (data) {
      setJobDetails({
        ...jobDetails,
        Note: [...jobDetails.Note, data],
      });
    }
  }

  async function handlePending() {
    const res = await fetch(`http://localhost:5555/api/jobs/`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: job.id,
        isPending: !jobDetails.isPending,
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      setJobDetails(data);
      console.log(jobDetails);
      fetchJobs();
    }
  }

  async function handleEdit() {
    const res = await fetch(`http://localhost:5555/api/jobs/details`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: job.id,
        amount: parseFloat(editData.amount),
        method: editData.method,
        isPaid: Boolean(editData.isPaid),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJobDetails(data);
        setIsEditing(false);
      });
  }

  return (
    <div className="job-details">
      <h1>Job Details</h1>

      <p>
        <strong>Service:</strong> {jobDetails.service.name}
      </p>
      <p>
        <strong>Client: </strong>
        {jobDetails.client.name}
      </p>
      {isEditing ? (
        <p>
          <strong>Amount</strong>{" "}
          <input
            onChange={(e) =>
              setEditData({ ...editData, amount: e.target.value })
            }
            type="text"
            name="amount"
            id="amount"
            placeholder={jobDetails.Payment?.amount}
          />
        </p>
      ) : (
        <p>
          {" "}
          <strong>Amount: </strong> {jobDetails.Payment.amount}$
        </p>
      )}

      {isEditing ? (
        <p>
          <strong>Payment method: </strong>
          <select
            name="method"
            id="method"
            onChange={(e) =>
              setEditData({ ...editData, method: e.target.value })
            }
          >
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="credit">Card</option>
          </select>
        </p>
      ) : (
        <p>
          <strong>Payment method: </strong>{" "}
          {jobDetails.Payment?.method ? job.Payment.method : "None"}
        </p>
      )}

      {isEditing ? (
        <p>
          <strong>Payment status: </strong>
          <select
            name="method"
            id="method"
            onChange={(e) =>
              setEditData({ ...editData, isPaid: e.target.value })
            }
          >
            <option value={true}>Paid</option>
            <option value={false}>Not paid</option>
          </select>
        </p>
      ) : (
        <p>
          <strong>Payment status: </strong>{" "}
          {jobDetails.Payment.isPaid ? "✅" : "⏳"}
        </p>
      )}

      <p>
        <strong>Job date: </strong>
        {convertDate(job.createdAt)}
      </p>
      <div style={{ display: "flex" }}>
        {jobDetails?.isPending ? (
          <button
            onClick={handlePending}
            style={{ margin: "10px", backgroundColor: "green" }}
          >
            Mark as Complete
          </button>
        ) : (
          <button
            onClick={handlePending}
            style={{ margin: "10px", backgroundColor: "orange" }}
          >
            Mark as Incomplete
          </button>
        )}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            style={{ margin: "10px", backgroundColor: "orange" }}
          >
            Edit
          </button>
        ) : (
          <button onClick={handleEdit} className="enable-save">
            Save
          </button>
        )}

        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            style={{ margin: "10px", backgroundColor: "red" }}
          >
            Cancel
          </button>
        )}
      </div>

      <p>Notes:</p>
      {jobDetails?.Note?.map((note) => (
        <Note note={note} key={note.id} />
      ))}
      <form onSubmit={handleSubmit}>
        <textarea type="text" name="note" id="note" placeholder="Add a note" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default JobDetails;

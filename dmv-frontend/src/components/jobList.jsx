import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import NewJobForm from "./newJobForm";

import { useJobContext } from "../context/jobContext";

function JobList() {
  const { jobs } = useJobContext();
  const { fetchJobs } = useJobContext();
  useEffect(() => {
    fetchJobs();
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

  //   console.log(formattedDate); // Output: 1:32 PM
  return (
    <div>
      <Popup trigger={<button> Add New Job </button>} modal nested>
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> New Job Form </div>
            <div className="content">
              {" "}
              <NewJobForm />
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={() => {
                  console.log("modal closed ");
                  close();
                }}
              >
                close modal
              </button>
            </div>
          </div>
        )}
      </Popup>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Client</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.service?.name}</td>
              <td>{job.client?.name}</td>
              <td>{job.isPending ? "Pending" : "Complete"}</td>
              <td>{job.Payment?.amount}</td>
              <td>{job.Payment?.isPaid ? "Pending" : "Received"}</td>
              <td>{convertDate(job.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobList;

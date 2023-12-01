import React, { useState, useEffect } from "react";

import { useJobContext } from "../context/jobContext";
import Pending from "./micro-components/Pending";
import Completed from "./micro-components/Completed";
import Popup from "reactjs-popup";
import JobDetails from "./JobDetails";

function JobList() {
  const { jobs } = useJobContext();
  const { fetchJobs } = useJobContext();
  const [sortPending, setSortPending] = useState(false);
  const [sortDate, setSortDate] = useState(false);
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

  const handleStatus = () => {
    setSortPending(!sortPending);
    if (sortPending) {
      jobs.sort((a, b) => {
        return a.isPending - b.isPending;
      });
    } else {
      jobs.sort((a, b) => {
        return b.isPending - a.isPending;
      });
    }
  };

  const handleDate = () => {
    setSortDate(!sortDate);
    if (sortDate) {
      jobs.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else {
      jobs.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
    console.log(jobs);
  };

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

  //   console.log(formattedDate); // Output: 1:32 PM
  return (
    <div className="jobs">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Client</th>
            <th onClick={handleStatus}>Status</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th onClick={handleDate}>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.service?.name}</td>
              <td>{job.client?.name}</td>
              <td>{job.isPending ? <Pending /> : <Completed />}</td>
              <td>{job.Payment?.amount}</td>
              <td>{job.Payment?.isPaid ? "Pending" : "Received"}</td>
              <td>{convertDate(job.createdAt)}</td>
              <td>
                <Popup
                  trigger={<button className="button"> View </button>}
                  modal
                  nested
                >
                  <JobDetails job={job} />
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobList;

import React, { createContext, useState, useEffect } from "react";

export const JobContext = createContext();
export const useJobContext = () => React.useContext(JobContext);

export const JobContextProvider = (props) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5555/api/jobs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setJobs(data);
  };

  const addJob = async (job) => {
    const res = await fetch("http://localhost:5555/api/jobs", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(job),
    });
    const data = await res.json();
    console.log(data);
    setJobs([...jobs, data]);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, fetchJobs }}>
      {props.children}
    </JobContext.Provider>
  );
};

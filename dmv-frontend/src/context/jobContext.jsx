import React, { createContext, useState, useEffect } from "react";

export const JobContext = createContext();
export const useJobContext = () => React.useContext(JobContext);

export const JobContextProvider = (props) => {
  const [jobs, setJobs] = useState([]);

  const [message, setMessage] = useState("");

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

    if (res.status === 400) {
      const error = await res.json();
      setMessage("❌ Information not valid");
      return;
    }

    const data = await res.json();

    console.log(data);
    setJobs([...jobs, data]);
    setMessage("✅ Job added successfully");
  };

  return (
    <JobContext.Provider value={{ jobs, message, addJob, fetchJobs }}>
      {props.children}
    </JobContext.Provider>
  );
};

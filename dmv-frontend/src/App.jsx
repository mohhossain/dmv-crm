import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import Signup from "./components/Signup";
import { ClientProvider } from "./context/clientContext";
import { useUserContext } from "./context/userContext";
import { JobContextProvider } from "./context/jobContext";
import NewUserForm from "./components/newUserForm";
import NewJobForm from "./components/newJobForm";
import "./components/css/dashboard.css";
import UserList from "./components/userList";
import JobList from "./components/jobList";
import Sidebar from "./components/Sidebar";
import NewServiceForm from "./components/NewServiceForm";
import ServiceList from "./components/ServiceList";
import Transactions from "./components/Transactions";

function App() {
  const token = localStorage.getItem("token");
  const { verify } = useUserContext();
  const { user } = useUserContext();

  useEffect(() => {
    verify();
    console.log(user);
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="body">
        <ClientProvider>
          <JobContextProvider>
            <Routes>
              {user ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/adduser" element={<NewUserForm />} />
                  <Route path="/addjob" element={<NewJobForm />} />
                  <Route path="/clients" element={<UserList />} />
                  <Route path="/jobs" element={<JobList />} />
                  <Route path="/addservice" element={<NewServiceForm />} />
                  <Route path="/services" element={<ServiceList />} />
                  <Route path="/transactions" element={<Transactions />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/signin" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </>
              )}
            </Routes>
          </JobContextProvider>
        </ClientProvider>
      </div>
    </div>
  );
}

export default App;

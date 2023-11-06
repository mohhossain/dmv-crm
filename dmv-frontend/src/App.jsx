import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import Signup from "./components/Signup";
import { ClientProvider } from "./context/clientContext";
import { useUserContext } from "./context/userContext";
import { JobContextProvider } from "./context/jobContext";

function App() {
  const token = localStorage.getItem("token");
  const { verify } = useUserContext();
  const { user } = useUserContext();

  useEffect(() => {
    verify();
    console.log(user);
  }, []);

  return (
    <>
      <ClientProvider>
        <JobContextProvider>
          <Routes>
            {user ? (
              <Route path="/" element={<Dashboard />} />
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
    </>
  );
}

export default App;

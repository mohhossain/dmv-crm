import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import Signup from "./components/Signup";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Routes>
        {token ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

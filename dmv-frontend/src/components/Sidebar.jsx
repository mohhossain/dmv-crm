import React from "react";

function Sidebar() {
  return (
    <div className="sidebar">
      <h1>Menu</h1>

      <button
        onClick={() => {
          window.location.href = "/clients";
        }}
      >
        Clients
      </button>
      <button
        onClick={() => {
          window.location.href = "/jobs";
        }}
      >
        Jobs
      </button>

      <button
        onClick={() => {
          window.location.href = "/services";
        }}
      >
        Services
      </button>
      <button
        onClick={() => {
          window.location.href = "/adduser";
        }}
      >
        Add Client
      </button>
      <button
        onClick={() => {
          window.location.href = "/addjob";
        }}
      >
        Add Job
      </button>
      <button
        onClick={() => {
          window.location.href = "/addservice";
        }}
      >
        Add Service
      </button>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Dashboard
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;

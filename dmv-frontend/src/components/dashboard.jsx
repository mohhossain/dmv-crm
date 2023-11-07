import React from "react";
import UserList from "./userList";
import NewUserForm from "./newUserForm";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useUserContext } from "../context/userContext";
import JobList from "./jobList";
import "./css/dashboard.css";
function Dashboard() {
  const { user } = useUserContext();
  return (
    <div className="dashboard">
      <h2> Logged in as {user.name} </h2>
      {/* logout button */}
    </div>
  );
}

export default Dashboard;

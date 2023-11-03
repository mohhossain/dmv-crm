import React from "react";
import UserList from "./userList";
import NewUserForm from "./newUserForm";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
function Dashboard() {
  return (
    <div className="dashboard">
      {/* logout button */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
      {/* open modal center of the screen */}
      <Popup trigger={<button> Add New User </button>} modal nested>
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> New User Form </div>
            <div className="content">
              {" "}
              <NewUserForm />
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

      <UserList />
    </div>
  );
}

export default Dashboard;

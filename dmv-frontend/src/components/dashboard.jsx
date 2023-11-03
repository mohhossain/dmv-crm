import React from "react";
import { Button } from "@mui/material";

function dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button
        variant="contained"
        href="/signin"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/signin";
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default dashboard;

import React, { useState } from "react";
import { Button } from "@mui/material";
import UserDetailsModal from "./components/UserDetailsModal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
  });

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (data) => {
    // Perform any additional actions with the form data here
    console.log("Form submitted:", data);
    console.log(formData);
    // Reset the formData state
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      dob: "",
    });
  };

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>User Details Modal</h1>
      <Button variant="contained" onClick={handleOpen}>
        Open Form
      </Button>
      <UserDetailsModal
        open={modalOpen}
        handleClose={handleClose}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;

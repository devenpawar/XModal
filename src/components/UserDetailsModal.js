import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserDetailsModal({ open, handleClose, handleFormSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "", // Initialize dob as an empty string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      dob: "", // Clear the dob field
    });
  };

  const emailTooltip = formData.email.includes("@")
    ? "Enter a valid email address"
    : `Please include an '@' in the email address. ${formData.email} in your email address`;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          variant="h6"
          component="h2"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          Fill Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography style={{ textAlign: "center" }}>Username</Typography>
          <Tooltip title="Enter your full name" placement="top">
            <TextField
              name="name"
              fullWidth
              margin="normal"
              label="Username"
              value={formData.name}
              onChange={handleChange}
            />
          </Tooltip>
          <Typography style={{ textAlign: "center" }}>Email Address</Typography>
          <Tooltip title={emailTooltip} placement="top">
            <TextField
              name="email"
              fullWidth
              margin="normal"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </Tooltip>
          <Typography style={{ textAlign: "center" }}>Phone Number</Typography>
          <Tooltip title="Enter your phone number" placement="top">
            <TextField
              name="phone"
              fullWidth
              margin="normal"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </Tooltip>
          <Typography style={{ textAlign: "center" }}>Date of Birth</Typography>
          <Tooltip title="Select your date of birth" placement="top">
            <TextField
              name="dob"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }} // Ensure label is displayed for date input
              value={formData.dob}
              onChange={handleChange}
            />
          </Tooltip>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, display: "block", margin: "0 auto" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default UserDetailsModal;

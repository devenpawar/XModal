import React, { useState } from "react";
import "./UserDetailsModal.css";
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
    dob: "",
  });

  const [showTooltips, setShowTooltips] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, phone, dob } = formData;
    if (!email.includes("@")) {
      alert("Invalid email");
      return false;
    }
    if (phone.length !== 10) {
      alert("Invalid phone number");
      return false;
    }
    if (new Date(dob) > new Date()) {
      alert("Invalid date of birth");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTooltips(true);
    if (validateForm()) {
      handleFormSubmit(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className="modal">
      <Box sx={style}>
        <Typography
          variant="h6"
          component="h2"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          Fill Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Tooltip
            title={showTooltips && !formData.name ? "Enter your full name" : ""}
            placement="top"
          >
            <TextField
              id="username"
              name="name"
              fullWidth
              margin="normal"
              label="Username"
              value={formData.name}
              onChange={handleChange}
            />
          </Tooltip>
          <Tooltip
            title={
              showTooltips && (!formData.email || !formData.email.includes("@"))
                ? `Please include an '@' in the email address.'${formData.email}'is missing an '@'.`
                : ""
            }
            placement="top"
          >
            <TextField
              id="email"
              name="email"
              fullWidth
              margin="normal"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </Tooltip>
          <Tooltip
            title={
              showTooltips && formData.phone.length !== 10
                ? "Phone number must be 10 digits long"
                : ""
            }
            placement="top"
          >
            <TextField
              id="phone"
              name="phone"
              fullWidth
              margin="normal"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </Tooltip>

          <Tooltip
            title={
              showTooltips && !formData.dob ? "Select your date of birth" : ""
            }
            placement="top"
          >
            <TextField
              id="dob"
              name="dob"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.dob}
              onChange={handleChange}
            />
          </Tooltip>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <button
              className="modal-content submit-button"
              type="submit"
              style={{ padding: "0.5rem", width: "100px", borderRadius: "5px" }}
            >
              Submit
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default UserDetailsModal;

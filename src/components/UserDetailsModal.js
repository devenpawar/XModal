import React, { useState } from "react";
import "./UserDetailsModal.css";
import { Tooltip } from "@mui/material";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "#fff",
  border: "2px solid #000",
  boxShadow: "24px",
  padding: "16px",
  zIndex: 1000,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 999,
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
    const { email, phone, dob } = formData;
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

  if (!open) return null;

  return (
    <>
      <div class="modal" style={overlayStyle} onClick={handleClose} />
      <div class="modal" style={modalStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Fill Details
        </h2>
        <form className="modal-content" onSubmit={handleSubmit}>
          <Tooltip
            title={showTooltips && !formData.name ? "Enter your full name" : ""}
            placement="top"
          >
            <div>
              <label>Username:</label>
              <input
                id="username"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
              />
            </div>
          </Tooltip>
          <Tooltip
            title={
              showTooltips && (!formData.email || !formData.email.includes("@"))
                ? `Please include an '@' in the email address.'${formData.email}' is missing an '@'.`
                : ""
            }
            placement="top"
          >
            <div>
              <label>Email Address:</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
              />
            </div>
          </Tooltip>
          <Tooltip
            title={
              showTooltips && formData.phone.length !== 10
                ? "Phone number must be 10 digits long"
                : ""
            }
            placement="top"
          >
            <div>
              <label>Phone Number:</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
              />
            </div>
          </Tooltip>
          <Tooltip
            title={
              showTooltips && new Date(formData.dob) > new Date()
                ? "Invalid date of birth"
                : ""
            }
            placement="top"
          >
            <div>
              <label>Date of Birth:</label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
              />
            </div>
          </Tooltip>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <button
              className="submit-button"
              type="submit"
              style={{ padding: "0.5rem", width: "100px", borderRadius: "5px" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserDetailsModal;

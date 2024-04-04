import React, { useState } from "react";
import axios from "axios";
import AddStyles from "./AddEmployee.module.css";
import PropTypes from "prop-types";

const AddEmployee = ({ onClose }) => {
 const [addFormOpen, setAddFormOpen] = useState(true);
 const [formData, setFormData] = useState({
    employeeName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    Garage_id: "",
    National_id: "",
    Salary: "",
 });

 const handleCloseAddBtn = () => {
    setAddFormOpen(false);
    onClose();
 };

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  let isValidEmail = false;
 
  // Validate email format if the input name is 'email'
  if (name === 'email') {
     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
     isValidEmail = emailRegex.test(value);
  }
 
  // Update formData state with the new value
  setFormData({
     ...formData,
     [name]: value,
  });
 
  // Optionally, you can set a state to indicate if the email is valid or not
  // This can be used to display validation messages or disable the submit button
  // setEmailValid(isValidEmail);
 };

 const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://raknaapi.azurewebsites.net/api/GarageAdmin/AddStaff",
        formData
      )
      .then((response) => {
        console.log("Employee added successfully:", response.data);
        // Optionally, clear the form or close the modal here
        setFormData({
          employeeName: "",
          userName: "",
          email: "",
          phoneNumber: "",
          Garage_id: "",
          National_id: "",
          Salary: "",
        });
        handleCloseAddBtn();
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
 };

 AddEmployee.propTypes = {
    onClose: PropTypes.func.isRequired,
 };

 return (
    <>
      {addFormOpen && (
        <div className={AddStyles.addModal}>
          <div className={AddStyles.addTitle}>
            <button onClick={handleCloseAddBtn}>
              {/* Add close icon here */}
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <label>
              <b>Add</b>
            </label>
            <input
              required
              type="text"
              name="employeeName"
              placeholder="FullName"
              value={formData.employeeName}
              onChange={handleInputChange}
            />
            <input
              required
              type="text"
              name="userName"
              placeholder="UserName"
              value={formData.userName}
              onChange={handleInputChange}
            />
            <input
              required
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              required
              type="text"
              min="0"
              id="number"
              name="phoneNumber"
              placeholder="phoneNumber"
              maxLength={11}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />
            <input
              required
              type="text"
              min="0"
              id="number"
              name="Garage_id"
              placeholder="Password"
              maxLength={6}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />
            <input
              required
              type="text"
              min="0"
              id="number"
              name="National_id"
              placeholder="National_id"
              maxLength={14}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />
            <input
              required
              type="text"
              min="0"
              id="number"
              name="Salary"
              placeholder="Salary"
              maxLength={11}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />
            <div className={AddStyles.addModelButtons}>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      )}
    </>
 );
};

export default AddEmployee;

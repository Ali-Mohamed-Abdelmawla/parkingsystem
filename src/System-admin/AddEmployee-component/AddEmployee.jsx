// takes time IDK whyyy ??

import React, { useState } from "react";
import axios from "axios";
import AddStyles from "./AddEmployee.module.css";
import PropTypes from "prop-types";
import Swal from 'sweetalert2'
const AddEmployee = ({ onClose }) => {
  const [addFormOpen, setAddFormOpen] = useState(true);
  const accessToken = sessionStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    phoneNumber: "",
    NationalId: "",
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
    if (name === "email") {
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
    console.log(accessToken);
    axios
      .post(
        "https://raknaapi.azurewebsites.net/api/GarageAdmin/AddStaff",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Employee added successfully:", response.data);
        // Optionally, clear the form or close the modal here
        setFormData({
          name: "",
          userName: "",
          email: "",
          phoneNumber: "",
          NationalId: "",
          Salary: "",
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Employee added successfully",
        })
        handleCloseAddBtn();
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to add employee: ${error.response.data}`,
        })
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
              name="name"
              placeholder="name"
              value={formData.name}
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
              value={formData.phoneNumber}
              maxLength={11}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                setFormData({
                  ...formData,
                  phoneNumber: value,
                });
              }}
            />

            <input
              required
              type="text"
              min="0"
              id="number"
              name="NationalId"
              placeholder="NationalId"
              value={formData.NationalId}
              maxLength={14}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                setFormData({
                  ...formData,
                  NationalId: value,
                });
              }}
            />
            <input
              required
              type="text"
              min="0"
              id="number"
              name="Salary"
              placeholder="Salary"
              value={formData.Salary}
              maxLength={11}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                setFormData({
                  ...formData,
                  Salary: value,
                });
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

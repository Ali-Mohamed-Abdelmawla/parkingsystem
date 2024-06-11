 // takes time IDK whyyy ??



import React from "react";
import axios from "axios";
import AddStyles from "./AddEmployee.module.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AddEmployee = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const accessToken = sessionStorage.getItem("accessToken");

  const onSubmit = (data) => {
    axios
      .post(
        "https://raknaapi.azurewebsites.net/api/GarageAdmin/AddStaff",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Employee added successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Employee added successfully",
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to add employee: ${error.response.data}`,
        });
      });
  };

  return (
    <>
      <div className={AddStyles.addModal}>
        <div className={AddStyles.addTitle}>
          <button onClick={onClose}>{/* Add close icon here */}</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <b>Add an Employee</b>
          </label>
          <input
            {...register("name", {
              required: {
                value: true,
                message: "Full name for the user is required",
              },
            })}
            type="text"
            placeholder="name"
          />
          {errors.name && (
            <span className={AddStyles.errorMessage}>
              {errors.name.message}
            </span>
          )}
          <input
            {...register("userName", {
              required: { value: true, message: "User name is required" },
            })}
            type="text"
            placeholder="UserName"
          />
          {errors.userName && (
            <span className={AddStyles.errorMessage}>
              {errors.userName.message}
            </span>
          )}
          <input
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email",
              },
            })}
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <span className={AddStyles.errorMessage}>
              {errors.email.message}
            </span>
          )}
          <input
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "phone number is required",
              },
              minLength: {
                value: 11,
                message: "The entered value should be 11 digits",
              },
              maxLength: {
                value: 11,
                message: "The entered value should be 11 digits",
              },
              pattern: {
                value: /^\d+$/, // Regular expression to match only digits
                message: "The entered value should be a number",
              },
            })}
            type="text"
            placeholder="phoneNumber"
          />
          {errors.phoneNumber && (
            <span className={AddStyles.errorMessage}>
              {errors.phoneNumber.message}
            </span>
          )}
          <input
            {...register("NationalId", {
              required: {
                value: true,
                message: "NationalId is required",
              },
              minLength: {
                value: 14,
                message: "The entered value should be 14 digits",
              },
              maxLength: {
                value: 14,
                message: "The entered value should be 14 digits",
              },
              pattern: {
                value: /^\d+$/, // Regular expression to match only digits
                message: "The entered value should be a number",
              },
            })}
            type="text"
            placeholder="NationalId"
          />
          {errors.NationalId && (
            <span className={AddStyles.errorMessage}>
              {errors.NationalId.message}
            </span>
          )}
          <input
            {...register("Salary", {
              required: {
                value: true,
                message: "Salary is required",
              },
              minLength: 1,
              maxLength: 11,
              pattern: {
                value: /^\d+$/, // Regular expression to match only digits
                message: "The entered value should be a number",
              },
            })}
            type="text"
            placeholder="Salary"
          />
          {errors.Salary && (
            <span className={AddStyles.errorMessage}>
              {errors.Salary.message}
            </span>
          )}
          <div className={AddStyles.addModelButtons}>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </>
  );
};

AddEmployee.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddEmployee;

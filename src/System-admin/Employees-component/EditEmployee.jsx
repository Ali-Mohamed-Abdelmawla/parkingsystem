import React from "react";
import Employeestyle from '../Styles/Employees.module.css';
import { useForm } from "react-hook-form";

function EmployeesModal({ title, onClose, onSubmit, editedEmployee }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (e) => {
    // Assuming you have a way to update the form values in your state
    // For example, if you're using a state variable to hold the form values
    // You would update that state here instead of directly manipulating the DOM
    // This is just a placeholder to show where you'd handle input changes
    console.log(e.target.name, e.target.value);
  };

  return (
    <div className={Employeestyle.editModal}>
      <div className={Employeestyle.editTitle}>
        <button onClick={onClose}>X</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>{title}</label>
        <input
          {...register("Name", {
            required: "Full name is required",
          })}
          type="text"
          placeholder="FullName"
          defaultValue={editedEmployee.Name}
          onChange={handleInputChange}
        />
        {errors.Name && <span className = {Employeestyle.errorMessage}>{errors.Name.message}</span>}
        
        <input
          {...register("userName", {
            required: "User name is required",
            minLength: {
              value: 5,
              message: "Username must be 5 to 20 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username must be 5 to 20 characters long",
            },
          })}
          type="text"
          placeholder="userName"
          defaultValue={editedEmployee.userName}
          onChange={handleInputChange}
        />
        {errors.userName && <span className = {Employeestyle.errorMessage}>{errors.userName.message}</span>}
        
        <input
          {...register("Email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid email",
            },
          })}
          type="text"
          placeholder="Email"
          defaultValue={editedEmployee.Email}
          onChange={handleInputChange}
        />
        {errors.Email && <span className = {Employeestyle.errorMessage}>{errors.Email.message}</span>}
        
        <input
          {...register("phoneNumber", {
            required: "Phone number is required",
            minLength: {
              value: 11,
              message: "The entered value should be 11 digits",
            },
            maxLength: {
              value: 11,
              message: "The entered value should be 11 digits",
            },
            pattern: {
              value: /^\d+$/,
              message: "The entered value should be a number",
            },
          })}
          type="text"
          placeholder="phoneNumber"
          defaultValue={editedEmployee.phoneNumber}
          onChange={handleInputChange}
        />
        {errors.phoneNumber && <span className = {Employeestyle.errorMessage}>{errors.phoneNumber.message}</span>}
        
        <input
          {...register("NationalId", {
            required: "National ID is required",
            minLength: {
              value: 14,
              message: "The entered value should be 14 digits",
            },
            maxLength: {
              value: 14,
              message: "The entered value should be 14 digits",
            },
            pattern: {
              value: /^\d+$/,
              message: "The entered value should be a number",
            },
          })}
          type="text"
          placeholder="National_id"
          defaultValue={editedEmployee.NationalId}
          onChange={handleInputChange}
        />
        {errors.NationalId && <span className = {Employeestyle.errorMessage}>{errors.NationalId.message}</span>}
        
        <input
          {...register("salary", {
            required: "Salary is required",
            minLength: 1,
            maxLength: 11,
            pattern: {
              value: /^\d+$/,
              message: "The entered value should be a number",
            },
          })}
          type="text"
          placeholder="Salary"
          defaultValue={editedEmployee.salary}
          onChange={handleInputChange}
        />
        {errors.salary && <span className = {Employeestyle.errorMessage}>{errors.salary.message}</span>}
        
        <div className={Employeestyle.editModelButtons}>
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeesModal;

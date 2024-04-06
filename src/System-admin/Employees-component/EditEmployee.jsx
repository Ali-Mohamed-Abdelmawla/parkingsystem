import React from "react";
import Employeestyle from '../Styles/Employees.module.css'
import Close from "../assets/light-mode/Close-icon.svg";

function EmployeesModal({ title, onClose, onSubmit, editedEmployee, handleInputChange }) {
  return (
<div className={Employeestyle.editModal}>
 <div className={Employeestyle.editTitle}>
    <button onClick={onClose}>
      <img src={Close} alt="Close" />
    </button>
 </div>
 <form onSubmit={onSubmit}>
    <label>
      {title}
    </label>
    {/* Input fields for editing employee */}
    <input
      type="text"
      name="employeeName"
      placeholder="FullName"
      defaultValue={editedEmployee.name}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="userName"
      placeholder="UserName"
      defaultValue={editedEmployee.userName}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="email"
      placeholder="Email"
      defaultValue={editedEmployee.email}
      onChange={handleInputChange}
    />
    <input
      type="text"
      min="0"
      id="number"
      name="phoneNumber"
      placeholder="phoneNumber"
      maxLength={11}
      defaultValue={editedEmployee.phoneNumber}
      onChange={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        handleInputChange(e);
      }}
    />
    <input
      type="text"
      min="0"
      id="number"
      name="Garage_id"
      placeholder="Password"
      maxLength={6}
      defaultValue={editedEmployee.Garage_id}
      onChange={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        handleInputChange(e);
      }}
    />
    <input
      type="text"
      min="0"
      id="number"
      name="National_id"
      placeholder="National_id"
      maxLength={14}
      defaultValue={editedEmployee.nationalId}
      onChange={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        handleInputChange(e);
      }}
    />
    <input
      type="text"
      min="0"
      id="number"
      name="Salary"
      placeholder="Salary"
      maxLength={11}
      defaultValue={editedEmployee.salary}
      onChange={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        handleInputChange(e);
      }}
    />
    <div className={Employeestyle.editModelButtons}>
      <button type="submit">Edit</button>
    </div>
 </form>
</div>

  );
}

export default EmployeesModal;
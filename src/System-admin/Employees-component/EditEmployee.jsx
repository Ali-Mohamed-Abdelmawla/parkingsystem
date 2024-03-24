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
          placeholder="Name"
          value={editedEmployee.employeeName}
          onChange={handleInputChange}
        />
        {/* More input fields */}
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default EmployeesModal;
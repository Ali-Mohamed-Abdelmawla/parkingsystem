import React from "react";
import Employeestyle from '../Styles/Employees.module.css'
import WarningIcon from "../assets/light-mode/Delete-icon.svg";

function EmployeesDeleteConfirmation({ handleCancelDelete, handleConfirmDelete }) {
  return (
    <div className={Employeestyle.deleteConfirmation}>
      <div className={Employeestyle.deleteTitle}></div>
      <div className={Employeestyle.deleteContent}>
        <img src={WarningIcon} alt="warning-icon" />
        <p>Are you sure to delete this employee?</p>
        <button onClick={handleConfirmDelete}>Confirm</button>
        <button onClick={handleCancelDelete}>No</button>
      </div>
    </div>
  );
}

export default EmployeesDeleteConfirmation;
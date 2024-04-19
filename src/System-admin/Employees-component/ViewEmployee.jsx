import React from "react";
import Employeestyle from "../Styles/Employees.module.css";

function EmployeesViewModal({ employee, handleCloseView }) {
  if (!employee) {
    console.log("Employee not found", employee);
    return null; // or render a loading state, an error message, etc.
  }
  return (
    <div className={Employeestyle.viewModal}>
      <div className={Employeestyle.viewTitle}></div>
      <div className={Employeestyle.modalContent}>
        <div className={Employeestyle.modalMain}>
          <div className={Employeestyle.name}>
            <label>
              <b>Name:</b> {employee.name}
              <br></br>
              <b>User name:</b> {employee.userName}
            </label>
            {/* More details */}
          </div>
        </div>
        <hr />
        <div className={Employeestyle.modalDetails}>
          <b>Email:</b> {employee.email}
          <br></br>
          <b>phone number:</b> {employee.phoneNumber}
          <br></br>
          <b>National ID:</b> {employee.nationalId}
          <br></br>
          <b>Salary:</b> {employee.salary}
          <br></br>
          {/* Details */}
          <button className={Employeestyle.viewButton} onClick={handleCloseView}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeesViewModal;

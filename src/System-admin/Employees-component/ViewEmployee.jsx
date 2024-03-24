import React from "react";
import Employeestyle from '../Styles/Employees.module.css'

function EmployeesViewModal({ employee, handleCloseView }) {
  return (
    <div className={Employeestyle.viewModal}>
      <div className={Employeestyle.viewTitle}></div>
      <div className={Employeestyle.modalContent}>
        <div className={Employeestyle.modalMain}>
          <div className={Employeestyle.name}>
            <label>
              <b>Name:</b> {employee.employeeName}
            </label>
            {/* More details */}
          </div>
        </div>
        <hr />
        <div className={Employeestyle.modalDetails}>
          {/* Details */}
          <button onClick={handleCloseView}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeesViewModal;
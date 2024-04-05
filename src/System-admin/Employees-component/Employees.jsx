import React from "react";
import Employeestyle from '../Styles/Employees.module.css'

import ExpandIcon from "../assets/light-mode/Details-icon.svg";

function EmployeesTable({
  employees,
  expandedRow,
  toggleDropdown,
  handleEditClick,
  handleDeleteClick,
  handleViewClick,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Garage_id</th>
          <th>Role</th>
          <th>Settings</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.employeeName}</td>
            <td>{employee.phoneNumber}</td>
            <td>{employee.Garage_id}</td>
            <td>{employee.Role}</td>
            <td>
              <div
                className={Employeestyle.employeeDetails}
                onClick={() => toggleDropdown(index)}
              >
                <img
                  src={ExpandIcon}
                  alt="Details"
                  className={Employeestyle.expandIcon}
                />
                {index === expandedRow && (
                  <div className={Employeestyle.dropdownMenu}>
                    <button
                      className={Employeestyle.dropdownButton}
                      onClick={() => handleViewClick(index)}
                    >
                      View
                    </button>
                    <hr />
                    <button
                      className={Employeestyle.dropdownButton}
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </button>
                    <hr />
                    <button
                      className={Employeestyle.dropdownButton}
                      onClick={() => handleDeleteClick(index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeesTable;
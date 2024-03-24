import React, { useState, useEffect } from "react";
import EmployeesTable from "./Employees";
import EmployeesEditModal from "./EditEmployee";
import EmployeesDeleteConfirmation from "./DeleteEmployee";
import EmployeesViewModal from "./ViewEmployee";
// import Employeestyle from "../Employees.module.css";
// import ExpandIcon from "../assets/light-mode/Details-icon.svg";
// import WarningIcon from "../assets/light-mode/Delete-icon.svg";
// import viewComponentIcon from "../assets/light-mode/View-component-icon(1).svg";


function Employees() {
  const [employees, setEmployees] = useState([]);
  const [expandedRow, setExpandedRow] = useState(-1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletionIndex, setDeletionIndex] = useState(null);
  const [showEditPage, setShowEditPage] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewIndex, setViewIndex] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    employeeName: "",
    phoneNumber: "",
    Garage_id: "",
    Role: "",
    Employee_id: "",
    National_id: "",
    Salary: "",
  });

  useEffect(() => {
    // Load employees from localStorage on component mount
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    if (storedEmployees) {
      setEmployees(storedEmployees);
    }
  }, []);

  useEffect(() => {
    const  employees= [
        {
          employeeName: "Ali",
          phoneNumber: "0100438493",
          Garage_id: "225039",
          Role: "Staff",
          Employee_id: 34667,
          National_id: 95637706799,
          Salary: 6000,
        },
        {
          employeeName: "Mohamed",
          phoneNumber: "0107896818",
          Garage_id: "328840",
          Role: "Customer Service",
          Employee_id: 51447,
          National_id: 15120367989,
          Salary: 1500,
        },
        {
          employeeName: "Eslam",
          phoneNumber: "0118262347",
          Garage_id: "462269",
          Role: "System Admin",
          Employee_id: 54495,
          National_id: 54405702510,
          Salary: 3000,
        },
      ]
    // Save employees to localStorage whenever it changes
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const toggleDropdown = (index) => {
    setExpandedRow((prevExpandedRow) =>
      prevExpandedRow === index ? -1 : index
    );
  };

  const handleEditClick = (index) => {
    setShowEditPage(true);
    setEditIndex(index);
    setEditedEmployee({ ...employees[index] });
  };

  const handleCloseEditClick = () => {
    setShowEditPage(false);
  };

  const handleDeleteClick = (index) => {
    setShowDeleteConfirmation(true);
    setDeletionIndex(index);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeletionIndex(null);
  };

  const handleConfirmDelete = () => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(deletionIndex, 1);
    setEmployees(updatedEmployees);
    setShowDeleteConfirmation(false);
    setDeletionIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEditedEmployee) => ({
      ...prevEditedEmployee,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedEmployees = [...employees];
    updatedEmployees[editIndex] = editedEmployee;
    setEmployees(updatedEmployees);
    setShowEditPage(false);
  };

  const handleViewClick = (index) => {
    setShowViewDetails(true);
    setViewIndex(index);
  };

  const handleCloseView = () => {
    setShowViewDetails(false);
    setViewIndex(null);
  };

  return (
    <>
      <EmployeesTable
        employees={employees}
        expandedRow={expandedRow}
        toggleDropdown={toggleDropdown}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleViewClick={handleViewClick}
      />
      {showDeleteConfirmation && (
        <EmployeesDeleteConfirmation
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
      {showEditPage && (
        <EmployeesEditModal
          title="Edit Employee"
          onClose={handleCloseEditClick}
          onSubmit={handleFormSubmit}
          editedEmployee={editedEmployee}
          handleInputChange={handleInputChange}
        />
      )}
      {showViewDetails && (
        <EmployeesViewModal
          employee={employees[viewIndex]}
          handleCloseView={handleCloseView}
        />
      )}
    </>
  );
}

export default Employees;
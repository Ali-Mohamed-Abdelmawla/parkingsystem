import React, { useState, useEffect } from "react";
import EmployeesTable from "./Employees";
import EmployeesEditModal from "./EditEmployee";
import EmployeesDeleteConfirmation from "./DeleteEmployee";
import EmployeesViewModal from "./ViewEmployee";
import axios from "axios";
// import Employeestyle from "../Employees.module.css";
// import ExpandIcon from "../assets/light-mode/Details-icon.svg";
// import WarningIcon from "../assets/light-mode/Delete-icon.svg";
// import viewComponentIcon from "../assets/light-mode/View-component-icon(1).svg";
import swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const baseURL = "https://raknaapi.azurewebsites.net";

// لازم نريلود بعد التعديل

function Employees() {
  const accessToken = sessionStorage.getItem("accessToken");
  const [employees, setEmployees] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletionIndex, setDeletionIndex] = useState(null);
  const [showEditPage, setShowEditPage] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewIndex, setViewIndex] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    FullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    NationalId: "",
    Salary: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employees from API on component mount
    axios
      .get(`${baseURL}/api/GarageAdmin/AllStaff`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);



    //============================= Edit ========================


  const handleEditClick = (index) => {
    setShowEditPage(true);
    setEditIndex(index);
    setEditedEmployee(employees[index]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${baseURL}/api/GarageAdmin/EditStaff/${editedEmployee.Id}`,
        editedEmployee,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const updatedEmployees = [...employees];
        updatedEmployees[editIndex] = response.data;
        setEmployees(updatedEmployees);
        setShowEditPage(false);
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Employee updated successfully",
        }).then(() => {
          window.location.reload();
        })
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to update employee: ${error.response.data.errors.FullName[0]}`,
        });
      });
  };

  const handleCloseEditClick = () => {
    setShowEditPage(false);
  };

  //============================= Delete ========================

  const handleDeleteClick = (index) => {
    setShowDeleteConfirmation(true);
    setDeletionIndex(index);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `${baseURL}/api/GarageAdmin/DeleteStaff/${employees[deletionIndex].Id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        const updatedEmployees = [...employees];
        updatedEmployees.splice(deletionIndex, 1);
        setEmployees(updatedEmployees);
        setShowDeleteConfirmation(false);
        setDeletionIndex(null);
        Swal.fire("Success", "Employee deleted successfully", "success").then(() => {
          window.location.reload();
        })
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleCancelDelete = () => {
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

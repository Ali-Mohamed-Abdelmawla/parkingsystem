import React, { useState, useEffect } from "react";
import EmployeesTable from "./Employees";
import EmployeesEditModal from "./EditEmployee";
import EmployeesDeleteConfirmation from "./DeleteEmployee";
import EmployeesViewModal from "./ViewEmployee";
import BulkEmails from "./BulkEmails";
import axios from "axios";
import Employeestyle from "../Styles/Employees.module.css";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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
  const [showBulkEmails, setShowBulkEmails] = useState(false);
  const [selectedEmployeeEmails, setSelectedEmployeeEmails] = useState([]);
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
    document.body.classList.add(Employeestyle.EditModalActive);
    setEditedEmployee(employees[index]);
  };

  const handleFormSubmit = () => {
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
        swal
          .fire({
            icon: "success",
            title: "Success",
            text: "Employee updated successfully",
          })
          .then(() => {
            window.location.reload();
          });
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
    document.body.classList.remove(Employeestyle.EditModalActive);
  };

  //============================= Delete ========================

  const handleDeleteClick = (index) => {
    setShowDeleteConfirmation(true);
    setDeletionIndex(index);
    document.body.classList.add(Employeestyle.deleteModalActive);
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
        Swal.fire("Success", "Employee deleted successfully", "success").then(
          () => {
            window.location.reload();
          }
        );
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeletionIndex(null);
    document.body.classList.remove(Employeestyle.deleteModalActive);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEditedEmployee) => ({
      ...prevEditedEmployee,
      [name]: value,
    }));
  };

  //============================= View ========================
  const handleViewClick = (index) => {
    setShowViewDetails(true);
    setViewIndex(index);
    document.body.classList.add(Employeestyle.viewModalActive);
  };

  const handleCloseView = () => {
    setShowViewDetails(false);
    setViewIndex(null);
    document.body.classList.remove(Employeestyle.viewModalActive);
  };

  //============================= Bulk Email ========================
  const handleBulkEmailClick = (selectedRows) => {
    console.log(selectedRows);

    setSelectedEmployeeEmails(selectedRows.map((row) => row.email));
    setShowBulkEmails(true);
    document.body.classList.add(Employeestyle.viewModalActive);

  };

  const handleBulkEmailSend = (title, message) => {
    // Perform bulk email sending logic using selectedEmployeeEmails
    axios
      .post(
        `https://raknaapi.azurewebsites.net/api/GarageAdmin/SendBulkEmails`,
        {
          emails: selectedEmployeeEmails,
          message: message,
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "Emails sent successfully", "success");
        setShowBulkEmails(false); // Close the pop-up after sending emails
      })
      .catch((error) => {
        console.error("Error sending emails:", error);
        Swal.fire("Error", `Failed to send emails, ${error}`, "error");
      });
  };
  const handleBulkEmailClose = () => {
    setShowBulkEmails(false);
    document.body.classList.remove(Employeestyle.viewModalActive);

  };

  //============================= End ========================

  return (
    <>
      <EmployeesTable
        employees={employees}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleViewClick={handleViewClick}
        onBulkEmailClick={handleBulkEmailClick} // Pass the function to handle bulk email click
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
      {showBulkEmails && (
        <BulkEmails
          onClose={handleBulkEmailClose}
          onSend={handleBulkEmailSend}
        />
      )}
    </>
  );
}

export default Employees;

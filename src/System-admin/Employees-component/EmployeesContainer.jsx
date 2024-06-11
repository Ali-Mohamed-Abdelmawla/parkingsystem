import { useState, useEffect } from "react";
import EmployeesTable from "./Employees";
import EmployeesEditModal from "./EditEmployee";
import EmployeesDeleteConfirmation from "./DeleteEmployee";
import EmployeesViewModal from "./ViewEmployee";
import BulkEmails from "./BulkEmails";
import axiosInstance from "../../auth/axios";
import Employeestyle from "../Styles/Employees.module.css";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../helper/loading-component/loader";

// لازم نريلود بعد التعديل

function Employees() {
  const [loading, setLoading] = useState(false);
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
    Name: "",
    UserName: "",
    Email: "",
    PhoneNumber: "",
    NationalId: "",
    salary: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employees from API on component mount
    setLoading(true);
    axiosInstance
      .get(`/TechnicalSupport/GetAllUsers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  }, []);

  //============================= Edit ========================

  const handleEditClick = (index) => {
    setShowEditPage(true);
    setEditIndex(index);
    document.body.classList.add(Employeestyle.EditModalActive);
    console.log(employees[index]);
    setEditedEmployee(employees[index]);
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    axiosInstance
      .put(`/TechnicalSupport/EditUser/${editedEmployee.Id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
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
    axiosInstance
      .delete(`/TechnicalSupport/DeleteUser/${employees[deletionIndex].Id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
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
    console.log(e.target);
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
    axiosInstance
      .post(
        `/TechnicalSupport/SendBulkEmails`,
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
        Swal.fire("Success", "Emails sent successfully", "success").then(() => {
          setShowBulkEmails(false); // Close the pop-up after sending emails
          document.body.classList.remove(Employeestyle.viewModalActive);
        });
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

  if (loading) {
    return (
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

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

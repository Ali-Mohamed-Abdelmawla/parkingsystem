import { useState, useEffect } from "react";
// import EmployeesTable from "./Employees";
import UsersTable from "./Users";
// import EmployeesEditModal from "./EditEmployee";
// import EmployeesDeleteConfirmation from "./DeleteEmployee";
// import EmployeesViewModal from "./ViewEmployee";
import UsersDeleteConfirmation from "./DeleteUser";
import UsersViewModal from "./ViewUser";
import UsersModal from "./EditUser";
import BulkEmails from "./BulkEmails";
import axiosInstance from "../../auth/axios";
import Employeestyle from "../../System-admin/Styles/Employees.module.css";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../helper/loading-component/loader";

// لازم نريلود بعد التعديل

function SystemUsers() {
  const [loading, setLoading] = useState(false);
  const [formLoading,setFormLoading] = useState(false);

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
    setFormLoading(true);
    if(data.Role === "garageadmin"){
      data.Salary = 0
    }
    axiosInstance
      .put(`/TechnicalSupport/EditUser/${editedEmployee.Id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        // params: {
        //   id: editedEmployee.Id,
        // },
      })
      .then((response) => {
        const updatedEmployees = [...employees];
        updatedEmployees[editIndex] = response.data;
        setEmployees(updatedEmployees);
        setFormLoading(false);
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
        setFormLoading(false);
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
    setFormLoading(true);
    axiosInstance
      .delete(`/TechnicalSupport/DeleteUser/${employees[deletionIndex].Id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setFormLoading(false)
        // const updatedEmployees = [...employees];
        // updatedEmployees.splice(deletionIndex, 1);
        // setEmployees(updatedEmployees);
        Swal.fire("Success", "User deleted successfully", "success").then(
          () => {
            setShowDeleteConfirmation(false);
            setDeletionIndex(null);
            window.location.reload();
          }
        );
      })
      .catch((error) => {
        setFormLoading(false)
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
    setFormLoading(true)
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
        setFormLoading(false)
        console.log(response);
        Swal.fire("Success", "Emails sent successfully", "success").then(() => {
          setShowBulkEmails(false); // Close the pop-up after sending emails
          document.body.classList.remove(Employeestyle.viewModalActive);
          setLoading(false);
        });
      })
      .catch((error) => {
        setFormLoading(false)
        console.error("Error sending emails:", error);
        Swal.fire("Error", `Failed to send emails, ${error}`, "error");
        setLoading(false);
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
      <UsersTable
        employees={employees}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleViewClick={handleViewClick}
        onBulkEmailClick={handleBulkEmailClick} // Pass the function to handle bulk email click
      />
      {showDeleteConfirmation && (
        <UsersDeleteConfirmation
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
          loading={formLoading}

        />
      )}
      {showEditPage && (
        <UsersModal
          title="Edit Employee"
          onClose={handleCloseEditClick}
          onSubmit={handleFormSubmit}
          editedEmployee={editedEmployee}
          handleInputChange={handleInputChange}
          loading={formLoading}

        />
      )}
      {showViewDetails && (
        <UsersViewModal
          employee={employees[viewIndex]}
          handleCloseView={handleCloseView}
        />
      )}
      {showBulkEmails && (
        <BulkEmails
          onClose={handleBulkEmailClose}
          onSend={handleBulkEmailSend}
          loading={formLoading}
          
        />
      )}
    </>
  );
}

export default SystemUsers;

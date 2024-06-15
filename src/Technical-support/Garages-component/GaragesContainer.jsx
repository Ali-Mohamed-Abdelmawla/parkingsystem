import { useState, useEffect } from "react";
import EmployeesTable from "./Garages";
import EmployeesEditModal from "./EditGarage";
import EmployeesDeleteConfirmation from "./DeleteGarage";
import EmployeesViewModal from "./ViewGarage";
import axiosInstance from "../../auth/axios";
import Employeestyle from "../../System-admin/Styles/Employees.module.css";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../helper/loading-component/loader";

// لازم نريلود بعد التعديل

function Garages() {
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const accessToken = sessionStorage.getItem("accessToken");
  const [employees, setEmployees] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletionIndex, setDeletionIndex] = useState(null);
  const [showEditPage, setShowEditPage] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewIndex, setViewIndex] = useState(null);
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
      .get(`/TechnicalSupport/GetAllGarages`, {
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
        console.error("Error fetching garages:", error);
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
    console.log(editedEmployee);
    console.log(data);
    data.HourPrice = parseFloat(data.HourPrice).toFixed(2);
    setFormLoading(true);
    axiosInstance
      .put(`/TechnicalSupport/UpdateGarage`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        params: {
          id: editedEmployee.GarageId,
        },
      })
      .then((response) => {
        setFormLoading(false);
        // const updatedEmployees = [...employees];
        // updatedEmployees[editIndex] = response.data;
        // setEmployees(updatedEmployees);
        swal
          .fire({
            icon: "success",
            title: "Success",
            text: "Garage updated successfully",
          })
          .then(() => {
            setShowEditPage(false);
            document.body.classList.remove(Employeestyle.deleteModalActive);
            window.location.reload();
          });
      })
      .catch((error) => {
        setFormLoading(false);
        console.error("Error updating garage:", error);
        swal
          .fire({
            icon: "error",
            title: "Error",
            text: `Failed to update garage: ${error.response.data.errors.FullName[0]}`,
          })
          .then(() => {});
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
      .delete(`/TechnicalSupport/DeleteGarage`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        params: {
          id: employees[deletionIndex].GarageId,
        },
      })
      .then(() => {
        // const updatedEmployees = [...employees];
        // updatedEmployees.splice(deletionIndex, 1);
        // setEmployees(updatedEmployees);
        setFormLoading(false);
        Swal.fire("Success", "Garage deleted successfully", "success").then(
          () => {
            document.body.classList.remove(Employeestyle.deleteModalActive);
            setShowDeleteConfirmation(false);
            setDeletionIndex(null);
            window.location.reload();

          }
        );
      })
      .catch((error) => {
        console.error("Error deleting garage:", error);
        setFormLoading(false);
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
      />
      {showDeleteConfirmation && (
        <EmployeesDeleteConfirmation
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
          loading={formLoading}
        />
      )}
      {showEditPage && (
        <EmployeesEditModal
          title="Edit Employee"
          onClose={handleCloseEditClick}
          onSubmit={handleFormSubmit}
          editedEmployee={editedEmployee}
          handleInputChange={handleInputChange}
          loading={formLoading}
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

export default Garages;

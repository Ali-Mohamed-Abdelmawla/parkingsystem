// Container Component (Smart Component)
import React, { useState, useEffect } from "react";
import ComplaintsTable from "./Complaints";
import ViewModal from "./ViewComplaints";
import DeleteConfirmationModal from "./UpdateComplaints";
import axiosInstance from "../../auth/axios";
import sweetAlertInstance from "../../helper/SweetAlert";
import Employeestyle from "../Styles/Employees.module.css";
import Loader from "../../helper/loading-component/loader";
const ComplaintsContainer = () => {
  const [loading, setLoading] = useState(false);
  const [formLoading,setFormLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);

  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewIndex, setViewIndex] = useState(null);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch employees from API on component mount
    
    setLoading(true);
    axiosInstance
      .get(`/api/Report/GetReportsBasedOnRole`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setComplaints(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = (index) => {
    setShowDeleteConfirmation(true);
    setUpdateIndex(index);
    document.body.classList.add(Employeestyle.deleteModalActive);
  };

  const handleCloseDelete = () => {
    setShowDeleteConfirmation(false);
    setUpdateIndex(null);
    document.body.classList.remove(Employeestyle.deleteModalActive);
  };

  const handleUpdateStatus = async () => {
    setFormLoading(true);
    try {
      axiosInstance
        .put(`/api/Report/UpdateReportStatus/${updateIndex}`, true, {
          params: {
            reportId: updateIndex,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setFormLoading(false);
          console.log("Complaint marked as solved:", response.data);
          sweetAlertInstance.fire("Success", "Complaint marked as solved", "success").then(
            () => {
              setShowDeleteConfirmation(false);
              document.body.classList.remove(Employeestyle.deleteModalActive);
              window.location.reload();
            }
          );
        })
        .catch((error) => {
          setFormLoading(false);
          console.error("Error marking complaint as solved:", error);
          sweetAlertInstance.fire("Error", "Failed to mark complaint as solved", "error");
          document.body.classList.remove(Employeestyle.deleteModalActive);
        });
    } catch (error) {
      console.error("Error marking complaint as solved:", error);
      sweetAlertInstance.fire("Error", "Failed to mark complaint as solved", "error");
      document.body.classList.remove(Employeestyle.deleteModalActive);
    }
  };

  const handleViewClick = async (index) => {
    console.log(index);
    setViewIndex(index);
    document.body.classList.add(Employeestyle.viewModalActive);
    setShowViewDetails(true);
  };

  const handleCloseView = () => {
    setShowViewDetails(false);
    setViewIndex(null);
    document.body.classList.remove(Employeestyle.viewModalActive);
  };

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
      <ComplaintsTable
        complaints={complaints}
        handleViewClick={handleViewClick}
        handleDeleteClick={handleDeleteClick}
      />
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onConfirmUpdate={handleUpdateStatus}
          onCancelUpdate={handleCloseDelete}
          loading={formLoading}
        />
      )}
      {showViewDetails && (
        <ViewModal
          complaint={complaints[viewIndex]}
          onClose={handleCloseView}
        />
      )}
    </>
  );
};

export default ComplaintsContainer;

import React, { useState, useEffect } from "react";
import axiosInstance from "../../auth/axios";
import styles from "./Complaints.module.css";
import ViewLight from "../assets/LightMode/view.svg";
import ViewDark from "../assets/DarkMode/view-dark.svg";
import { useOutletContext } from "react-router-dom";
import Loader from "../../helper/loading-component/loader";

const Complaints = () => {
  const [loading, setLoading] = useState(false);
  const { darkmode } = useOutletContext();
  const [expandedRow, setExpandedRow] = useState(-1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletionIndex, setDeletionIndex] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewIndex, setViewIndex] = useState(null);
  const [viewReportMessage, setViewReportMessage] = useState(null);
  const [Complaint, setComplaint] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchComplaints();
    saveToLocalStorage();
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("Complaint", JSON.stringify(Complaint));
  };

  const toggleDropdown = (index) => {
    setExpandedRow(expandedRow === index ? -1 : index);
  };

  const handleDeleteClick = (index) => {
    setShowDeleteConfirmation(true);
    document.body.classList.add(styles.deleteModalActive);
    setDeletionIndex(index);
  };

  const handleCloseDelete = () => {
    document.body.classList.remove(styles.deleteModalActive);
    setShowDeleteConfirmation(false);
    setDeletionIndex(null);
  };

  const handleConfirmDelete = () => {
    const updatedComplaint = [...Complaint];
    updatedComplaint.splice(deletionIndex, 1);
    setComplaint(updatedComplaint);
    setShowDeleteConfirmation(false);
    setDeletionIndex(null);
    saveToLocalStorage();
  };

  const handleViewClick = (index, reportMessage) => {
    setShowViewDetails(true);
    setViewIndex(index);
    document.body.classList.add(styles.deleteModalActive);
    setViewReportMessage(index);
  };

  const handleCloseView = () => {
    setShowViewDetails(false);
    setViewIndex(null);
    document.body.classList.remove(styles.deleteModalActive);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchComplaints = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/Report/GetReportsBasedOnRole",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const complaints = response.data;
      sessionStorage.setItem("totalReports", response.data.length);
      setComplaint(complaints);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setLoading(false);
    }
  };

  const updateReportStatus = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const reportId = Complaint[deletionIndex].ReportId;
      const response = await axiosInstance.put(
        `/api/Report/UpdateReportStatus/${reportId}`,
        true,
        {
          params: { reportId },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedComplaints = [...Complaint];
      updatedComplaints[deletionIndex] = response.data;
      setComplaint(updatedComplaints);
      setShowDeleteConfirmation(false);
      setDeletionIndex(null);
      window.location.reload();
      saveToLocalStorage();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const darkModeClass = darkmode ? styles["dark-mode"] : "";

  if (loading) {
    
    return (
      <div
        style={{
          height: darkmode ? '100vh' : '50vh',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: darkmode ? '#231f20' : '#f2f1f1'
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className={`${styles["component-body"]} ${darkModeClass}`}>
      <div className={styles["toggle-dark-mode"]} onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </div>
      <table className={`${styles["complaint-table"]} ${darkModeClass}`}>
        <thead>
          <tr>
            <th>Report Id</th>
            <th>Report Type</th>
            <th>Report Message</th>
            <th>Reporter Id</th>
            <th>Reporter Name</th>
            <th>Report status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Complaint.map((complaint, index) => (
            <tr key={index}>
              <td>{complaint.ReportId}</td>
              <td>{complaint.ReportType}</td>
              <td>{complaint.ReportMessage}</td>
              <td>{complaint.ReporterId}</td>
              <td>{complaint.ReporterName}</td>
              <td>{complaint.IsFixed ? "Fixed" : "Not Fixed"}</td>
              <td>
                <div
                  className={`${styles["details-dropdown"]} ${darkModeClass}`}
                  onClick={() => toggleDropdown(index)}
                >
                  <img
                    src={darkmode ? ViewDark : ViewLight}
                    alt="Details"
                    className={styles["expand-icon"]}
                  />
                  {index === expandedRow && (
                    <div className={styles["dropdown-menu"]}>
                      <button
                        className={styles["dropdown-button"]}
                        onClick={() => handleViewClick(index)}
                      >
                        View
                      </button>
                      <hr />
                      <button
                        className={styles["dropdown-button"]}
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

      {showDeleteConfirmation && (
        <div className={`${styles["delete-confirmation"]} ${darkModeClass}`}>
          <div className={`${styles["border"]} ${darkModeClass}`}></div>
          <div className={`${styles["delete-content"]} ${darkModeClass}`}>
            <p>Are you sure to delete this Complaint?</p>
            <button className={styles["button1"]} onClick={updateReportStatus}>
              Confirm
            </button>
            <button className={styles["button2"]} onClick={handleCloseDelete}>
              No
            </button>
          </div>
        </div>
      )}

      {showViewDetails && (
        <div className={`${styles["view-modal"]} ${darkModeClass}`}>
 
  <div className={`${styles["modal-content"]} ${darkModeClass}`}>
  <div className={`${styles["view-title"]} ${darkModeClass}`}></div>
  <h2>Complaint #{Complaint[viewIndex].ReportId} Details</h2>
  <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
    <div className={`${styles["name"]} ${darkModeClass}`}>
      <span className={`${styles.block} ${darkModeClass}`}>
        <b>Complaint ID:</b>{" "}
        <span className={styles.data}>{Complaint[viewIndex].ReportId}</span>
      </span>
      <br />
      <span className={`${styles.block} ${darkModeClass}`}>
        <b>Complaint Type:</b>{" "}
        <span className={styles.data}>{Complaint[viewIndex].ReportType}</span>
      </span>
      <br />
      <span className={`${styles.block} ${darkModeClass}`}>
        <b>Reported By:</b>{" "}
        <span className={styles.data}>{Complaint[viewIndex].ReporterName}</span>
      </span>
      <br />
      <span className={`${styles.block} ${darkModeClass}`}>
        <b>Status:</b>{" "}
        <span className={styles.data}>
          {Complaint[viewIndex].IsFixed? "Fixed" : "Not Fixed"}
        </span>
      </span>
      <br />
      <span className={`${styles.block} ${darkModeClass}`}>
        <b>Complaint Details:</b>{" "}
        <span className={styles.data}>{Complaint[viewIndex].ReportMessage}</span>
      </span>
      <br />
    </div>
    <div className={` ${styles["view-close-buttons"]} ${darkModeClass}`}>
      <button className={`${styles.viewButton} ${darkModeClass}`} onClick={handleCloseView}>
        Close
      </button>
    </div>
  </div>
</div>


      )}
    </div>
  );
};

export default Complaints;

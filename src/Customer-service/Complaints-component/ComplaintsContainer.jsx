// Container Component (Smart Component)
import { useState, useEffect } from "react";
import ComplaintsTable from "./Complaints";
import ViewModal from "./ViewComplaints";
import ChooseAdmin from "./chooseAdmin";
import DeleteConfirmationModal from "./DeleteComplaints";

import axiosInstance from "../../auth/axios";
import Swal from "sweetalert2";
import style from "../styles/Employees.module.css";
import Loader from "../../helper/loading-component/loader";

const ComplaintsContainer = () => {
  const [loading, setLoading] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken");
  const [complaints, setComplaints] = useState([]);
  const [showSolvedConfirmation, setShowSolvedConfirmation] = useState(false);
  const [solvedIndex, setSolvedIndex] = useState(0);

  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewIndex, setViewIndex] = useState(null);

  const [forwardAdminOpen, setForwardAdminOpen] = useState(false);
  const [forwardedReport, setForwardedReport] = useState(null);

  useEffect(() => {
    // Fetch employees from API on component mount
    setLoading(true);
    axiosInstance
      .get(`/api/Report/GetAllReports`, {
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
  }, []); //gets the complaints

  useEffect(() => {
    console.log("viewIndex changed:", viewIndex);
    console.log("Corresponding complaint:", complaints[viewIndex]);
  }, [viewIndex, complaints]);

  const handleOpenView = async (index) => {
    setShowViewDetails(true);
    setViewIndex(index);
    document.body.classList.add(style.viewModalActive);
  };

  const handleCloseView = () => {
    setShowViewDetails(false);
    setViewIndex(null);
    document.body.classList.remove(style.viewModalActive);
  };

  const handleForwardToAdminClick = async (reportId) => {
    setForwardAdminOpen(true);
    console.log(reportId);
    setForwardedReport(reportId);
    document.body.classList.add(style.viewModalActive);
  };

  const handleCloseForwardToAdmin = () => {
    setForwardAdminOpen(false);
    setForwardedReport(null);
    document.body.classList.remove(style.viewModalActive);
  };
  const handleForwardToTechnicalClick = async (reportId) => {
    const technicalSupportId = "af47b4b7-9e91-46a3-80f5-86f4167e2d08";
    // كده كده مش هيكون عندنا غير واحد بس تكنكال
    try {
      const response = await axiosInstance.post(
        `/api/Report/ForwardReport/${reportId}/${technicalSupportId}`,
        {},
        {
          params: {
            reportId: reportId,
            reportReceiverId: technicalSupportId,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Complaint is forwarded succesfully:", response.data);
      Swal.fire(
        "Success",
        "Complaint is forwarded succesfully",
        "success"
      ).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error marking complaint as solved:", error);
      Swal.fire("Error", "Error forwarding the complaint", "error");
    }
  };

  //==================== Solve =====================
  const handleSolvedClick = (index) => {
    console.log("Solved");
    setShowSolvedConfirmation(true);
    setSolvedIndex(index);
    document.body.classList.add(style.viewModalActive);
  };

  const handlecloseSolved = () => {
    setShowSolvedConfirmation(false);
    document.body.classList.remove(style.viewModalActive);
  };

  const handleConfirmSolve = async () => {
    try {
      const response = await axiosInstance.put(
        `/api/Report/UpdateReportStatus/${solvedIndex}`,
        true, // Assuming you don't need to send any data in the body
        {
          params: {
            reportId: solvedIndex,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Complaint marked as solved:", response.data);
      // Here, you can update your state based on the response, e.g., remove the solved complaint from the list
      setShowSolvedConfirmation(false);
      document.body.classList.remove("deleteModalActive");
      Swal.fire("Success", "Complaint marked as solved", "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error marking complaint as solved:", error);
      Swal.fire("Error", "Error marking complaint as solved", "error");
      // Handle the error appropriately, e.g., show an error message to the user
    }
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
        handleViewComplaint={handleOpenView}
        handleSolvedClick={handleSolvedClick}
        handleForwardToAdminClick={handleForwardToAdminClick}
        handleForwardToTechnicalClick={handleForwardToTechnicalClick}
      />
      {showSolvedConfirmation && (
        <DeleteConfirmationModal
          complaint={complaints[solvedIndex]}
          onConfirmDelete={handleConfirmSolve}
          onCancelDelete={handlecloseSolved}
        />
      )}

      {showViewDetails && (
        <ViewModal
          complaint={complaints[viewIndex]}
          onClose={handleCloseView}
        />
      )}
      {forwardAdminOpen && (
        <ChooseAdmin
          // forwardToAdmin = {handleForwardToAdminClick}
          reportId={forwardedReport}
          onClose={handleCloseForwardToAdmin}
        />
      )}
    </>
  );
};

export default ComplaintsContainer;

// Container Component (Smart Component)
import { useState, useEffect } from "react";
import ComplaintsTable from "./Complaints";
import ViewModal from "./ViewComplaints";
import ChooseAdmin from "./chooseAdmin";
import DeleteConfirmationModal from "./DeleteComplaints";
import axiosInstance from "../../auth/axios";
import sweetAlertInstance from "../../helper/SweetAlert";
import style from "../styles/Employees.module.css";
import Loader from "../../helper/loading-component/loader";

const ComplaintsContainer = () => {
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const accessToken = sessionStorage.getItem("accessToken");
  var currentTurn = sessionStorage.getItem("currentTurn");
  const [complaints, setComplaints] = useState([]);
  const [noComplaints, setNoComplaints] = useState(false);
  const [showSolvedConfirmation, setShowSolvedConfirmation] = useState(false);
  const [solvedIndex, setSolvedIndex] = useState(0);

  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewIndex, setViewIndex] = useState(null);

  const [forwardAdminOpen, setForwardAdminOpen] = useState(false);
  const [forwardedReport, setForwardedReport] = useState(null);

  const GetAllReports = () => {
    setLoading(true);
    axiosInstance
      .get(`/api/Report/GetAllReports`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        params: {
          turn: currentTurn,
        },
      })
      .then((response) => {
        setComplaints(response.data);
        setLoading(false);
        if (response.data.length === 0) {
          setLoading(true);
          if (currentTurn !== "1") {
            sweetAlertInstance.fire({
              icon: "error",
              title: "Oops...",
              text: "No Complaints Found, you will be returned to the latest group",
            }).then(() => {
              
            currentTurn--;
            sessionStorage.setItem("currentTurn", currentTurn);
            GetAllReports();
          })

          } else {
            setNoComplaints(true);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch employees from API on component mount
    GetAllReports();
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
    setLoading(true);
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
      sweetAlertInstance.fire(
        "Success",
        "Complaint is forwarded succesfully",
        "success"
      ).then(() => {
        window.location.reload();
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error marking complaint as solved:", error);
      sweetAlertInstance.fire("Error", "Error forwarding the complaint", "error");
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
    setFormLoading(true);
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
      setFormLoading(false);
      // Here, you can update your state based on the response, e.g., remove the solved complaint from the list

      document.body.classList.remove("deleteModalActive");
      sweetAlertInstance.fire("Success", "Complaint marked as solved", "success").then(() => {
        setShowSolvedConfirmation(false);

        window.location.reload();
      });
    } catch (error) {
      setFormLoading(false);
      console.error("Error marking complaint as solved:", error);
      sweetAlertInstance.fire("Error", "Error marking complaint as solved", "error");
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  const handleGetmoreComplaints = () => {
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

  if (noComplaints) {
    return (
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>No Complaints</h1>
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
        handleGetmoreComplaints={handleGetmoreComplaints}
      />
      {showSolvedConfirmation && (
        <DeleteConfirmationModal
          complaint={complaints[solvedIndex]}
          onConfirmDelete={handleConfirmSolve}
          onCancelDelete={handlecloseSolved}
          loading={formLoading}
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

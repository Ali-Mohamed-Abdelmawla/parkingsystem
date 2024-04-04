// Container Component (Smart Component)
import React, { useState, useEffect } from "react";
import ComplaintsTable from "./Complaints";
import ViewModal from "./Reply";
import DeleteConfirmationModal from "./DeleteComplaints";
import { useNavigate } from "react-router-dom";

const ComplaintsContainer = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [expandedRow, setExpandedRow] = useState(-1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletionIndex, setDeletionIndex] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewIndex, setViewIndex] = useState(null);

  useEffect(() => {
    // هنا نحط الاندبوينت اللي بتجيب الريبورتس كلها علشان لو فيه اي تعديل يسمع علطول
    const savedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(savedComplaints);
    console.log(savedComplaints);
  }, []);

  useEffect(() => {
    // Save complaints to localStorage whenever it changes
    const complaints = [
      {
        Report_id: 123456,
        Reporter_id: 9799,
        Report_type: "Complaint",
        Report_state: "Solved",
        Reporter_type: "Customer",
        Report_message:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, eius.",
      },
      {
        Report_id: 13909,
        Reporter_id: 2552,
        Report_type: "Complaint",
        Report_state: "Notsolved",
        Reporter_type: "Employee",
        Report_message:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, eius.",
      },
      {
        Report_id: 20502,
        Reporter_id: 2504,
        Report_type: "Complaint",
        Report_state: "Solved",
        Reporter_type: "Customer",
        Report_message:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, eius.",
      },
    ];
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  const toggleDropdown = (index) => {
    setExpandedRow((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleCloseView = () => {
    setShowViewDetails(false);
    setViewIndex(null);
    document.body.classList.remove("viewModalActive");
  };

  const handleReplyClick = () => {
    console.log("reply");
    navigate("/reply")
  };

  const handleSolvedClick = () => {
    console.log("Solved");
  };

  const handleForwardToAdminClick = () => {
    console.log("ForwardToAdmin");
  };

  const handleForwardToTechnicalClick = () => {
    console.log("ForwardToTechnical");
  };

  const handleConfirmDelete = () => {
    const updatedComplaints = complaints.filter(
      (_, index) => index !== deletionIndex
    );
    setComplaints(updatedComplaints);
    setShowDeleteConfirmation(false);
    setDeletionIndex(null);
    document.body.classList.remove("deleteModalActive");
  };

  return (
    <>
      <ComplaintsTable
        complaints={complaints}
        expandedRow={expandedRow}
        toggleDropdown={toggleDropdown}
        handleReplyClick={handleReplyClick}
        handleSolvedClick={handleSolvedClick}
        handleForwardToAdminClick={handleForwardToAdminClick}
        handleForwardToTechnicalClick={handleForwardToTechnicalClick}
      />
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onConfirmDelete={handleConfirmDelete}
          onCancelDelete={() => setShowDeleteConfirmation(false)}
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

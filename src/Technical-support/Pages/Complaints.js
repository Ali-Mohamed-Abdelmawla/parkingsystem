import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Complaints.module.css";
import DataGrid from "../../System-admin/Styled-Table/CustomDataGrid";

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deletionIndex, setDeletionIndex] = useState(null);
    const [showViewDetails, setShowViewDetails] = useState(false);
    const [viewIndex, setViewIndex] = useState(null);
    const [isDarkMode] = useState(false);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleDeleteClick = (index) => {
        setShowDeleteConfirmation(true);
        setDeletionIndex(index);
    };

    const handleCloseDelete = () => {
        setShowDeleteConfirmation(false);
        setDeletionIndex(null);
    };

    const handleCloseViewDetails = () => {
        setShowViewDetails(false);
        setViewIndex(null);
    };
    const saveToLocalStorage = () => {
        const { Complaint } = this.state;
        localStorage.setItem("Complaint", JSON.stringify(Complaint));
    };

    const handleConfirmDelete = () => {
        const { deletionIndex, Complaint } = this.state;
        const updatedComplaint = [...Complaint];
        updatedComplaint.splice(deletionIndex, 1);

        this.setState(
            {
                showDeleteConfirmation: false,
                deletionIndex: null,
                Complaint: updatedComplaint,
            },
            () => {
                this.saveToLocalStorage();
            }
        );
    };


    const handleViewClick = (id) => {
        const rowIndex = complaints.findIndex(complaint => complaint.id === id);
        setShowViewDetails(true);
        setViewIndex(rowIndex);
    };

    const fetchComplaints = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const response = await axios.get("https://raknaapi.azurewebsites.net/api/Report/GetReportsBasedOnRole", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            const complaintsData = response.data.map((complaint, index) => ({
                ...complaint,
                id: index + 1,
            }));
            sessionStorage.setItem("totalReports", complaintsData.length);
            setComplaints(complaintsData);
        } catch (error) {
            console.error("Error fetching complaints:", error);
        }
    };
    
    const updateReportStatus = async () => {
        const { deletionIndex, Complaint } = this.state;
        console.log(Complaint[deletionIndex].reportId)
        const accessToken = sessionStorage.getItem("accessToken");
        // const updateStatus = {
        //     reportId: Complaint[deletionIndex].reportId,
        // };
        const reportId = Complaint[deletionIndex].ReportId
        try {
            const response = await axios.put(
                `https://raknaapi.azurewebsites.net/api/Report/UpdateReportStatus/${reportId}`,
                true,
                {
                    params:{
                        reportId: reportId
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Updated complaint:", response.data.reportId);
            const updatedComplaints = [...Complaint];
            updatedComplaints[deletionIndex] = response.data;
            this.setState(
                {
                    showDeleteConfirmation: false,
                    deletionIndex: null,
                    Complaint: updatedComplaints,
                },
                () => {
                    this.saveToLocalStorage();
                }
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    
    

    const darkModeClass = isDarkMode ? styles["dark-mode"] : "";

    const columns = [
        { field: "ReportId", headerName: "Report ID", flex: 1 },
        { field: "ReportType", headerName: "Report Type", flex: 1 },
        { field: "ReportMessage", headerName: "Report Message", flex: 1 },
        { field: "ReporterId", headerName: "Reporter ID", flex: 1 },
        { field: "ReporterName", headerName: "Reporter Name", flex: 1 },
        { field: "IsFixed", headerName: "Report Status", flex: 1, valueGetter: (params) => (params.value ? "Fixed" : "Not Fixed") },
        {
            field: "settings",
            headerName: "Settings",
            flex: 1,
            renderCell: (params) => (
                <>
                    <button className={'tableBtn'} onClick={() => handleViewClick(params.row.id)}>View</button>
                    <hr />
                    <button className={'tableBtn'} onClick={() => handleDeleteClick(params.row.ReportId)}>Delete</button>
                </>
            ),
        },
    ];

    return (
        <>
        <div className={`${styles["component-body"]} ${darkModeClass}`} style={{ flex: 1, overflow: "hidden" }}>
            <DataGrid
                rows={complaints}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 8, 13]}
            />
            {showDeleteConfirmation && (
                <div className={`${styles["delete-confirmation"]} ${darkModeClass}`}>
                    <div className={`${styles["border"]} ${darkModeClass}`}></div>
                    <div className={`${styles["delete-content"]} ${darkModeClass}`}>
                        <p>Are you sure to delete this Complaint?</p>
                        <button className={styles["button1"]} onClick={handleConfirmDelete}>Confirm</button>
                        <button className={styles["button2"]} onClick={handleCloseDelete}>No</button>
                    </div>
                </div>
            )}
            {showViewDetails && (
                <div className={`${styles["view-modal"]} ${darkModeClass}`}>
                    <div className={`${styles["view-title"]} ${darkModeClass}`}></div>
                    <div className={`${styles["modal-content"]} ${darkModeClass}`}>
                        <div className={`${styles["modal-main"]} ${darkModeClass}`}>
                            <div className={`${styles["info-report"]} ${darkModeClass}`}>
                                <label><b>Report ID:</b> {complaints[viewIndex]?.ReportId}</label>
                                <label><b>Report Type:</b> {complaints[viewIndex]?.ReportType}</label>
                                <label><b>Reporter Name:</b> {complaints[viewIndex]?.ReporterName}</label>
                                <label><b>Reporter ID:</b> {complaints[viewIndex]?.ReporterId}</label>
                                <hr/>
                                <label><b>Report Message:</b> {complaints[viewIndex]?.ReportMessage}</label>
                                <div className={`${styles["modal-details"]} ${darkModeClass}`}>
                                    <button className={`${styles["view-close-buttons"]} ${darkModeClass}`} onClick={handleCloseViewDetails}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default Complaints;

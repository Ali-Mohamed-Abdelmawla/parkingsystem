//=============================================== New Customer service ====================================
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Employeestyle from "../styles/Employees.module.css";
// import ExpandIcon from "../assets/Details-icon.svg";
import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "https://raknaapi.azurewebsites.net";
const accessToken = sessionStorage.getItem("accessToken");

function ComplaintsTable({
  complaints,
  handleViewComplaint,
  handleSolvedClick,
  handleForwardToAdminClick,
  handleForwardToTechnicalClick,
}) {
  const [helpingData, setHelpingData] = useState([]);

  const columns = [
    { field: "reportId", headerName: "Report_id", flex: 1 },
    { field: "reportType", headerName: "Report Type", flex: 1 },
    { field: "reportMessage", headerName: "Report Message", flex: 1 },
    { field: "reporterId", headerName: "Reporter Id", flex: 1 },
    {
      field: "isFixed",
      headerName: "Report status",
      flex: 1,
      renderCell: (params) => (
        <span>{params.value ? "Fixed" : "Not Fixed"}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Settings",
      sortable: false,
      filterable: false,
      flex: 3,
      renderCell: (params) => (
        <>
          <button
            className={Employeestyle.dropdownButton}
            onClick={() => handleViewComplaint(params.row.id)}
          >
            View
          </button>
          <button
            className={Employeestyle.dropdownButton}
            onClick={() => handleSolvedClick(params.row.reportId)}
          >
            Set as Solved
          </button>
          <button
            className={Employeestyle.dropdownButton}
            onClick={() => handleForwardToAdminClick(params.row.reportId)}
          >
            Forward to Admin
          </button>

          <button
            className={Employeestyle.dropdownButton}
            onClick={() => handleForwardToTechnicalClick(params.row.reportId)}
          >
            Forward to TechnicalSupport
          </button>
        </>
      ),
    },
  ];

  const rows = complaints.map((complaint, index) => {
    console.log(helpingData);
    const reporterName =
      helpingData.find((admin) => admin.adminId === complaint.reporterId)
        ?.name || "Technical Support";

    return {
      id: index,
      reportId: complaint.reportId,
      reportType: complaint.reportType,
      reportMessage: complaint.reportMessage,
      reporterId: reporterName,
      isFixed: complaint.isFixed,
    };
  });

  useEffect(() => {
    console.log(accessToken);
    const fetchGarageAdmins = async () => {
      if(accessToken == null){
        fetchGarageAdmins();
      }
      try {
        const response = await axios
          .get(`${baseURL}/api/Report/GetAllGarageAdmins`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setHelpingData(response.data);
          });
      } catch (error) {
        console.error("Error fetching garage admins:", error);
        Swal.fire("Error", "Error fetching garage admins", "error");
      }
    };
    fetchGarageAdmins();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1 style= {{marginBottom: "20px"}}>Reports</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 8, 13]}
      />
    </div>
  );
}

export default ComplaintsTable;

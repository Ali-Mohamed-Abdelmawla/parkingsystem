//=============================================== New Customer service ====================================
import { useState } from "react";

import DataGrid from "../../System-admin/Styled-Table/CustomDataGrid";

import LoadingButton from "@mui/lab/LoadingButton";
import ArrowForwardIosTwoToneIcon from "@mui/icons-material/ArrowForwardIosTwoTone";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import Swal from "sweetalert2";
function ComplaintsTable({
  complaints,
  handleViewComplaint,
  handleSolvedClick,
  handleForwardToAdminClick,
  handleForwardToTechnicalClick,
  handleGetmoreComplaints,
}) {
  const columns = [
    { field: "reportId", headerName: "Report_id", flex: 1 },
    { field: "reportType", headerName: "Report Type", flex: 1 },
    { field: "reportMessage", headerName: "Report Message", flex: 1 },
    { field: "reporterId", headerName: "Reporter Name", flex: 1 },
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
            className="tableBtn"
            onClick={() => handleViewComplaint(params.row.id)}
          >
            View
          </button>
          <button
            className="tableBtn"
            onClick={() => handleSolvedClick(params.row.reportId)}
          >
            Set as Solved
          </button>
          <button
            className="tableBtn"
            onClick={() => handleForwardToAdminClick(params.row.reportId)}
          >
            Forward to Admin
          </button>

          <button
            className="tableBtn"
            onClick={() => handleForwardToTechnicalClick(params.row.reportId)}
          >
            Forward to TechnicalSupport
          </button>
        </>
      ),
    },
  ];

  const rows = complaints.map((complaint, index) => {
    return {
      id: index,
      reportId: complaint.ReportId,
      reportType: complaint.ReportType,
      reportMessage: complaint.ReportMessage,
      reporterId: complaint.ReporterName,
      isFixed: complaint.IsFixed,
    };
  });

  const getNextComplaints = () => {
    let currentTurn = sessionStorage.getItem("currentTurn");

    //swal confirmation message
    Swal.fire({
      title: "Are you sure?",
      text: "This action will get you the next group of complaints!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ok",
      cancelButtonText: "cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
        currentTurn++;
        sessionStorage.setItem("currentTurn", currentTurn);
      }
    });
  };

  const getPreviousComplaints = async () => {
    let currentTurn = sessionStorage.getItem("currentTurn");
    console.log(currentTurn);
    if (currentTurn === "1") {
      Swal.fire("Oops...", "There is no previous Complaints!", "info").then(() => {
        return;
      });
    } else {
      //swal confirmation message
      Swal.fire({
        title: "Are you sure?",
        text: "This action will get you the previous group of complaints!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ok",
        cancelButtonText: "cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          currentTurn--;
          sessionStorage.setItem("currentTurn", currentTurn);
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className="table-wrapper" style={{ flex: 1, overflow: "hidden" }}>
      <h1 style={{ marginBottom: "20px" }}>Reports</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 8, 11]}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
        className="buttonsUnderTable"
      >
        <LoadingButton
          startIcon={<ArrowBackIosNewTwoToneIcon />}
          // loading={loading}
          loadingPosition="end"
          variant="contained"
          onClick={getPreviousComplaints}
        >
          <span>Get previous group of complaints</span>
        </LoadingButton>
        <LoadingButton
          endIcon={<ArrowForwardIosTwoToneIcon />}
          // loading={loading}
          loadingPosition="end"
          variant="contained"
          onClick={getNextComplaints}
        >
          <span>Get next group of complaints</span>
        </LoadingButton>
      </div>
    </div>
  );
}

export default ComplaintsTable;

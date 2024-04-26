import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Employeestyle from "../Styles/Employees.module.css";

function ComplaintsTable({
  complaints,
  handleViewClick,
  handleDeleteClick,
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
      flex: 1,
      renderCell: (params) => (
        <>
          <button
            className={Employeestyle.dropdownButton}
            onClick={() => handleViewClick(params.row.id)}
          >
            View
          </button>
          <hr />
          <button
            className={Employeestyle.dropdownButton}
            onClick={() => handleDeleteClick(params.row.reportId)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const rows = complaints.map((complaint, index) => ({
    id: index,
    reportId: complaint.ReportId,
    reportType: complaint.ReportType,
    reportMessage: complaint.ReportMessage,
    reporterId: complaint.ReporterName,
    isFixed: complaint.IsFixed,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
          <h1 style={{ marginBottom: "20px" }}>Complaints</h1>

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
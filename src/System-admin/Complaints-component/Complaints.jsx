// // Presentational Components (Dumb Components)
// import React from 'react';
// import styles from '../Styles/Employees.module.css'
// import ExpandIcon from '../assets/light-mode/Details-icon.svg';

// const ComplaintsTable = ({
//   complaints,
//   expandedRow,
//   toggleDropdown,
//   handleViewClick,
//   handleDeleteClick,
// }) => (
//   <table>
//     <thead>
//       <tr>
//         <th>Report_id</th>
//         <th>Report Type</th>
//         <th>Report Message</th>
//         <th>Reporter Id</th>
//         <th>Report status</th>
//         <th>Settings</th>
//       </tr>
//     </thead>
//     <tbody>
//       {complaints.map((complaint, index) => (
//         <tr key={index}>
//           <td>{complaint.reportId}</td>
//           <td>{complaint.reportType}</td>
//           <td>{complaint.reportMessage}</td>
//           <td>{complaint.reporterId}</td>
//           <td>{complaint.isFixed ? "Fixed" : "Not Fixed"}</td>
//           <td>
//             <div
//               className={styles.employeeDetails}
//               onClick={() => toggleDropdown(index)}
//             >
//               <img
//                 src={ExpandIcon}
//                 alt="Details"
//                 className={styles.expandIcon}
//               />
//               {index === expandedRow && (
//                 <div className={styles.dropdownMenu}>
//                   <button
//                     className={styles.dropdownButton}
//                     onClick={() => handleViewClick(index)}
//                   >
//                     View
//                   </button>
//                   <hr />
//                   <button
//                     className={styles.dropdownButton}
//                     onClick={() => handleDeleteClick(index)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// );

// export default ComplaintsTable;

// ==================================  DATA GRID  ==========================================

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Employeestyle from "../Styles/Employees.module.css";
import ExpandIcon from "../assets/light-mode/Details-icon.svg";

function ComplaintsTable({
  complaints,
  handleViewClick,
  handleDeleteClick,
}) {
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
    reportId: complaint.reportId,
    reportType: complaint.reportType,
    reportMessage: complaint.reportMessage,
    reporterId: complaint.reporterId,
    isFixed: complaint.isFixed,
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
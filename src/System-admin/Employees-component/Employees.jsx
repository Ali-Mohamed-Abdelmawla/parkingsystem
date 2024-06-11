// import React, { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import Employeestyle from "../Styles/Employees.module.css";
// import axios from "axios";
// import Swal from "sweetalert2";

// function EmployeesTable({
//   employees,
//   expandedRow,
//   toggleDropdown,
//   handleEditClick,
//   handleDeleteClick,
//   handleViewClick,
// }) {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [message, setMessage] = useState("");
//   const [title, setTitle] = useState(""); // New state for the title

//   const accessToken = sessionStorage.getItem("accessToken");

//   const columns = [
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "salary", headerName: "Salary", flex: 1 },
//     { field: "nationalId", headerName: "National ID", flex: 1 },
//     {
//       field: "actions",
//       headerName: "Settings",
//       flex: 1,
//       renderCell: (params) => (
//         <>
//           <button
//             className={Employeestyle.dropdownButton}
//             onClick={() => handleViewClick(params.id)}
//           >
//             View
//           </button>
//           <button
//             className={Employeestyle.dropdownButton}
//             onClick={() => handleEditClick(params.id)}
//           >
//             Edit
//           </button>
//           <button
//             className={Employeestyle.dropdownButton}
//             onClick={() => handleDeleteClick(params.id)}
//           >
//             Delete
//           </button>
//         </>
//       ),
//     },
//   ];

//   const rows = employees.map((employee, index) => ({
//     id: index,
//     name: employee.Name,
//     email: employee.Email,
//     salary: employee.salary,
//     nationalId: employee.NationalId,
//   }));

//   const handleRowSelectionModelChange = (newSelectionModel) => {
//     setSelectedRows(newSelectionModel);
//   };

//   const sendEmails = () => {
//     console.log(
//       "Sending emails to:",
//       selectedRows.map((rowId) => rows.find((row) => row.id === rowId).email)
//     );
//     console.log("Message:", message);
//     console.log("Title:", title); // Log the title as well

//     const response = axios
//       .post(
//         `https://raknaapi.azurewebsites.net/api/GarageAdmin/SendBulkEmails`,
//         {
//           emails: selectedRows.map(
//             (rowId) => rows.find((row) => row.id === rowId).email
//           ),
//           message: message,
//           title: title, // Pass the title
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .catch((error) => {
//         console.log(error);
//         Swal.fire("Error", `Failed to send emails, ${error}`, "error");
//       });
//     console.log(response);
//     Swal.fire("Success", "Emails sent successfully", "success");
//   };

//   return (
//     <div style={{ height: "700px", width: "100%" }}>
//       <h1 style={{ marginBottom: "20px" }}>Employees</h1>

//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         onRowSelectionModelChange={handleRowSelectionModelChange}
//       />
//       {selectedRows.length > 0 && (
//         <>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter the title here..."
//             style={{
//               width: "50%",
//               marginBottom: "10px",
//               marginRight: "10px",
//               marginTop: "10px",
//             }}
//           />
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Enter your message here..."
//             style={{ width: "50%", marginBottom: "-11px" }}
//           />
//           <button onClick={sendEmails} style={{ marginLeft: "10px" }}>
//             Send Emails
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default EmployeesTable;

//=================================================================================
import React, { useState } from "react";
import DataGrid from "../Styled-Table/CustomDataGrid";
import Employeestyle from "../Styles/Employees.module.css";
import axios from "axios";
import Swal from "sweetalert2";

function EmployeesTable({
  employees,
  onBulkEmailClick,
  handleEditClick,
  handleDeleteClick,
  handleViewClick,
}) {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "salary", headerName: "Salary", flex: 1 },
    { field: "nationalId", headerName: "National ID", flex: 1 },
    {
      field: "actions",
      headerName: "Settings",
      flex: 1,
      renderCell: (params) => (
        <>
          <button
            className="tableBtn"
            onClick={() => handleViewClick(params.id)}
          >
            View
          </button>
          <button
            className="tableBtn"
            onClick={() => handleEditClick(params.id)}
          >
            Edit
          </button>
          <button
            className="tableBtn"
            onClick={() => handleDeleteClick(params.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const rows = employees.map((employee, index) => ({
    id: index,
    name: employee.Name,
    email: employee.Email,
    salary: employee.salary,
    nationalId: employee.NationalId,
  }));

  const handleRowSelectionModelChange = (ids) => {
    const selectedRows = rows.filter((row) => ids.includes(row.id));
    setSelectedRows(selectedRows);
  };

  const handleBulkEmailClick = () => {
    if (selectedRows.length === 0) {
      Swal.fire("Error", "No employees selected", "error");
    } else {
      console.log(selectedRows);
      onBulkEmailClick(selectedRows);
    }
  };

  return (
    <>
      <div className="table-wrapper" style={{ flex: 1, overflow: "hidden" }}>
        <h1 style={{ marginBottom: "20px" }}>Employees</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 8, 13]}
          checkboxSelection={true} // Enable checkbox selection for this instance
          onRowSelectionModelChange={handleRowSelectionModelChange}
        />
      </div>
      {selectedRows.length > 0 && (
        <button onClick={handleBulkEmailClick} className="tableBtn">
          Send Emails to the selected employees
        </button>
      )}
    </>
  );
}

export default EmployeesTable;

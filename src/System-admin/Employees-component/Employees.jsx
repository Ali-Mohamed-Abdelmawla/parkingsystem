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
          pageSizeOptions={[5, 8, 11]}
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

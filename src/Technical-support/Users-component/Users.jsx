//=================================================================================
import { useState } from "react";
import Swal from "sweetalert2";
import DataGrid from "../../System-admin/Styled-Table/CustomDataGrid"
function UsersTable({
  employees,
  onBulkEmailClick,
  handleEditClick,
  handleDeleteClick,
  handleViewClick,
}) {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { field: "FullName", headerName: "FullName", flex: 1 },
    { field: "UserName", headerName: "UserName", flex: 1 },
    { field: "NationalId", headerName: "National Id", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "Role", headerName: "Role", flex: 1 },
    { field: "PhoneNumber", headerName: "PhoneNumber", flex: 1 },
    { field: "GarageId", headerName: "GarageId", flex: 1 },
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
    FullName: employee.FullName,
    UserName: employee.UserName,
    NationalId: employee.NationalId,
    email: employee.Email,
    Role: employee.Role,
    Salary: employee.Salary,
    PhoneNumber: employee.PhoneNumber,
    GarageId: employee.GarageId,
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
        <h1 style={{ marginBottom: "20px" }}>Users</h1>

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
          getRowId={(row) => row.id}
        />
      </div>
      {selectedRows.length > 0 && (
        <button onClick={handleBulkEmailClick} className="tableBtn" style={{ marginLeft: "20px" }}>
          Send an Email to the selected employees
        </button>
      )}
    </>
  );
}

export default UsersTable;

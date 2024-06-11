//=================================================================================
import DataGrid from "../../System-admin/Styled-Table/CustomDataGrid";

function EmployeesTable({
  employees,
  onBulkEmailClick,
  handleEditClick,
  handleDeleteClick,
  handleViewClick,
}) {
  const columns = [
    { field: "GarageId", headerName: "GarageId", flex: 1 },
    { field: "GarageName", headerName: "GarageName", flex: 1 },
    { field: "longitude", headerName: "longitude", flex: 1 },
    { field: "latitude", headerName: "latitude", flex: 1 },
    { field: "street", headerName: "street", flex: 0.75 },
    { field: "city", headerName: "city", flex: 0.75 },
    { field: "AvailableSpaces", headerName: "AvailableSpaces", flex: 1 },
    { field: "TotalSpaces", headerName: "TotalSpaces", flex: 0.75 },
    {
      field: "HasAdmin",
      headerName: "HasAdmin",
      flex: 0.75,
      renderCell: (params) =>
        params.value
          ? "has an admin"
          : "has no admin",
    },

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
    GarageId: employee.GarageId,
    GarageName: employee.GarageName,
    street: employee.street,
    city: employee.city,
    longitude: employee.longitude,
    latitude: employee.latitude,
    AvailableSpaces: employee.AvailableSpaces,
    TotalSpaces: employee.TotalSpaces,
    HasAdmin: employee.HasAdmin,
  }));

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
          getRowId={(row) => row.id}
        />
      </div>
    </>
  );
}

export default EmployeesTable;

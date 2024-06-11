import { useEffect, useState } from "react";
import axiosInstance from "../../auth/axios";
import Swal from "sweetalert2";
import DataGrid from "../../System-admin/Styled-Table/CustomDataGrid";
import Loader from "../../helper/loading-component/loader";

const BulkEmails = () => {
  const [loading, setLoading] = useState(false);
  const [bulkEmails, setBulkEmails] = useState(null);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    console.log(accessToken);
    setLoading(true);
    axiosInstance
      .get(
        `/TechnicalSupport/GetAllBulk`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setBulkEmails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", `Failed to fetch employees, ${error}`, "error");
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "RoleType", headerName: "RoleType", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
  ];

  // Prepare the rows data for the DataGrid
  const rows =
    bulkEmails?.map((email, index) => ({
      id: index,
      Email: email.Email,
      Name: email.Name,
      RoleType: email.RoleType,
    })) ?? [];

  if (loading) {
    return (
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="table-wrapper" style={{ flex: 1, overflow: "hidden" }}>
        <h1>Bulk Emails</h1>

        {bulkEmails && (
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
        )}
      </div>
    </>
  );
};

export default BulkEmails;

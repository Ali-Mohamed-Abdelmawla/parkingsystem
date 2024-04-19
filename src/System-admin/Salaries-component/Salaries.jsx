import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import { columnGroupsStateInitializer } from "@mui/x-data-grid/internals";

const baseURL = "https://raknaapi.azurewebsites.net";
const accessToken = sessionStorage.getItem("accessToken");
const displayDateAfterDays = (daysUntilPayment) => {
  const currentDate = new Date();
  const futureDate = new Date(
    currentDate.getTime() + daysUntilPayment * 24 * 60 * 60 * 1000
  );
  const formattedDate = futureDate.toLocaleDateString();
  return formattedDate;
};

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};
const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`; // Assuming the currency is USD and you want to display 2 decimal places
};

const handlePayment = (id) => {
  const response = axios.post(
    `${baseURL}/api/GarageAdmin/PaySalary/${id}`,
    {},
    {
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  Swal.fire("Success", "Submitted successfully", "success").then(() => {
    window.location.reload();
  });
};
const Salaries = () => {
  const [Salaries, setSalaries] = useState({ staffs: [] });

  useEffect(() => {
    console.log(accessToken);
    const respone = axios
      .get(
        `${baseURL}/api/GarageAdmin/GetAllStaffSalaries`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSalaries(response.data);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", `Failed to fetch employees, ${error}`, "error");
      });
  }, []);

  const columns = [
    { field: "name", headerName: "Staff name", flex: 1 },
    {
      field: "lastPayment",
      headerName: "last day this employee was paid",
      valueFormatter: (params) => formatDate(params.value),
      flex: 1,
    },
    { field: "email", headerName: "Staff Email", flex: 1 },
    {
      field: "amount",
      headerName: "Staff salary",
      valueFormatter: (params) => formatCurrency(params.value),
      flex: 1,
    },
    { field: "isPaid", headerName: "Was he paid?", flex: 1 },
    {
      field: "actions",
      headerName: "Settings",
      flex: 1,
      renderCell: (params) => (
        <>
          {!params.row.isPaid && (
            <button onClick={() => handlePayment(params.id)}>
              Submit as paid
            </button>
          )}
        </>
      ),
    },
  ];

  // Prepare the rows data for the DataGrid
  const rows =
    Salaries.staffs?.map((staffSalary, index) => ({
      id: staffSalary.staffId,
      ...staffSalary,
    })) ?? [];

  return (
    <>
        <div style={{ height: 'auto', width: '1588px' }}>
      <h1>Salaries</h1>
      <div>
        Upcoming Payment Schedule:{" "}
        {displayDateAfterDays(Salaries.daysUntilPayment)}{" "}
      </div>
      {Salaries.staffs && (
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
      )}
      </div>

    </>
  );
};

export default Salaries;

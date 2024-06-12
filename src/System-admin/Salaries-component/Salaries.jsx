import { useEffect, useState } from "react";
import axiosInstance from "../../auth/axios";
import Swal from "sweetalert2";
import DataGrid from "../Styled-Table/CustomDataGrid";
import Loader from "../../helper/loading-component/loader";
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

const Salaries = () => {
  const [loading, setLoading] = useState(false);
  const [Salaries, setSalaries] = useState({ staffs: [] });
  const accessToken = sessionStorage.getItem("accessToken");

  const handlePayment = (id) => {
    setLoading(true);
    axiosInstance
      .post(
        `/api/GarageAdmin/PaySalary/${id}`,
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
      )
      .then((response) => {
        setLoading(false);
        Swal.fire("Success", "Submitted successfully", "success").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire(
          "Error",
          `Failed to submit payment for the employee`,
          "error"
        );
      });
  };

  useEffect(() => {
    console.log(accessToken);
    setLoading(true);
    axiosInstance
      .get(
        `/api/GarageAdmin/GetAllStaffSalaries`,

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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", `Failed to fetch employees, ${error}`, "error");
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "Name", headerName: "Staff name", flex: 1 },
    {
      field: "LastPayment",
      headerName: "last day this employee was paid",
      valueFormatter: (params) => formatDate(params.value),
      flex: 1,
    },
    { field: "Email", headerName: "Staff Email", flex: 1 },
    {
      field: "Amount",
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
            <button
              onClick={() => handlePayment(params.id)}
              className="tableBtn"
            >
              Submit as paid
            </button>
          )}
        </>
      ),
    },
  ];

  // Prepare the rows data for the DataGrid
  const rows =
    Salaries.Staffs?.map((staffSalary, index) => ({
      id: staffSalary.StaffId,
      ...staffSalary,
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
        <h1>Salaries</h1>
        <div>
          Upcoming Payment Schedule:{" "}
          {displayDateAfterDays(Salaries.DaysUntilPayment)}{" "}
        </div>
        {Salaries.Staffs && (
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

export default Salaries;

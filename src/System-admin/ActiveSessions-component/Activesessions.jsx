import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const baseURL = "https://raknaapi.azurewebsites.net";
const accessToken = sessionStorage.getItem("accessToken");

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

const formatDuration = (hours) => {
  const minutes = (hours % 1) * 60;
  return `${Math.floor(hours)} hours and ${Math.round(minutes)} minutes`;
};

const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`; // Assuming the currency is USD and you want to display 2 decimal places
};

const ActiveSessionsContainer = () => {
  const [activeSessions, setActiveSessions] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/GarageAdmin/ActiveSessions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setActiveSessions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  // Define the columns for the DataGrid
  const columns = [
    {
      field: "currentBill",
      headerName: "Current Bill",
      valueFormatter: (params) => formatCurrency(params.value),
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      valueFormatter: (params) => formatDate(params.value),
      flex: 1,
    },
    {
      field: "curSessionDuration_Hours",
      headerName: "Duration",
      valueFormatter: (params) => formatDuration(params.value),
      flex: 1,
    },
  ];

  // Prepare the rows data for the DataGrid
  const rows = activeSessions.map((activeSession, index) => ({
    id: index, // Ensure each row has a unique ID
    ...activeSession,
  }));

  return (
    <div style={{ height: "auto", width: "1588px" }}>
          <h1 style = {{marginBottom: "20px"}}>Active Sessions</h1>
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
};

export default ActiveSessionsContainer;
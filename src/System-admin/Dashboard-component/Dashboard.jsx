import React, { useEffect, useState } from "react";
import DashboardStyle from "../Styles/Dashboard.module.css";
import operations from "../assets/light-mode/parking-op.svg";
import revenue from "../assets/light-mode/revenue.svg";
import expenses from "../assets/light-mode/expenses.svg";
import axios from "axios";
import Card from "./Card";
// import { BarChart, BarSeries, XAxis, YAxis, Title } from '@mui/x-charts';
import { ColumnChart } from "./ColumnChart";
import { PieChart } from "./PieChart";
import DataGrid from "../Styled-Table/CustomDataGrid";

const baseURL = "https://raknaapi.azurewebsites.net";

function formatFriendlyTime(timeString) {
  const [hours, minutes, secondsWithMilliseconds] = timeString
    .split(":")
    .map(Number);
  const seconds = Math.floor(secondsWithMilliseconds);

  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hours} h `;
  }
  if (minutes > 0 || hours > 0) {
    formattedTime += `${minutes} min `;
  }
  if (seconds > 0 || (hours === 0 && minutes === 0)) {
    formattedTime += `${seconds} sec `;
  }

  return formattedTime.trim();
}

function formatCurrency(currencyValue, currencyCode = "USD") {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  });

  return formatter.format(currencyValue);
}

function formatHourvalue(timeValue) {
  // Convert the time value to an integer
  const time = parseInt(timeValue);

  // Determine whether it's AM or PM based on the time value
  const period = time < 12 ? "AM" : "PM";

  // Calculate the hours and minutes
  let hours = Math.floor(time / 60);
  const minutes = time % 60;

  // Adjust hours for 12-hour format
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  // Format the time
  const formattedTime = `${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${period}`;

  return formattedTime;
}

const Dashboard = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  // Initialize state for start and end dates
  const today = new Date();
  const formattedToday = `${
    today.getMonth() + 1
  }-${today.getDate()}-${today.getFullYear()}`;
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const formattedStartOfMonth = `${
    startOfMonth.getMonth() + 1
  }-${startOfMonth.getDate()}-${startOfMonth.getFullYear()}`;

  const [startDate, setStartDate] = useState(formattedStartOfMonth);
  const [endDate, setEndDate] = useState(formattedToday);
  const [statistics, setStatistics] = useState(null);
  const [revenueColumnChartData, setRevenueColumnChartData] = useState(null);
  const [revenueColumnChartOptions, setRevenueColumnChartOptions] =
    useState(null);

  const [revenueBarChartData, setRevenueBarChartData] = useState(null);
  const [revenueBarChartOptions, setRevenueBarChartOptions] = useState(null);

  const [ComplaintsPieChartData, setComplaintsPieChartData] = useState(null);
  const [ComplaintsPieChartOptions, setComplaintsPieChartOptions] =
    useState(null);

  const [ResrvationData, setReservationData] = useState(null);
  const [ResrvationOptions, setReservationOptions] = useState(null);

  const [
    NonresolvedComplaintsPieChartData,
    setNonresolvedComplaintsPieChartData,
  ] = useState(null);
  const [
    NonresolvedComplaintsPieChartOptions,
    setNonresolvedComplaintsPieChartOptions,
  ] = useState(null);

  const [peakHoursData, setpeakHoursData] = useState(null);
  const [peakHoursOptions, setpeakHoursOptions] = useState(null);

  const [reservationPeakHoursData, setReservationPeakHoursData] =
    useState(null);
  const [reservationPeakHoursOptions, setReservationPeakHoursOptions] =
    useState(null);

  const [staffactivityRows, setStaffactivityRows] = useState(null);
  const columns = [
    { field: "StaffName", headerName: "Staff Name", flex: 1 },
    {
      field: "NumberOfSessions",
      headerName: "Number of sessions",
      flex: 1,
    },
  ];

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/GarageAdmin/GetAllStatsFast`, {
        params: {
          StartDate: startDate,
          EndDate: endDate,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setStatistics(response.data);
        console.log(response.data);
      });
  }, [startDate, endDate]);

  useEffect(() => {
    if (!statistics) {
      return;
    }
    // =============================================REVENUE=====================================================
    //====================Payment options=========================

    const data = [
      ["Date", "Cash", "Card", "Mobile"],
      [
        `${startDate} - ${endDate}`,
        parseInt(statistics.TotalRevenue.NumberOfCashPayments),
        parseInt(statistics.TotalRevenue.NumberOfCardPayments),
        parseInt(statistics.TotalRevenue.NumberOfMobilePayments),
      ],
    ];

    const options = {
      chart: {
        title: "Payment options",
        subtitle: `Card, Cash, and Mobile: ${startDate} - ${endDate}`,
      },
      vAxis: { title: "Payment options", viewWindow: { min: 0 } },
      colors: ["#e0440e", "#e6693e", "#ec8f6e", "#f3b49f"], // Custom colors for each series
    };
    setRevenueColumnChartData(data);
    setRevenueColumnChartOptions(options);
    //========================kinds of revenue=====================
    console.log(statistics.TotalRevenue.SumRequiredPayments);
    const barChartdata = [
      ["Period", "Actual Payments", "Profit From Overpay"],
      [
        `${startDate} - ${endDate}`,
        parseInt(statistics.TotalRevenue.SumActualPayments),
        parseInt(statistics.TotalRevenue.ProfitFromOverpay),
      ],
    ];

    const barChartoptions = {
      chart: {
        title: "Payment Summary",
        subtitle: `Period: ${startDate} - ${endDate}`,
      },
      vAxis: {
        title: "Period",
        viewWindow: { min: 0 },
      },
      hAxis: {
        title: "Amount",
        viewWindow: { min: 0 },
      },
      colors: ["#e0440e", "#e6693e", "#ec8f6e"], // Custom colors for each series
      backgroundColor: "#f0f0f0", // Background color of the chart area\
      borderRadius: 5,
      width: "50%",
    };
    setRevenueBarChartData(barChartdata);
    setRevenueBarChartOptions(barChartoptions);
    // =============================================Complaints=====================================================
    const pieChartdata = [
      ["Complaints", "Types of complaints"],
      ["Other", statistics.ComplaintsStatistics.ComplaintsByType.Other || 0],
      [
        "SystemError",
        statistics.ComplaintsStatistics.ComplaintsByType.SystemError,
      ],
      [
        "BillingError",
        statistics.ComplaintsStatistics.ComplaintsByType.BillingError,
      ],
      [
        "ServiceDelay",
        statistics.ComplaintsStatistics.ComplaintsByType.ServiceDelay,
      ],
      [
        "EquipmentIssue",
        statistics.ComplaintsStatistics.ComplaintsByType.EquipmentIssue,
      ],
      [
        "PolicyViolation",
        statistics.ComplaintsStatistics.ComplaintsByType.PolicyViolation,
      ],
      [
        "CustomerFeedback",
        statistics.ComplaintsStatistics.ComplaintsByType.CustomerFeedback,
      ],
    ];
    //  Other" or "SystemError" or "BillingError" or "ServiceDelay" or "EquipmentIssue" or "PolicyViolation" or "CustomerFeedback"
    const pieChartoptions = {
      title: "Complaint Types",
      pieHole: 0.2, // Optional: Creates a donut chart
    };

    setComplaintsPieChartData(pieChartdata);
    setComplaintsPieChartOptions(pieChartoptions);
    // =============================================Non-resolved Complaints=====================================================
    const nonResolvedpieChartdata = [
      ["Complaints", "Types of complaints"],
      [
        "Other",
        statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.Other || 0,
      ],
      [
        "SystemError",
        statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.SystemError,
      ],
      [
        "BillingError",
        statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.BillingError,
      ],
      [
        "ServiceDelay",
        statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.ServiceDelay,
      ],
      [
        "EquipmentIssue",
        statistics.ComplaintsStatistics_nonsolved.ComplaintsByType
          .EquipmentIssue,
      ],
      [
        "PolicyViolation",
        statistics.ComplaintsStatistics_nonsolved.ComplaintsByType
          .PolicyViolation,
      ],
      [
        "CustomerFeedback",
        statistics.ComplaintsStatistics_nonsolved.ComplaintsByType
          .CustomerFeedback,
      ],
    ];
    //  Other" or "SystemError" or "BillingError" or "ServiceDelay" or "EquipmentIssue" or "PolicyViolation" or "CustomerFeedback"
    const nonResolvedpieChartoptions = {
      title: "Complaint Types",
      pieHole: 0.2, // Optional: Creates a donut chart
    };

    setNonresolvedComplaintsPieChartData(nonResolvedpieChartdata);
    setNonresolvedComplaintsPieChartOptions(nonResolvedpieChartoptions);
    // =============================================Reservations=====================================================
    const reservationData = [
      ["Element", "Density", { role: "style" }],
      [
        "Reserved-Operations",
        statistics.ReservedVsNonReservedParkingUsage.ReservedCount,
        "#b87333",
      ],
      [
        "NonReserved-Operations",
        statistics.ReservedVsNonReservedParkingUsage.NonReservedCount,
        "silver",
      ],
    ];

    const reservationOptions = {
      title: "Reservation vs Non-reservation parking operations",
    };

    setReservationData(reservationData);
    setReservationOptions(reservationOptions);
    // =============================================Peak Hours=====================================================

    const peakHoursData = [["Hour", "Peak"]];

    for (let hour = 0; hour < 24; hour++) {
      const isPeak = statistics.PeakParkingHours.PeakHoursOfTheDay.includes(
        hour
      )
        ? 1
        : 0;

      peakHoursData.push([hour, isPeak]);
    }

    const peakHoursoptions = {
      title: "Peak Hours for the Day",
      hAxis: {
        title: "Hour",
        format: "0", // Format hour as integer
      },
      vAxis: {
        title: "Peak (1 = Peak Hour,\n 0 = Non-peak Hour)",
        minValue: 0,
        maxValue: 1,
      },
      legend: "none",
    };

    setpeakHoursOptions(peakHoursoptions);
    setpeakHoursData(peakHoursData);
    // =============================================Reservation Peak Hours=====================================================
    //

    const reservationpeakHoursData = [["Hour", "Peak"]];

    for (let hour = 0; hour < 24; hour++) {
      const isPeak = statistics.TotalReservations.PeakHoursOfTheDay.includes(
        hour
      )
        ? 1
        : 0;

      reservationpeakHoursData.push([hour, isPeak]);
    }

    const reservationpeakHoursoptions = {
      title: "Peak Hours for the Day",
      hAxis: {
        title: "Hour",
        format: "0", // Format hour as integer
      },
      vAxis: {
        title: "Peak (1 = Peak Hour,\n 0 = Non-peak Hour)",
        minValue: 0,
        maxValue: 1,
      },
      legend: "none",
    };

    setReservationPeakHoursOptions(reservationpeakHoursoptions);
    setReservationPeakHoursData(reservationpeakHoursData);

    //

    if (statistics.StaffActivityRating.StaffActivities?.length > 0) {
      const rows = statistics.StaffActivityRating.StaffActivities?.map(
        (staffActivity, index) => ({
          id: index,
          ...staffActivity,
        })
      );

      setStaffactivityRows(rows);
    } else {
      return;
    }
  }, [statistics]);

  return (
    <>
      {statistics && (
        <div className={DashboardStyle.GarageStatistics}>
          <h1>Garage statistics</h1>
          <div className={DashboardStyle.date}>
            <div className={DashboardStyle.dateItems}>
              <label htmlFor="start-date">Start Date:</label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                value={startDate}
                onChange={handleStartDateChange}
                required
              />
            </div>
            <div className={DashboardStyle.dateItems}>
              <label htmlFor="end-date">End Date:</label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                value={endDate}
                onChange={handleEndDateChange}
                required
              />
            </div>
          </div>
          {/* ===================================================================================================== */}
          <div className={DashboardStyle.statisticsContents}>
            {/* Render Cards component here */}

            {/* ===========================Reservation============================= */}
            <div className={DashboardStyle.StatisticsCard}>
              <h4 style={{ textAlign: "left" }}>Reservations</h4>

              <p>
                Total number of reservations:{" "}
                <span>{statistics.TotalReservations.NumberOfReservations}</span>
              </p>
              <p>
                Total revenue of reservations:{" "}
                <span>
                  `
                  {formatCurrency(
                    statistics.TotalReservations.SumReservationMoney
                  )}
                  `
                </span>
              </p>
              <div className={DashboardStyle.StatisticsCardContent}>
                <PieChart data={ResrvationData} options={ResrvationOptions} />
                <h6 style={{ textAlign: "center" }}>Reservation data</h6>
              </div>
              <div className={DashboardStyle.StatisticsCardContent}>
                <ColumnChart
                  data={reservationPeakHoursData}
                  options={reservationPeakHoursOptions}
                />
                <h6 style={{ textAlign: "center" }}>Reservation peak hours</h6>
              </div>
            </div>
            {/* ==================================================== */}

            <div className={DashboardStyle.StatisticsCard}>
              <h4 style={{ textAlign: "left" }}>Revenue</h4>
              <p>
                Required Payments are :{" "}
                <span>
                  {formatCurrency(statistics.TotalRevenue.SumRequiredPayments)}
                </span>
              </p>
              <div className={DashboardStyle.StatisticsCardContent}>
                <ColumnChart
                  data={revenueBarChartData}
                  options={revenueBarChartOptions}
                />
                <h6>Payments formation</h6>
              </div>
              <div className={DashboardStyle.StatisticsCardContent}>
                <ColumnChart
                  data={revenueColumnChartData}
                  options={revenueColumnChartOptions}
                />
                <h6>Preffered types of payment</h6>
              </div>
            </div>

            <div className={DashboardStyle.StatisticsCard}>
              <h4 style={{ textAlign: "left" }}>Complaints</h4>
              <p>
                Average resolution time is :{" "}
                <span>
                  {formatFriendlyTime(
                    statistics.ComplaintsStatistics.AverageResolutionTime
                  )}
                </span>
              </p>
              <p>
                Total forawarded complaints:{" "}
                <span>
                  {statistics.ComplaintsStatistics
                    .NumberOfComplaintsForwardedToGarage +
                    statistics.ComplaintsStatistics_nonsolved
                      .NumberOfComplaintsForwardedToGarage}
                </span>
              </p>
              <div className={DashboardStyle.StatisticsCardContent}>
                <PieChart
                  data={ComplaintsPieChartData}
                  options={ComplaintsPieChartOptions}
                />
                <h6>Solved Complaints</h6>
              </div>
              <div className={DashboardStyle.StatisticsCardContent}>
                <PieChart
                  data={NonresolvedComplaintsPieChartData}
                  options={NonresolvedComplaintsPieChartOptions}
                />
              </div>

              <h6>Un-Solved Complaints</h6>
            </div>
            <div className={DashboardStyle.StatisticsCard}>
              <h4 style={{ textAlign: "left" }}>Peak hours of the day</h4>
              <div className={DashboardStyle.StatisticsCardContent}>
              <ColumnChart data={peakHoursData} options={peakHoursOptions} />
              </div>
            </div>
            {/* General */}
            <Card
              title="Average parking time"
              value={formatFriendlyTime(
                statistics.AverageParkingDuration.AverageDuration
              )}
              icon={operations}
            />
            <Card
              title="Total salary paid"
              value={formatCurrency(statistics.TotalSalaryPaid.TotalSalaryPaid)}
              icon={revenue}
            />
            <div className={DashboardStyle.StatisticsTable}>
              <h4 style={{ textAlign: "left" }}>Staff activities</h4>
              {/* staff activities */}
              {staffactivityRows && (
                <DataGrid
                  rows={staffactivityRows}
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
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

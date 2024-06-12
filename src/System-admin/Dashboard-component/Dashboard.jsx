//===============================chartJS===========================================================

import { useEffect, useState } from "react";
import DashboardStyle from "../Styles/Dashboard.module.css";
import operations from "../assets/light-mode/parking-op.svg";
import revenue from "../assets/light-mode/revenue.svg";
import expenses from "../assets/light-mode/expenses.svg";
import Card from "./Card";
import ColumnChart from "./chartJS components/ColumnChart";
import PieChart from "./chartJS components/PieChart";
import DataGrid from "../Styled-Table/CustomDataGrid";
import axiosInstance from "./../../auth/axios";
import Swal from "sweetalert2";
import Loader from "../../helper/loading-component/loader";
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
  const time = parseInt(timeValue);
  const period = time < 12 ? "AM" : "PM";
  let hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  const formattedTime = `${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${period}`;

  return formattedTime;
}

const formatDate = (date) => {
  const month = date.getMonth() + 1; // months are 0-based
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken");
  const today = new Date();

  const startOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  const startOfPreviousMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  if (today.getMonth() === 0) {
    // if current month is January
    startOfPreviousMonth.setFullYear(today.getFullYear() - 1);
  }
  const startOfCurrentMonthLastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    1
  );

  const [startDate, setStartDate] = useState(
    formatDate(startOfCurrentMonthLastYear)
  );
  const [endDate, setEndDate] = useState(formatDate(startOfCurrentMonth));

  const [statistics, setStatistics] = useState(null);
  const [revenueColumnChartData, setRevenueColumnChartData] = useState(null);
  const [revenueColumnChartOptions, setRevenueColumnChartOptions] =
    useState(null);
  const [revenueBarChartData, setRevenueBarChartData] = useState(null);
  const [revenueBarChartOptions, setRevenueBarChartOptions] = useState(null);
  const [complaintsPieChartData, setComplaintsPieChartData] = useState(null);
  const [complaintsPieChartOptions, setComplaintsPieChartOptions] =
    useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [reservationOptions, setReservationOptions] = useState(null);
  const [
    nonResolvedComplaintsPieChartData,
    setNonResolvedComplaintsPieChartData,
  ] = useState(null);
  const [
    nonResolvedComplaintsPieChartOptions,
    setNonResolvedComplaintsPieChartOptions,
  ] = useState(null);
  const [peakHoursData, setPeakHoursData] = useState(null);
  const [peakHoursOptions, setPeakHoursOptions] = useState(null);
  const [reservationPeakHoursData, setReservationPeakHoursData] =
    useState(null);
  const [reservationPeakHoursOptions, setReservationPeakHoursOptions] =
    useState(null);
  const [staffactivityRows, setStaffactivityRows] = useState(null);

  const columns = [
    { field: "StaffName", headerName: "Staff Name", flex: 1 },
    { field: "NumberOfSessions", headerName: "Number of sessions", flex: 1 },
  ];

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/GarageAdmin/GetAllStatsFast`, {
        params: { StartDate: startDate, EndDate: endDate },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setStatistics(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setLoading(false);
      });
  }, [startDate, endDate]);

  useEffect(() => {
    if (!statistics) {
      return;
    }
    // Payment options
    const data = {
      labels: ["Payment options"],
      datasets: [
        {
          label: "Cash",
          data: [parseInt(statistics.TotalRevenue.NumberOfCashPayments)],
          backgroundColor: ["#e0440e"],
        },
        {
          label: "Card",
          data: [parseInt(statistics.TotalRevenue.NumberOfCardPayments)],
          backgroundColor: ["#e6693e"],
        },
        {
          label: "MobilePayments",
          data: [parseInt(statistics.TotalRevenue.NumberOfMobilePayments)],
          backgroundColor: ["#ec8f6e"],
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Payment options" },
      },
    };

    setRevenueColumnChartData(data);
    setRevenueColumnChartOptions(options);

    // Payment Summary
    const barChartData = {
      labels: [`${startDate} - ${endDate}`],
      datasets: [
        {
          label: "Actual Payments",
          data: [parseInt(statistics.TotalRevenue.SumActualPayments)],
          backgroundColor: "#e0440e",
        },
        {
          label: "Profit From Overpay",
          data: [parseInt(statistics.TotalRevenue.ProfitFromOverpay)],
          backgroundColor: "#e6693e",
        },
      ],
    };

    const barChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Payment Summary" },
      },
    };

    setRevenueBarChartData(barChartData);
    setRevenueBarChartOptions(barChartOptions);

    // Complaints
    const pieChartData = {
      labels: [
        "Other",
        "SystemError",
        "BillingError",
        "ServiceDelay",
        "EquipmentIssue",
        "PolicyViolation",
        "CustomerFeedback",
      ],
      datasets: [
        {
          label: "Types of complaints",
          data: [
            statistics.ComplaintsStatistics.ComplaintsByType.Other || 0,
            statistics.ComplaintsStatistics.ComplaintsByType.SystemError,
            statistics.ComplaintsStatistics.ComplaintsByType.BillingError,
            statistics.ComplaintsStatistics.ComplaintsByType.ServiceDelay,
            statistics.ComplaintsStatistics.ComplaintsByType.EquipmentIssue,
            statistics.ComplaintsStatistics.ComplaintsByType.PolicyViolation,
            statistics.ComplaintsStatistics.ComplaintsByType.CustomerFeedback,
          ],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
          ],
        },
      ],
    };

    const pieChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Complaint Types" },
      },
    };

    setComplaintsPieChartData(pieChartData);
    setComplaintsPieChartOptions(pieChartOptions);

    // Non-resolved Complaints
    const nonResolvedPieChartData = {
      labels: [
        "Other",
        "SystemError",
        "BillingError",
        "ServiceDelay",
        "EquipmentIssue",
        "PolicyViolation",
        "CustomerFeedback",
      ],
      datasets: [
        {
          label: "Types of complaints",
          data: [
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.Other ||
              0,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType
              .SystemError,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType
              .BillingError,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType
              .ServiceDelay,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType
              .EquipmentIssue,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType
              .PolicyViolation,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType
              .CustomerFeedback,
          ],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
          ],
        },
      ],
    };

    const nonResolvedPieChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Non-resolved Complaint Types" },
      },
    };

    setNonResolvedComplaintsPieChartData(nonResolvedPieChartData);
    setNonResolvedComplaintsPieChartOptions(nonResolvedPieChartOptions);

    // Reservations
    const reservationData = {
      labels: ["Reserved-Operations", "NonReserved-Operations"],
      datasets: [
        {
          label: "Density",
          data: [
            statistics.ReservedVsNonReservedParkingUsage.ReservedCount,
            statistics.ReservedVsNonReservedParkingUsage.NonReservedCount,
          ],
          backgroundColor: ["#b87333", "silver"],
        },
      ],
    };

    const reservationOptions = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: "Reservation vs Non-reservation parking operations",
        },
      },
    };

    setReservationData(reservationData);
    setReservationOptions(reservationOptions);

    // Peak Hours
    const peakHoursData = {
      labels: Array.from({ length: 24 }, (_, i) => i.toString()),
      datasets: [
        {
          label: "Peak",
          data: Array.from({ length: 24 }, (_, i) =>
            statistics.PeakParkingHours.PeakHoursOfTheDay.includes(i) ? 1 : 0
          ),
          backgroundColor: "#FF6384",
        },
      ],
    };

    const peakHoursOptions = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Peak Hours for the Day" },
      },
      scales: {
        x: { title: { display: true, text: "Hour" }, ticks: { stepSize: 1 } },
        y: {
          title: {
            display: true,
            text: "Peak (1 = Peak Hour, 0 = Non-peak Hour)",
          },
          min: 0,
          max: 1,
        },
      },
    };

    setPeakHoursData(peakHoursData);
    setPeakHoursOptions(peakHoursOptions);

    // Reservation Peak Hours
    const reservationPeakHoursData = {
      labels: Array.from({ length: 24 }, (_, i) => i.toString()),
      datasets: [
        {
          label: "Peak",
          data: Array.from({ length: 24 }, (_, i) =>
            statistics.TotalReservations.PeakHoursOfTheDay.includes(i) ? 1 : 0
          ),
          backgroundColor: "#FF6384",
        },
      ],
    };

    const reservationPeakHoursOptions = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Reservation Peak Hours for the Day" },
      },
      scales: {
        x: { title: { display: true, text: "Hour" }, ticks: { stepSize: 1 } },
        y: {
          title: {
            display: true,
            text: "Peak (1 = Peak Hour, 0 = Non-peak Hour)",
          },
          min: 0,
          max: 1,
        },
      },
    };

    setReservationPeakHoursData(reservationPeakHoursData);
    setReservationPeakHoursOptions(reservationPeakHoursOptions);

    // Staff activities
    if (statistics.StaffActivityRating.StaffActivities?.length > 0) {
      const rows = statistics.StaffActivityRating.StaffActivities?.map(
        (staffActivity, index) => ({
          id: index,
          ...staffActivity,
        })
      );

      setStaffactivityRows(rows);
    } else {
      setStaffactivityRows([]);
    }
  }, [statistics]);

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
          <div className={DashboardStyle.statisticsContents}>
            <div className={DashboardStyle.StatisticsCard}>
              <h4 style={{ textAlign: "left" }}>Reservations</h4>
              <p>
                Total number of reservations:{" "}
                <span>{statistics.TotalReservations.NumberOfReservations}</span>
              </p>
              <p>
                Total revenue of reservations:{" "}
                <span>
                  {formatCurrency(
                    statistics.TotalReservations.SumReservationMoney
                  )}
                </span>
              </p>
              <div className={DashboardStyle.StatisticsCardContent}>
                {reservationData && reservationOptions && (
                  <PieChart
                    data={reservationData}
                    options={reservationOptions}
                  />
                )}
                <h6 style={{ textAlign: "center" }}>Reservation data</h6>
              </div>
              <div className={DashboardStyle.StatisticsCardContent}>
                {reservationPeakHoursData && reservationPeakHoursOptions && (
                  <ColumnChart
                    data={reservationPeakHoursData}
                    options={reservationPeakHoursOptions}
                  />
                )}
                <h6 style={{ textAlign: "center" }}>Reservation peak hours</h6>
              </div>
            </div>

            <div className={DashboardStyle.StatisticsCard}>
              <h4 style={{ textAlign: "left" }}>Revenue</h4>
              <p>
                Required Payments are :{" "}
                <span>
                  {formatCurrency(statistics.TotalRevenue.SumRequiredPayments)}
                </span>
              </p>
              <div className={DashboardStyle.StatisticsCardContent}>
                {revenueBarChartData && revenueBarChartOptions && (
                  <ColumnChart
                    data={revenueBarChartData}
                    options={revenueBarChartOptions}
                  />
                )}
                <h6>Payments formation</h6>
              </div>
              <div className={DashboardStyle.StatisticsCardContent}>
                {revenueColumnChartData && revenueColumnChartOptions && (
                  <ColumnChart
                    data={revenueColumnChartData}
                    options={revenueColumnChartOptions}
                  />
                )}
                <h6>Preferred types of payment</h6>
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
                Total forwarded complaints:{" "}
                <span>
                  {statistics.ComplaintsStatistics
                    .NumberOfComplaintsForwardedToGarage +
                    statistics.ComplaintsStatistics_nonsolved
                      .NumberOfComplaintsForwardedToGarage}
                </span>
              </p>
              <div className={DashboardStyle.StatisticsCardContent}>
                {complaintsPieChartData && complaintsPieChartOptions && (
                  <PieChart
                    data={complaintsPieChartData}
                    options={complaintsPieChartOptions}
                  />
                )}
                <h6>Solved Complaints</h6>
              </div>
              <div className={DashboardStyle.StatisticsCardContent}>
                {nonResolvedComplaintsPieChartData &&
                  nonResolvedComplaintsPieChartOptions && (
                    <PieChart
                      data={nonResolvedComplaintsPieChartData}
                      options={nonResolvedComplaintsPieChartOptions}
                    />
                  )}
              </div>
              <h6>Un-Solved Complaints</h6>
            </div>

            <div className={DashboardStyle.StatisticsCard}>
              <h4 style={{ textAlign: "left" }}>Peak hours of the day</h4>
              <div className={DashboardStyle.StatisticsCardContent}>
                {peakHoursData && peakHoursOptions && (
                  <ColumnChart
                    data={peakHoursData}
                    options={peakHoursOptions}
                  />
                )}
              </div>
            </div>

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

              {staffactivityRows?.length > 0 ? (
                <DataGrid
                  rows={staffactivityRows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 8, 11]}
                />
              ) : (
                <div style={{ marginTop: "15px" }}>
                  There is no staff activities in this garage
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

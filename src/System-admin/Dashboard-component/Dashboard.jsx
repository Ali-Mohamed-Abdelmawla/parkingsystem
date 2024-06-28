//container

// Dashboard.js
import React, { useEffect, useState } from "react";
import DashboardView from "./DashboardPresentation";
import axiosInstance from "./../../auth/axios";
import sweetAlertInstance from "../../helper/SweetAlert";
import Loader from "../../helper/loading-component/loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken");
  const today = new Date();

  const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  if (today.getMonth() === 0) {
    // if current month is January
    startOfPreviousMonth.setFullYear(today.getFullYear() - 1);
  }
  const startOfCurrentMonthLastYear = new Date(today.getFullYear() - 1, today.getMonth(), 1);

  const [startDate, setStartDate] = useState(formatDate(startOfCurrentMonthLastYear));
  const [endDate, setEndDate] = useState(formatDate(startOfCurrentMonth));

  const [statistics, setStatistics] = useState(null);
  const [revenueColumnChartData, setRevenueColumnChartData] = useState(null);
  const [revenueColumnChartOptions, setRevenueColumnChartOptions] = useState(null);
  const [revenueBarChartData, setRevenueBarChartData] = useState(null);
  const [revenueBarChartOptions, setRevenueBarChartOptions] = useState(null);
  const [complaintsPieChartData, setComplaintsPieChartData] = useState(null);
  const [complaintsPieChartOptions, setComplaintsPieChartOptions] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [reservationOptions, setReservationOptions] = useState(null);
  const [nonResolvedComplaintsPieChartData, setNonResolvedComplaintsPieChartData] = useState(null);
  const [nonResolvedComplaintsPieChartOptions, setNonResolvedComplaintsPieChartOptions] = useState(null);
  const [peakHoursData, setPeakHoursData] = useState(null);
  const [peakHoursOptions, setPeakHoursOptions] = useState(null);
  const [reservationPeakHoursData, setReservationPeakHoursData] = useState(null);
  const [reservationPeakHoursOptions, setReservationPeakHoursOptions] = useState(null);
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
        sweetAlertInstance.fire({
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
        title: { display: true, text: "Revenue Summary" },
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
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.Other || 0,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.SystemError,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.BillingError,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.ServiceDelay,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.EquipmentIssue,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.PolicyViolation,
            statistics.ComplaintsStatistics_nonsolved.ComplaintsByType.CustomerFeedback,
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

    const hourLabels = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00');

    // Peak Hours
    const peakHoursData = {
      labels: hourLabels,
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
        title: { display: true, text: "Most Profitable Hours (Normal Sessions)" },
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
      labels: hourLabels,
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
        title: { display: true, text: "Most Profitable Days (Reserved Sessions)" },
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
        <DashboardView
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          statistics={statistics}
          reservationData={reservationData}
          reservationOptions={reservationOptions}
          reservationPeakHoursData={reservationPeakHoursData}
          reservationPeakHoursOptions={reservationPeakHoursOptions}
          revenueBarChartData={revenueBarChartData}
          revenueBarChartOptions={revenueBarChartOptions}
          revenueColumnChartData={revenueColumnChartData}
          revenueColumnChartOptions={revenueColumnChartOptions}
          complaintsPieChartData={complaintsPieChartData}
          complaintsPieChartOptions={complaintsPieChartOptions}
          nonResolvedComplaintsPieChartData={nonResolvedComplaintsPieChartData}
          nonResolvedComplaintsPieChartOptions={nonResolvedComplaintsPieChartOptions}
          peakHoursData={peakHoursData}
          peakHoursOptions={peakHoursOptions}
          staffactivityRows={staffactivityRows}
          columns={columns}
        />
      )}
    </>
  );
};

export default Dashboard;

const formatDate = (date) => {
  const month = date.getMonth() + 1; // months are 0-based
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

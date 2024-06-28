
// container

// DashboardforTechnicalSupport.js
import React, { useEffect, useState } from "react";
import DashboardView from "./DashboardPresentation";
import axiosInstance from "./../../auth/axios";
import sweetAlertInstance from "../../helper/SweetAlert";
import Loader from "../../helper/loading-component/loader";

const formatDate = (date) => {
  const month = date.getMonth() + 1; // months are 0-based
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

const DashboardforTechnicalSupport = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const today = new Date();
  const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  if (today.getMonth() === 0) {
    startOfPreviousMonth.setFullYear(today.getFullYear() - 1);
  }
  const startOfCurrentMonthLastYear = new Date(today.getFullYear() - 1, today.getMonth(), 1);

  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(formatDate(startOfCurrentMonthLastYear));
  const [endDate, setEndDate] = useState(formatDate(startOfCurrentMonth));
  const [selectedGarageId, setSelectedGarageId] = useState("");
  const [statistics, setStatistics] = useState(null);
  const [garagesIds, setGaragesIds] = useState([]);
  const [specificGarageData, setSpecificGarageData] = useState(null);
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
  const [staffactivityRows, setStaffactivityRows] = useState([]);

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

  const handleGarageChange = (event) => {
    const selectedGarageId = event.target.value;
    const garageData = statistics.find(stat => stat.GarageId === selectedGarageId);
    setSpecificGarageData(garageData);
    setSelectedGarageId(selectedGarageId);
  };

  const GetGarageStatistics = () => {
    setLoading(true);
    axiosInstance.get(`/TechnicalSupport/GetAllGarageStatistics`, {
      params: { StartDate: startDate, EndDate: endDate },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setStatistics(response.data);
      console.log(response.data);
      setStartDate(startDate);
      setEndDate(endDate);
      const garageIds = response.data.map(stat => stat.GarageId);
      setSelectedGarageId(garageIds[0]);
      const initialGarageData = response.data.find(stat => stat.GarageId === garageIds[0]);
      setSpecificGarageData(initialGarageData);
      setGaragesIds(garageIds);
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
  };

  useEffect(() => {
    GetGarageStatistics();
  }, [startDate, endDate]);

  useEffect(() => {
    if (!specificGarageData) {
      return;
    }

    // Payment options
    const data = {
      labels: ["Cash", "Card", "Mobile"],
      datasets: [
        {
          label: "Number of Payments",
          data: [
            parseInt(specificGarageData?.TotalRevenue?.NumberOfCashPayments),
            parseInt(specificGarageData?.TotalRevenue?.NumberOfCardPayments),
            parseInt(specificGarageData?.TotalRevenue?.NumberOfMobilePayments),
          ],
          backgroundColor: ["#e0440e", "#e6693e", "#ec8f6e"],
        },
      ],
    };

    const options = {
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
          data: [parseInt(specificGarageData?.TotalRevenue?.SumActualPayments)],
          backgroundColor: "#e0440e",
        },
        {
          label: "Profit From Overpay",
          data: [parseInt(specificGarageData?.TotalRevenue?.ProfitFromOverpay)],
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
            specificGarageData?.ComplaintsStatistics?.ComplaintsByType?.Other || 0,
            specificGarageData?.ComplaintsStatistics?.ComplaintsByType?.SystemError,
            specificGarageData?.ComplaintsStatistics?.ComplaintsByType?.BillingError,
            specificGarageData?.ComplaintsStatistics?.ComplaintsByType?.ServiceDelay,
            specificGarageData?.ComplaintsStatistics?.ComplaintsByType?.EquipmentIssue,
            specificGarageData?.ComplaintsStatistics?.ComplaintsByType?.PolicyViolation,
            specificGarageData?.ComplaintsStatistics?.ComplaintsByType?.CustomerFeedback,
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
            specificGarageData?.ComplaintsStatistics_nonsolved?.ComplaintsByType?.Other || 0,
            specificGarageData?.ComplaintsStatistics_nonsolved?.ComplaintsByType?.SystemError,
            specificGarageData?.ComplaintsStatistics_nonsolved?.ComplaintsByType?.BillingError,
            specificGarageData?.ComplaintsStatistics_nonsolved?.ComplaintsByType?.ServiceDelay,
            specificGarageData?.ComplaintsStatistics_nonsolved?.ComplaintsByType?.EquipmentIssue,
            specificGarageData?.ComplaintsStatistics_nonsolved?.ComplaintsByType?.PolicyViolation,
            specificGarageData?.ComplaintsStatistics_nonsolved?.ComplaintsByType?.CustomerFeedback,
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
            specificGarageData?.ReservedVsNonReservedParkingUsage?.ReservedCount,
            specificGarageData?.ReservedVsNonReservedParkingUsage?.NonReservedCount,
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

    const hourLabels = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00');

    // Peak Hours
    const peakHoursData = {
      labels: hourLabels,
      datasets: [
        {
          label: "Peak",
          data: Array.from({ length: 24 }, (_, i) =>
            specificGarageData?.PeakParkingHours?.PeakHoursOfTheDay?.includes(i)
              ? 1
              : 0
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
            specificGarageData?.TotalReservations?.PeakHoursOfTheDay?.includes(
              i
            )
              ? 1
              : 0
          ),
          backgroundColor: "#FF6384",
        },
      ],
    };

    const reservationPeakHoursOptions = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Most Profitable Hours (Reserved Sessions)" },
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
    if (specificGarageData?.StaffActivityRating?.StaffActivities?.length > 0) {
      const rows = specificGarageData?.StaffActivityRating?.StaffActivities?.map(
        (staffActivity, index) => ({
          id: index,
          ...staffActivity,
        })
      );

      setStaffactivityRows(rows);
    } else {
      setStaffactivityRows([]);
    }
  }, [specificGarageData]);

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
    <DashboardView
      startDate={startDate}
      endDate={endDate}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      selectedGarageId={selectedGarageId}
      handleGarageChange={handleGarageChange}
      garagesIds={garagesIds}
      specificGarageData={specificGarageData}
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
  );
};

export default DashboardforTechnicalSupport;

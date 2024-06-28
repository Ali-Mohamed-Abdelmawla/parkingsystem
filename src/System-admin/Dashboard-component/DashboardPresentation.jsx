// DashboardView.js
import React from "react";
import DashboardStyle from "../Styles/Dashboard.module.css";
import operations from "../assets/light-mode/parking-op.svg";
import revenue from "../assets/light-mode/revenue.svg";
import Card from "./Card";
import ColumnChart from "./chartJS components/ColumnChart";
import PieChart from "./chartJS components/PieChart";
import DataGrid from "../Styled-Table/CustomDataGrid";

const formatFriendlyTime = (timeString) => {
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
};

const formatCurrency = (currencyValue, currencyCode = "USD") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  });

  return formatter.format(currencyValue);
};

const formatDate = (date) => {
  const month = date.getMonth() + 1; // months are 0-based
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

const DashboardView = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  statistics,
  reservationData,
  reservationOptions,
  reservationPeakHoursData,
  reservationPeakHoursOptions,
  revenueBarChartData,
  revenueBarChartOptions,
  revenueColumnChartData,
  revenueColumnChartOptions,
  complaintsPieChartData,
  complaintsPieChartOptions,
  nonResolvedComplaintsPieChartData,
  nonResolvedComplaintsPieChartOptions,
  peakHoursData,
  peakHoursOptions,
  staffactivityRows,
  columns,
}) => {
  return (
    <div className={DashboardStyle.GarageStatistics}>
      <h1>Garage statistics</h1>
      <hr></hr>
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
      <hr className={DashboardStyle.divider}></hr>
      <h2 style={{ textAlign: "center" }}>Statistics</h2>
      <hr className={DashboardStyle.divider2}></hr>
      <div className={DashboardStyle.statisticsContents}>
        {/* ============================================================================================== */}

        <div className={DashboardStyle.StatisticsCard}  style={{ gridArea: "double" }}>
          <h3 style={{ textAlign: "center" }}>Most profitable hours</h3>
          <br></br>
          {/* <p><strong>Peak hours for normal sessions</strong></p> */}
          <div className={DashboardStyle.StatisticsCardContent}>
            {peakHoursData && peakHoursOptions && (
              <ColumnChart data={peakHoursData} options={peakHoursOptions} />
            )}
            {/* <h6 style={{ textAlign: "center" }}>Reservation data</h6> */}
          </div>

          {/* <p><strong>Peak hours for reserved sessions</strong></p> */}
          <div className={DashboardStyle.StatisticsCardContent}>
            {reservationPeakHoursData && reservationPeakHoursOptions && (
              <ColumnChart
                data={reservationPeakHoursData}
                options={reservationPeakHoursOptions}
              />
            )}
            {/* <h6 style={{ textAlign: "center" }}>Reservation peak hours</h6> */}
          </div>
        </div>

        {/* ============================================================================================== */}

        <div className={DashboardStyle.StatisticsCard} style={{ gridArea: "double2" }}>
          <h3 style={{ textAlign: "center" }}>Revenue</h3>
          <br></br>
          <p>
            <strong>Overpayment Revenue :</strong>{" "}
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
            {/* <h6>Payments formation</h6> */}
          </div>
          <div className={DashboardStyle.StatisticsCardContent}>
            {revenueColumnChartData && revenueColumnChartOptions && (
              <ColumnChart
                data={revenueColumnChartData}
                options={revenueColumnChartOptions}
              />
            )}
            {/* <h6>Preferred types of payment</h6> */}
          </div>
        </div>

        {/* ============================================================================================== */}


        <Card
          title="Total salary paid"
          value={formatCurrency(statistics.TotalSalaryPaid.TotalSalaryPaid)}
          icon={revenue}
          gridName="card"
        />

        {/* ============================================================================================== */}

        <Card
          title="Average parking time"
          value={formatFriendlyTime(
            statistics.AverageParkingDuration.AverageDuration
          )}
          icon={operations}
          gridName="card2"
        />

        {/* ============================================================================================== */}

        <div className={DashboardStyle.StatisticsCard} style={{ gridArea: "pie" }}>
          <h3 style={{ textAlign: "center" }}>Complaints</h3>
          <br></br>
          <p>
            <strong>Average resolution time is :</strong>{" "}
            <span>
              {formatFriendlyTime(
                statistics.ComplaintsStatistics.AverageResolutionTime
              )}
            </span>
          </p>
          <p>
          <strong>Total forwarded complaints:</strong>{" "}
            <span>
              {statistics.ComplaintsStatistics
                .NumberOfComplaintsForwardedToGarage +
                statistics.ComplaintsStatistics_nonsolved
                  .NumberOfComplaintsForwardedToGarage}
            </span>
          </p>
          <div className={DashboardStyle.StatisticsCardContent_TwoPieChart}>
          <div className={DashboardStyle.StatisticsCardContent_pieChart}>
            {complaintsPieChartData && complaintsPieChartOptions && (
              <PieChart
                data={complaintsPieChartData}
                options={complaintsPieChartOptions}
              />
            )}
          </div>
          <div className={DashboardStyle.StatisticsCardContent_pieChart}>
            {nonResolvedComplaintsPieChartData &&
              nonResolvedComplaintsPieChartOptions && (
                <PieChart
                  data={nonResolvedComplaintsPieChartData}
                  options={nonResolvedComplaintsPieChartOptions}
                />
              )}

          </div>
          
          </div>
        </div>

        {/* ============================================================================================== */}

        <div className={DashboardStyle.StatisticsCard} style={{ gridArea: "pie2" }}>
          <h3 style={{ textAlign: "center" }}>Reservations</h3>
          <br></br>
          <p>
            <strong>Total number of reservations:</strong>{" "}
            <span>{statistics.TotalReservations.NumberOfReservations}</span>
          </p>
          <p>
            <strong>Total revenue of reservations:</strong>{" "}
            <span>
              {formatCurrency(statistics.TotalReservations.SumReservationMoney)}
            </span>
          </p>
          <div className={DashboardStyle.StatisticsCardContent_pieChart}>
            {reservationData && reservationOptions && (
              <PieChart data={reservationData} options={reservationOptions} />
            )}
          </div>
        </div>

        {/* ============================================================================================== */}




        <div className={DashboardStyle.StatisticsTable} style={{ gridArea: "table" }}>
          <h3 style={{ textAlign: "left" }}>Staff activities</h3>
          <br></br>
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

        {/* ============================================================================================== */}
      </div>
    </div>
  );
};

export default DashboardView;

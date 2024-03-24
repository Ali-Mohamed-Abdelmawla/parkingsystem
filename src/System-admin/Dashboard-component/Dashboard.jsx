import React from "react";
import DashboardStyle from '../Styles/Dashboard.module.css'
import operations from '../assets/light-mode/parking-op.svg';
import revenue from '../assets/light-mode/revenue.svg';
import expenses from '../assets/light-mode/expenses.svg';
import Card from "./Card";

const Dashboard = () => {
  return (
    <>
      <div className={DashboardStyle.GarageStatistics}>
        <h1>Garage statistics</h1>
        <div className={DashboardStyle.date}>
          <input type="date" name="date-taker2" />
        </div>
        <div className={DashboardStyle.statisticsContents}>
          {/* Render Cards component here */}
          <Card title="Total parking operations" value="580" icon={operations} />
          <Card title="Total revenue" value="4500 EGP" icon={revenue} />
          <Card title="Total expenses" value="1000 EGP" icon={expenses} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
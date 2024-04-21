import React from "react";
import DashboardStyle from '../Styles/Dashboard.module.css'

const Card = ({ title, value, icon }) => {
  return (
    <div className={DashboardStyle.card}>
      <div className={DashboardStyle.cardTitle}>
        <h5>{title}</h5>
        <img src={icon} alt="icon" />
      </div>
      <h4>{value}</h4>
    </div>
  );
}

export default Card;
import React from "react";
import DashboardStyle from '../Styles/Dashboard.module.css'

const Card = ({ title, value, icon }) => {
  return (
    <div className={DashboardStyle.card}>
      <div className={DashboardStyle.cardTitle}>
        <small>{title}</small>
        <img src={icon} alt="icon" />
      </div>
      <h2>{value}</h2>
    </div>
  );
}

export default Card;
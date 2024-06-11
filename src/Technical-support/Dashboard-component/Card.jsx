import DashboardStyle from "../../System-admin/Styles/Dashboard.module.css";
const Card = ({ title, value, icon }) => {
  return (
    <div className={DashboardStyle.card}>
      <div className={DashboardStyle.cardTitle}>
        <h3>{title}</h3>
        <img src={icon} alt="icon" />
      </div>
      <h2>{value}</h2>
    </div>
  );
}

export default Card;
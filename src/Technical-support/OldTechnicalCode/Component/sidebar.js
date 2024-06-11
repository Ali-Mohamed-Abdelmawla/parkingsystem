import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./sidebar.module.css";
import LightModeLogo from "../assets/LightMode/logo.svg";
import DarkModeLogo from "../assets/DarkMode/Dark-logo.svg";
import DashboardIcon from "../assets/LightMode/dashboard-icon.svg";
import DashboardDarkIcon from "../assets/DarkMode/Dashboard.dark.svg";
import CustomerServicesIcon from "../assets/LightMode/customer-services-icon.svg";
import CustomerServicesDarkIcon from "../assets/DarkMode/add-employee-dark.svg";
import ComplaintsIcon from "../assets/LightMode/complaints-icon.svg";
import ComplaintsDarkIcon from "../assets/DarkMode/complaint-dark.svg";
import GarageLight from "../assets/LightMode/add-garage.svg";
import GarageDark from "../assets/DarkMode/add-dark-garage.svg";
import AddNewGarage from "../assets/LightMode/new-garage.svg";
import DarkAddNewGarage from "../assets/DarkMode/new-dark-garage.svg";
import LightModeLogout from "../assets/LightMode/log-out.svg";
import DarkModeLogout from "../assets/DarkMode/log-out-dark.svg";
import AddUser from "../assets/LightMode/add-employee-icon.svg";
import DarkAddUser from "../assets/DarkMode/add-employee-dark.svg";
import AddNewGaragePopup from "../Pages/garage-popup";
import UserPopup from "../Pages/add-user-popup";

const Sidebar = ({ darkmode }) => {
  const navigate = useNavigate();
  const [isGaragePopupOpen, setIsGaragePopupOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const handleAddEmployeeClick = () => {
    setIsGaragePopupOpen(true);
  };

  const handleAddUserClick = () => {
    setIsUserPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsGaragePopupOpen(false);
    setIsUserPopupOpen(false);
  };

  const handleLogout = () => {
    // Clear the token from sessionStorage
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className={`${styles.sidebar} ${darkmode ? styles["dark-mode"] : ""}`}>
      <div className={styles.logo}>
        <img src={darkmode ? DarkModeLogo : LightModeLogo} alt="Logo" />
      </div>
      <div className={styles.menu}>
        <MenuItem
          icon={darkmode ? DashboardDarkIcon : DashboardIcon}
          text="Dashboard"
          onClick={() => navigate("/TechnicalSupport")}
        />
        {/* <MenuItem
          icon={darkmode ? CustomerServicesDarkIcon : CustomerServicesIcon}
          text="Users"
          onClick={() => navigate("/TechnicalSupport/Employee")}
        /> */}
        <MenuItem
          icon={darkmode ? ComplaintsDarkIcon : ComplaintsIcon}
          text="Complaints"
          onClick={() => navigate("/TechnicalSupport/Complaint")}
        />
        <MenuItem
          icon={darkmode ? GarageDark : GarageLight}
          text="Garages"
          onClick={() => navigate("/TechnicalSupport/Garages")}
        />
        <div className={styles["menu-item"]} onClick={handleAddEmployeeClick}>
          <img
            src={darkmode ? DarkAddNewGarage : AddNewGarage}
            alt="Add Garage"
          />
          <p className={styles.add}>Add Garage</p>
        </div>
        <div className={styles["menu-item"]} onClick={handleAddUserClick}>
          <img src={darkmode ? DarkAddUser : AddUser} alt="Add Employee" />
          <p className={styles.add}>Add User</p>
        </div>
      </div>
      {isGaragePopupOpen && (
        <AddNewGaragePopup onClose={handleClosePopup} darkMode={darkmode} />
      )}
      {isUserPopupOpen && (
        <UserPopup onClose={handleClosePopup} darkMode={darkmode} />
      )}
      <div className={styles["menu-item"]} onClick={handleLogout}>
        <img src={darkmode ? DarkModeLogout : LightModeLogout} alt="Logout" />
        <p>{darkmode ? "Logout" : "Logout"}</p>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text, onClick }) => {
  return (
    <div className={styles["menu-item"]} onClick={onClick}>
      <img src={icon} alt={text} />
      <p>{text}</p>
    </div>
  );
};

export default Sidebar;

import React, { useEffect, useState } from "react";
import styles from "../System-admin/Styles/styles.module.css";
// importing icons
import Whitelogo from "./assets/LightMode/White-logo.svg";
import DashboardIcon from "./assets/LightMode/dashboard-icon.svg";
import UsersIcon from "./assets/LightMode/customer-services-icon.svg";
import ComplaintsIcon from "./assets/LightMode/complaints-icon.svg";
import GaragesIcon from "./assets/LightMode/add-garage.svg";
// import bulkEmailsIcon from "./assets/LightMode/bulkEmails.svg";

import AddNewGarage from "./assets/LightMode/new-garage.svg";
import AddUserIcon from "./assets/LightMode/add-employee-icon.svg";

import Logout from "./assets/LightMode/log-out.svg";

//pop-ups
import AddGarage from "./pop-ups/addGarage";
import AddUser from "./pop-ups/addUser";

//Routes
import { useNavigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function TheOne() {
  const navigate = useNavigate();

  const [showAddPage, setShowAddPage] = useState(false);
  const [showAddGaragePage, setShowAddGaragePage] = useState(false);
  const [userName, setUserName] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserName(decodedToken.FullName);
    }
  }, []);

  useEffect(() => {
    const savedDarkMode = sessionStorage.getItem("darkMode");
    if (savedDarkMode === null) {
      sessionStorage.setItem("darkMode", "false"); // Default to light mode
      setDarkMode(false);
      document.documentElement.setAttribute("theme", "light");
    } else {
      const isDarkMode = savedDarkMode === "true";
      setDarkMode(isDarkMode);
      document.documentElement.setAttribute("theme", isDarkMode ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("darkMode", darkMode);
    document.documentElement.setAttribute("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleAddBtn = () => {
    setShowAddPage(true);
    document.body.classList.add(styles.addModalActive);
  };

  const handleCloseAddBtn = () => {
    setShowAddPage(false);
    document.body.classList.remove(styles.addModalActive);
  };

  const handleAddGarageClick = () => {
    setShowAddGaragePage(true);
    document.body.classList.add(styles.addModalActive);
  };

  const handleCloseAddGarage = () => {
    setShowAddGaragePage(false);
    document.body.classList.remove(styles.addModalActive);
  };

  const handleDashboardClick = () => {
    navigate("/TechnicalSupport");
  };

  const handleEmployeesClick = () => {
    navigate("/TechnicalSupport/Users");
  };

  const handleComplaintsClick = () => {
    navigate("/TechnicalSupport/Complaint");
  };

  const handleActiveSessionsClick = () => {
    navigate("/TechnicalSupport/Garages");
  };

  const handleLogoutBtn = () => {
    sessionStorage.removeItem("darkMode");
    sessionStorage.removeItem("accessToken");
    document.documentElement.setAttribute("theme", "light");
    navigate("/");
    // بنمسح التوكن بس و نريدايركت اليوزر لصفحه اللوجن
  };

  const switchTheme = (e) => {
    setDarkMode(e.target.checked);
  };

  return (
    <div className={styles.container}>
      <aside>
        <div className={styles.toggle}>
          <div className={styles.logo}>
            <img src={Whitelogo} alt="logo" />
            <h2>Rakna</h2>
          </div>
        </div>

        <div className={styles.sidebar}>
          <button onClick={handleDashboardClick} id="Dashboardbtn">
            <img src={DashboardIcon} alt="Dashboard icon" />
            <b>Dashboard</b>
          </button>
          <button onClick={handleEmployeesClick} id="Employeebtn">
            <img src={UsersIcon} alt="employee icon" />
            <b>Users</b>
          </button>
          <button onClick={handleComplaintsClick} id="Complaintsbtn">
            <img src={ComplaintsIcon} alt="complaints icon" />
            <b>Complaints</b>
          </button>
          <button onClick={handleActiveSessionsClick}>
            <img src={GaragesIcon} alt="activeSessions icon" />
            <b>Garages</b>
          </button>
          {/* <button onClick={handleBulkEmailsClick}>
            <img src={bulkEmailsIcon} alt="activeSessions icon" />
            <b>AllBulk Emails</b>
          </button> */}

          <button onClick={handleAddBtn}>
            <img src={AddUserIcon} alt="add icon" />
            <b>Add User</b>
          </button>

          <button id="AddComplaintsbtn" onClick={handleAddGarageClick}>
            <img src={AddNewGarage} alt="complaints icon" />
            <b>Add Garage</b>
          </button>
        </div>
      </aside>

      <main>
        <div className={styles.rightSide}>
          <div className={styles.Header}>
            <div className={styles.titleBar}></div>
            {/* here........................................................ */}
            <div className={styles.Theme}>
              <div className={styles.themeSwitchContainer}>
                <label className={styles.themeSlider} htmlFor="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={darkMode}
                    onChange={switchTheme}
                  />
                  <div className={`${styles.round} ${styles.slider}`}></div>
                </label>
              </div>
            </div>

            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>User & Garage info</button>
              <div className={styles.dropdownContent}>
                <div>
                  <strong>User name:</strong> {userName}
                </div>

                <div onClick={handleLogoutBtn}>
                  <img src={Logout} alt="logout icon" />
                  <strong>
                    <span>Logout</span>
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.Content}>
            {showAddPage && <AddUser onClose={handleCloseAddBtn} />}
            {showAddGaragePage && <AddGarage onClose={handleCloseAddGarage} />}
            <Outlet /> {/* This will render child routes like Employees */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TheOne;

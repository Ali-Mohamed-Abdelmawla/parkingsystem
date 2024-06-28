import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Styles/styles.module.css";
import Whitelogo from "./assets/light-mode/White-logo.svg";
import Dashboardicon from "./assets/light-mode/Dashboard.svg";
import Empoloyeeicon from "./assets/light-mode/Employee-icon.svg";
import Complaintsicon from "./assets/light-mode/complaints-icon.svg";
import Activesessions from "./assets/light-mode/Active-sesions-icon.svg";
import Salaries from "./assets/light-mode/Salaries.svg";
import Logout from "./assets/light-mode/log-out.svg";
import Add from "./assets/light-mode/Add-employee-icon.svg";
import AddReporIcont from "./assets/light-mode/Add-Report.svg";

//pop-ups
import AddEmployee from "./AddEmployee-component/AddEmployee";
import AddReport from "./AddReport-component/AddReport";
import Hourprice from "./Edit-hourPrice/EditHourPrice";

//Routes
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../auth/axios";

function TheOne() {
  const navigate = useNavigate();

  const [showAddPage, setShowAddPage] = useState(false);
  const [showAddReportPage, setShowAddReportPage] = useState(false);
  const [showHourPriceEdit, setShowHourPriceEdit] = useState(false);
  const [userName, setUserName] = useState(null);
  const [garageData, setGarageData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserName(decodedToken.FullName);

      axiosInstance
        .get("/api/GarageAdmin/GetGarageData", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          setGarageData(response.data);
        });
    }
  }, []);

  // Initialize dark mode state from session storage
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

  // Update session storage and document attribute whenever dark mode changes
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

  const handleAddComplaintsClick = () => {
    setShowAddReportPage(true);
    document.body.classList.add(styles.addModalActive);
  };

  const handleCloseComplaintsBtn = () => {
    setShowAddReportPage(false);
    document.body.classList.remove(styles.addModalActive);
  };

  const handleEditHourPriceClick = () => {
    setShowHourPriceEdit(true);
    document.body.classList.add(styles.addModalActive);
  };

  const handleCLoseEditHourPrice = () => {
    setShowHourPriceEdit(false);
    document.body.classList.remove(styles.addModalActive);
  };

  const handleDashboardClick = () => {
    navigate("/SystemAdmin");
  };

  const handleEmployeesClick = () => {
    navigate("/SystemAdmin/Employees");
  };

  const handleComplaintsClick = () => {
    navigate("/SystemAdmin/Complaints");
  };

  const handleActiveSessionsClick = () => {
    navigate("/SystemAdmin/ActiveSessions");
  };

  const handleSalariesClick = () => {
    navigate("/SystemAdmin/Salaries");
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
            <img src={Dashboardicon} alt="Dashboard icon" />
            <b>Dashboard</b>
          </button>
          <button onClick={handleEmployeesClick} id="Employeebtn">
            <img src={Empoloyeeicon} alt="employee icon" />
            <b>Employees</b>
          </button>
          <button onClick={handleComplaintsClick} id="Complaintsbtn">
            <img src={Complaintsicon} alt="complaints icon" />
            <b>Complaints</b>
          </button>
          <button onClick={handleActiveSessionsClick}>
            <img src={Activesessions} alt="activeSessions icon" />
            <b>Active sessions</b>
          </button>
          <button onClick={handleSalariesClick}>
            <img src={Salaries} alt="Salaries icon" />
            <b>Salaries</b>
          </button>

          <button onClick={handleAddBtn}>
            <img src={Add} alt="add icon" />
            <b>Add Employee</b>
          </button>

          <button id="AddComplaintsbtn" onClick={handleAddComplaintsClick}>
            <img src={AddReporIcont} alt="complaints icon" />
            <b>Add Report</b>
          </button>
        </div>
      </aside>

      <main>
        <div className={styles.rightSide}>
          <div className={styles.Header}>
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
                <div> <strong>User name:</strong> {userName}</div>
                <div>
                  {" "}
                  <strong>Garage:</strong>
                  {garageData?.garageName}
                </div>
                <div>
                  <strong>Pricing:</strong>
                  {garageData?.HourPrice}$
                  per hour
                </div>
                <div onClick={handleEditHourPriceClick}>
                  <strong>Edit Hour price for the Garage</strong>
                </div>
                <div onClick={handleLogoutBtn}>
                  <img src={Logout} alt="logout icon" />
                  <strong><span>Logout</span></strong>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.Content}>
            {showAddPage && <AddEmployee onClose={handleCloseAddBtn} />}
            {showAddReportPage && (
              <AddReport onClose={handleCloseComplaintsBtn} />
            )}
            {showHourPriceEdit && (
              <Hourprice onClose={handleCLoseEditHourPrice} />
            )}
            <Outlet /> {/* This will render child routes like Employees */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TheOne;

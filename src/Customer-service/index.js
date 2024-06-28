import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "../System-admin/Styles/styles.module.css";
import Whitelogo from "./assets/White-logo.svg";
import Complaintsicon from "./assets/complaints-icon.svg";
import Logout from "./assets/log-out.svg";
import {jwtDecode} from "jwt-decode";

export default function Layout() {
  const [userName, setUserName] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserName(decodedToken.FullName);
    }
  }, [token]);

  useEffect(() => {
    const currentTurn = sessionStorage.getItem("currentTurn");
    if (!currentTurn) {
      sessionStorage.setItem("currentTurn", 1);
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

  const handleComplaintsClick = () => {
    navigate("/CustomerService");
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
    token && (
      <div className={styles.container}>
        <aside>
          <div className={styles.toggle}>
            <div className={styles.logo}>
              <img src={Whitelogo} alt={"logo"} />
              <h2>Rakna</h2>
            </div>
          </div>

          <div className={styles.sidebar}>
            <button id="Complaintsbtn" onClick={handleComplaintsClick}>
              <img src={Complaintsicon} alt="complaints icon" />
              <b>Complaints</b>
            </button>
          </div>
        </aside>

        <main>
          <div className={styles.rightSide}>
            <div className={styles.Header}>
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
          </div>
          <Outlet />
        </main>
      </div>
    )
  );
}

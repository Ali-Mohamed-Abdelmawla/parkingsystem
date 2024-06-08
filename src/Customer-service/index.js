import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../System-admin/Styles/styles.module.css";

// import AddReport from "./AddReport-component/AddReport";
import { useState, useEffect } from "react";
import Whitelogo from "./assets/White-logo.svg";
import Complaintsicon from "./assets/complaints-icon.svg";
import Logout from "./assets/log-out.svg";
import search from "./assets/Search.svg";
// import AddReporIcont from "./assets/Add-Report.svg";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
export default function Layout() {
  const showComplaintsComponent = useState(true);
  // const [showAddPage, setShowAddPage] = useState(false);
  const[userName, setUserName] = useState(null)
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");



  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserName(decodedToken.FullName);
    }
  }, [token]);


     const handleComplaintsClick = () => {
      navigate("/CustomerService")
     }

     const handleLogoutBtn = () => {
      sessionStorage.removeItem("accessToken");
      document.documentElement.setAttribute("theme", "light");
      navigate("/");
      // بنمسح التوكن بس و نريدايركت اليوزر لصفحه اللوجن
    };

  const switchTheme = (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
    }
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



          <button onClick={handleLogoutBtn}>
            <img src={Logout} alt="logout icon" />
            <h3>Logout</h3>
          </button>
        </div>
      </aside>

      <main>
        <div className={styles.rightSide}>
          <div className={styles.Header}>
            <div className={styles.searchBar}>
              <input type="text" placeholder="search" />
              <img src={search} alt="icon"></img>
            </div>
            <div className={styles.Theme}>
              <div className={styles.themeSwitchContainer}>
                <label className={styles.themeSlider} htmlFor="checkbox">
                  <input type="checkbox" id="checkbox" onChange={switchTheme} />
                  <div className={`${styles.round} ${styles.slider}`}></div>
                </label>
              </div>
            </div>

            <p className={styles.Welcome}>
              <small>Welcome, </small>
              <h3> {userName} </h3>
            </p>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
    )

  );
}
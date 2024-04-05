import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/styles.module.css";
import { useState, useEffect } from "react";
import Whitelogo from "./assets/White-logo.svg";
import Complaintsicon from "./assets/complaints-icon.svg";
import Logout from "./assets/log-out.svg";
import search from "./assets/Search.svg";
import { useNavigate } from "react-router-dom";
export default function Layout() {
  const showComplaintsComponent = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const Complaintsbtn = document.getElementById("Complaintsbtn");
    if (showComplaintsComponent) {
      Complaintsbtn.classList.add(styles.sidebarButtonIsActive);
    }
    return () => {
      // Save to local storage logic here
    };
  }, []);

  //  const handleComplaintsClick = () => {
  //     const Complaintsbtn = document.getElementById("Complaintsbtn");
  //     if(showComplaintsComponent){
  //     Complaintsbtn.classList.add(styles.sidebarButtonIsActive);
  //     }
  //  };

     const handleComplaintsClick = () => {
      navigate("/complaints")
     }

  const switchTheme = (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
    }
  };
  return (
    //  const [showComplaintsComponent, setShowComplaintsComponent] = useState(true);

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

          <button>
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
              <h3> Ali </h3>
            </p>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

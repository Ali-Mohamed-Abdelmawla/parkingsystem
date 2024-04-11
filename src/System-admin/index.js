import  { useEffect, useState } from "react";
import styles from "./Styles/styles.module.css"

// importing icons
import Whitelogo from "./assets/light-mode/White-logo.svg";
import Dashboardicon from "./assets/light-mode/Dashboard.svg";
import Empoloyeeicon from "./assets/light-mode/Employee-icon.svg";
import Complaintsicon from "./assets/light-mode/complaints-icon.svg";
import Logout from "./assets/light-mode/log-out.svg";
import Add from "./assets/light-mode/Add-employee-icon.svg";
import search from "./assets/light-mode/Search.svg";

import AddEmployee from "./AddEmployee-component/AddEmployee";
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';



function TheOne() {
const navigate = useNavigate();


  const [showAddPage, setShowAddPage] = useState(false);
  // const [addedEmployee, setAddedEmployee] = useState({
  //   employeeName: "",
  //   phoneNumber: "",
  //   Garage_id: "",
  //   Role: "",
  //   Employee_id: "",
  //   National_id: "",
  //   Salary: "",
  // });


  const handleAddBtn = () => {
    setShowAddPage(true);
    document.body.classList.add(styles.addModalActive);
  };

  const handleCloseAddBtn = () => {
    setShowAddPage(false);
    document.body.classList.remove(styles.addModalActive);
  };

  const handleDashboardClick = () => {
    navigate("SystemAdmin/Dashboard")

  };

  const handleEmployeesClick = () => {
    navigate("SystemAdmin/Employees")

  };


  const handleComplaintsClick = () => {
    navigate("SystemAdmin/Complaints")

  };

  const handleLogoutBtn = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/")
    // بنمسح التوكن بس و نريدايركت اليوزر لصفحه اللوجن
  }

  const switchTheme = (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
    }
  };


  return (
    <div className={styles.container}>
      <aside>
        <div className={styles.toggle}>
          <div className={styles.logo}>
            <img src={Whitelogo} alt="logo" />
            <h2>Rakna</h2>
          </div>
          {/* <div className="close" id="close-btn">
              <span className="material-icons-sharp">
                close
              </span>
            </div> */}
          {/* close icon is to be used for responsive design */}
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
          <button onClick={handleAddBtn}>
            <img src={Add} alt="add icon" />
            <b>Add Employee</b>
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
              <img src={search} alt="icon" />
            </div>
            <div className={styles.Theme}>
              <div className={styles.themeSwitchContainer}>
                <label className={styles.themeSlider} htmlFor="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={switchTheme}
                  />
                  <div className={`${styles.round} ${styles.slider}`}></div>
                </label>
              </div>
            </div>

            <p className={styles.Welcome}>
              <small>Welcome, </small>
              <h3> Ali </h3>
            </p>
          </div>
          <div className={styles.Content}>

            {showAddPage && <AddEmployee onClose={handleCloseAddBtn} />}
            <Outlet /> {/* This will render child routes like Employees */}

          </div>
        </div>
      </main>
    </div>
  );
}

export default TheOne;
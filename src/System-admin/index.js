import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import styles from "./styles.module.css";

// importing icons
import Whitelogo from "./assets/light-mode/White-logo.svg";
import Darkicon from "./assets/light-mode/darkmode-icon.svg";
import Dashboardicon from "./assets/light-mode/Dashboard.svg";
import Empoloyeeicon from "./assets/light-mode/Employee-icon.svg";
import Complaintsicon from "./assets/light-mode/complaints-icon.svg";
import Logout from "./assets/light-mode/log-out.svg";
// import Person from './assets/light-mode/Person.svg';
import Add from "./assets/light-mode/Add-employee-icon.svg";
import search from "./assets/light-mode/Search.svg";
// import Darklogo from './assets/Black-logo.svg';
import Dashboard from "./Dashboard";
import Employees from "./Employees";
import Complaints from "./Complaint";
import AddEmployee from "./AddEmployee";

class TheOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDashboardComponent: true,
      showEmployeesComponent: false,
      showComplaintsComponent: false,
      showAddPage: false,
      Employees: [
        {
          employeeName: "Ali",
          phoneNumber: "0100438493",
          Garage_id: "225039",
          Role: "Staff",
          Employee_id: 34667,
          National_id: 95637706799,
          Salary: 6000,
        },
        {
          employeeName: "Mohamed",
          phoneNumber: "0107896818",
          Garage_id: "328840",
          Role: "Customer Service",
          Employee_id: 51447,
          National_id: 15120367989,
          Salary: 1500,
        },
        {
          employeeName: "Eslam",
          phoneNumber: "0118262347",
          Garage_id: "462269",
          Role: "System Admin",
          Employee_id: 54495,
          National_id: 54405702510,
          Salary: 3000,
        },
      ],
      addedEmployee: {
        employeeName: "",
        phoneNumber: "",
        Garage_id: "",
        Role: "",
        Employee_id: "",
        National_id: "",
        Salary: "",
      },
    };
  }

  componentWillUnmount() {
    this.saveToLocalStorage();
  }

  handleAddBtn = () => {
    this.setState({
      showAddPage: true,
    });

    document.body.classList.add(styles.addModalActive);
  };

  handleCloseAddBtn = () => {
    this.setState({
      showAddPage: false,
    });

    document.body.classList.remove(styles.addModalActive);
  };

  handleDashboardClick = () => {
    // Handle dashboard button click
    const Dashboardbtn = document.getElementById("Dashboardbtn");
    const Employeebtn = document.getElementById("Employeebtn");
    const Complaintsbtn = document.getElementById("Complaintsbtn");

    Dashboardbtn.classList.add(styles.sidebarButtonIsActive);
    Employeebtn.classList.remove(styles.sidebarButtonIsActive);
    Complaintsbtn.classList.remove(styles.sidebarButtonIsActive);

    this.setState({
      showDashboardComponent: true,
      showEmployeesComponent: false,
      showComplaintsComponent: false,
    });
  };

  handleEmployeesClick = () => {
    // Handle employees button click
    const Dashboardbtn = document.getElementById("Dashboardbtn");
    const Employeebtn = document.getElementById("Employeebtn");
    const Complaintsbtn = document.getElementById("Complaintsbtn");

    Dashboardbtn.classList.remove(styles.sidebarButtonIsActive);
    Employeebtn.classList.add(styles.sidebarButtonIsActive);
    Complaintsbtn.classList.remove(styles.sidebarButtonIsActive);

    this.setState({
      showDashboardComponent: false,
      showEmployeesComponent: true,
      showComplaintsComponent: false,
    });
  };

  handleComplaintsClick = () => {
    // Handle employees button click
    const Dashboardbtn = document.getElementById("Dashboardbtn");
    const Employeebtn = document.getElementById("Employeebtn");
    const Complaintsbtn = document.getElementById("Complaintsbtn");

    Dashboardbtn.classList.remove(styles.sidebarButtonIsActive);
    Employeebtn.classList.remove(styles.sidebarButtonIsActive);
    Complaintsbtn.classList.add(styles.sidebarButtonIsActive);

    this.setState({
      showDashboardComponent: false,
      showEmployeesComponent: false,
      showComplaintsComponent: true,
    });
  };


  /* Function to change theme */
  switchTheme = (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
    }
  };

  render() {
    const {
      showDashboardComponent,
      showEmployeesComponent,
      showComplaintsComponent,
      showAddPage,
      addedEmployee,
    } = this.state;

    return (
      <React.StrictMode>
        <div className={styles.container}>
          <aside>
            <div class={styles.toggle}>
              <div class={styles.logo}>
                <img src={Whitelogo} alt={"logo"} />
                <h2>Rakna</h2>
              </div>
              {/* <div class="close" id = "close-btn">
        <span class="material-icons-sharp">
          close
          </span>
        </div>   close icon is to be used for responsive design  */}
            </div>

            <div class={styles.sidebar}>
              <button onClick={this.handleDashboardClick} id="Dashboardbtn">
                <img src={Dashboardicon} alt="Dashboard icon" />
                <b>Dashboard</b>
              </button>
              <button onClick={this.handleEmployeesClick} id="Employeebtn">
                <img src={Empoloyeeicon} alt="employee icon" />
                <b>Employees</b>
              </button>
              <button onClick={this.handleComplaintsClick} id="Complaintsbtn">
                <img src={Complaintsicon} alt="complaints icon" />
                <b>Complaints</b>
              </button>
              <button onClick={this.handleAddBtn}>
                <img src={Add} alt="add icon" />
                <b>Add Employee</b>
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
                  <div class={styles.themeSwitchContainer}>
                    <label class={styles.themeSlider} for="checkbox">
                      <input
                        type="checkbox"
                        id="checkbox"
                        onChange={this.switchTheme}
                      />
                      <div className={`${styles.round} ${styles.slider}`}></div>
                    </label>
                  </div>
                  {/* <img src={Darkicon} alt="dark icon"></img>
                  <span>Darkmode</span> */}
                </div>

                <p className={styles.Welcome}>
                  <small>Welcome, </small>
                  <h3> Ali </h3>
                </p>
              </div>
              <div className={styles.Content}>
                {showDashboardComponent && <Dashboard />}
                {showEmployeesComponent && <Employees />}
                {showComplaintsComponent && <Complaints />}
                {showAddPage && <AddEmployee onClose={this.handleCloseAddBtn}  />}
              </div>
            </div>
          </main>
        </div>
      </React.StrictMode>
    );
  }
}

export default TheOne;

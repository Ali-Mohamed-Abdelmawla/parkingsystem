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
import Close from "./assets/light-mode/Close-icon.svg";
// import Person from './assets/light-mode/Person.svg';
import Add from "./assets/light-mode/Add-employee-icon.svg";
import search from "./assets/light-mode/Search.svg";
// import Darklogo from './assets/Black-logo.svg';
import Dashboard from "./Dashboard";
import Employees from "./Employees";
import Complaints from "./Complaint";

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

    document.body.classList.add("add-modal-active");
  };

  handleCloseAddBtn = () => {
    this.setState({
      showAddPage: false,
    });

    document.body.classList.remove("add-modal-active");
  };

  handleDashboardClick = () => {
    // Handle dashboard button click
    const Dashboardbtn = document.getElementById("Dashboardbtn");
    const Employeebtn = document.getElementById("Employeebtn");
    const Complaintsbtn = document.getElementById("Complaintsbtn");

    Dashboardbtn.classList.add("btn-inMainpage-is-active");
    Employeebtn.classList.remove("btn-inMainpage-is-active");
    Complaintsbtn.classList.remove("btn-inMainpage-is-active");

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

    Dashboardbtn.classList.remove("btn-inMainpage-is-active");
    Employeebtn.classList.add("btn-inMainpage-is-active");
    Complaintsbtn.classList.remove("btn-inMainpage-is-active");

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

    Dashboardbtn.classList.remove("btn-inMainpage-is-active");
    Employeebtn.classList.remove("btn-inMainpage-is-active");
    Complaintsbtn.classList.add("btn-inMainpage-is-active");

    this.setState({
      showDashboardComponent: false,
      showEmployeesComponent: false,
      showComplaintsComponent: true,
    });
  };

  // Past Edit

  // handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   const { addedEmployee } = this.state;

  //   // input validation
  //   if (!addedEmployee.employeeName || !addedEmployee.phoneNumber || !addedEmployee.Garage_id || !addedEmployee.Role || !addedEmployee.Employee_id || !addedEmployee.National_id || !addedEmployee.Salary) {
  //     alert("Please fill in all fields before saving.");
  //     return;
  //   }

  //   // Update the Employees array with the edited employee
  //   const { editIndex } = this.state;
  //   const updatedEmployees = [...this.state.Employees];
  //   updatedEmployees[editIndex] = editedEmployee;

  //   this.setState({
  //     showEditPage: false,
  //     editIndex: null,
  //     Employees: updatedEmployees,
  //   }, () => {
  //     // Save to localStorage after state update
  //     this.saveToLocalStorage();
  //   });

  //   // Remove the class when the modal is closed
  //   document.body.classList.remove("Edit-modal-active");
  // };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      addedEmployee: {
        ...prevState.editedEmployee,
        [name]: value,
      },
    }));
  };
  handleFormSubmit = (e) => {
    e.preventDefault();

    const { addedEmployee } = this.state;

    // Input validation
    if (
      !addedEmployee.employeeName ||
      !addedEmployee.phoneNumber ||
      !addedEmployee.Garage_id ||
      !addedEmployee.Role ||
      !addedEmployee.Employee_id ||
      !addedEmployee.National_id ||
      !addedEmployee.Salary
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }

    // Add the new employee to the Employees array
    const updatedEmployees = [...this.state.Employees, addedEmployee];

    this.setState(
      {
        showEditPage: false,
        editIndex: null,
        Employees: updatedEmployees,
        addedEmployee: {
          // Reset addedEmployee for the next entry
          employeeName: "",
          phoneNumber: "",
          Garage_id: "",
          Role: "",
          Employee_id: "",
          National_id: "",
          Salary: "",
        },
      },
      () => {
        // Save to localStorage after state update
        this.componentWillUnmount();
      }
    );

    // Remove the class when the modal is closed
    document.body.classList.remove("add-modal-active");
  };

  saveToLocalStorage = () => {
    const { Employees } = this.state;

    // Convert the Employees array to a JSON string and store it in local storage
    localStorage.setItem("employees", JSON.stringify(Employees));
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
                <h3>Dashboard</h3>
              </button>
              <button onClick={this.handleEmployeesClick} id="Employeebtn">
                <img src={Empoloyeeicon} alt="employee icon" />
                <h3>Employees</h3>
              </button>
              <button onClick={this.handleComplaintsClick} id="Complaintsbtn">
                <img src={Complaintsicon} alt="complaints icon" />
                <h3>Complaints</h3>
              </button>
              <button onClick={this.handleAddBtn}>
                <img src={Add} alt="add icon" />
                <h3>Add Employee</h3>
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
                {showAddPage && (
                  <div className={styles.addModal}>
                    <div className={styles.addTitle}>
                      <button onClick={this.handleCloseAddBtn}>
                        <img src={Close} alt="Close" />
                      </button>
                    </div>
                    <form onSubmit={this.handleFormSubmit}>
                      <label>
                        <b>{addedEmployee.employeeName}</b>
                      </label>
                      <input
                        type="text"
                        name="employeeName"
                        placeholder="Name"
                        value={addedEmployee.employeeName}
                        onChange={this.handleInputChange}
                      />

                      <input
                        required
                        type="text"
                        min="0"
                        id="number"
                        name="phoneNumber"
                        placeholder="phoneNumber"
                        maxLength={11}
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Remove non-numeric characters
                        }}
                      />
                      <input
                        required
                        type="text"
                        min="0"
                        id="number"
                        name="Garage_id"
                        placeholder="Garage_id"
                        maxLength={6}
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Remove non-numeric characters
                        }}
                      />

                      <select
                        name="Role"
                        value={addedEmployee.Role}
                        onChange={this.handleInputChange}
                      >
                        <option value="Systemadmin">System-admin</option>
                        <option value="Customerservice">
                          Customer-service
                        </option>
                        <option value="Technicalsupport">
                          Technical-support
                        </option>
                        <option value="Staff">Staff</option>
                      </select>

                      <input
                        required
                        type="text"
                        min="0"
                        id="number"
                        name="National_id"
                        placeholder="National_id"
                        maxLength={14}
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Remove non-numeric characters
                        }}
                      />

                      <input
                        required
                        type="text"
                        min="0"
                        id="number"
                        name="Salary"
                        placeholder="Salary"
                        maxLength={11}
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Remove non-numeric characters
                        }}
                      />

                      <div className={styles.addModelButtons}>
                        <button type="submit">Add</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </React.StrictMode>
    );
  }
}

export default TheOne;

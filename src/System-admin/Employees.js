import React from "react";
import Employeestyle from "./Employees.module.css";
import ExpandIcon from "./assets/light-mode/Details-icon.svg";
import WarningIcon from "./assets/light-mode/Delete-icon.svg";
import viewComponentIcon from "./assets/light-mode/View-component-icon(1).svg";
import Close from "./assets/light-mode/Close-icon.svg";

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedRow: -1,
      showDeleteConfirmation: false,
      deletionIndex: null,
      showEditPage: false,
      editIndex: null,
      showViewDetails: false,
      viewIndex: null,
      editedEmployee: {
        employeeName: "",
        phoneNumber: "",
        Garage_id: "",
        Role: "",
        Employee_id: "",
        National_id: "",
        Salary: "",
      },
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
    };
  }

  componentDidMount() {
    // Save employees to localStorage on component mount
    this.saveToLocalStorage();
  }

  saveToLocalStorage = () => {
    const { Employees } = this.state;
    localStorage.setItem("employees", JSON.stringify(Employees));
  };

  toggleDropdown = (index) => {
    this.setState((prevState) => ({
      expandedRow: prevState.expandedRow === index ? -1 : index,
    }));
  };

  handleEditClick = (index) => {
    this.setState({
      showEditPage: true,
      editIndex: index,
      editedEmployee: { ...this.state.Employees[index] },
    });

    // Add the class to the body when the modal is active
    document.body.classList.add(Employeestyle.EditModalActive);
  };

  handlecloseEditClick = () => {
    this.setState({
      showEditPage: false,
    });

    // Add the class to the body when the modal is active
    document.body.classList.remove(Employeestyle.EditModalActive);
  }

  handleDeleteClick = (index) => {
    this.setState({
      showDeleteConfirmation: true,
      deletionIndex: index,
    });

    // Add the class to the body when the modal is active
    document.body.classList.add(Employeestyle.deleteModalActive);
  };

  handleCancelDelete = () => {
    this.setState({
      showDeleteConfirmation: false,
      deletionIndex: null,
    });

    // Remove the class when the modal is closed
    document.body.classList.remove(Employeestyle.deleteModalActive);
  };

  handleConfirmDelete = () => {
    const { deletionIndex } = this.state;

    // Perform the delete action (e.g., call an API, update state)
    const updatedEmployees = [...this.state.Employees];
    updatedEmployees.splice(deletionIndex, 1);

    this.setState(
      {
        showDeleteConfirmation: false,
        deletionIndex: null,
        Employees: updatedEmployees,
      },
      () => {
        // Save to localStorage after state update
        this.saveToLocalStorage();
      }
    );

    // Remove the class when the modal is closed
    document.body.classList.remove(Employeestyle.deleteModalActive);
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      editedEmployee: {
        ...prevState.editedEmployee,
        [name]: value,
      },
    }));
  };

  // handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform input validation here before updating the state

  //   // Update the Employees array with the edited employee
  //   const { editIndex, editedEmployee } = this.state;
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

  //   document.body.classList.remove(Employeestyle.EditModalActive);
  // };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { editedEmployee } = this.state;

    // input validation
    if (
      !editedEmployee.employeeName ||
      !editedEmployee.phoneNumber ||
      !editedEmployee.Garage_id ||
      !editedEmployee.Role ||
      !editedEmployee.Employee_id ||
      !editedEmployee.National_id ||
      !editedEmployee.Salary
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }

    // Update the Employees array with the edited employee
    const { editIndex } = this.state;
    const updatedEmployees = [...this.state.Employees];
    updatedEmployees[editIndex] = editedEmployee;

    this.setState(
      {
        showEditPage: false,
        editIndex: null,
        Employees: updatedEmployees,
      },
      () => {
        // Save to localStorage after state update
        this.saveToLocalStorage();
      }
    );

    // Remove the class when the modal is closed
    document.body.classList.remove(Employeestyle.EditModalActive);
  };

  handleViewClick = (index) => {
    this.setState({
      showViewDetails: true,
      viewIndex: index,
    });

    // Add the class to the body when the modal is active
    document.body.classList.add(Employeestyle.viewModalActive);
  };

  handleCloseView = () => {
    this.setState({
      showViewDetails: false,
      viewIndex: null,
    });

    // Remove the class when the modal is closed
    document.body.classList.remove(Employeestyle.viewModalActive);
  };

  render() {
    const {
      expandedRow,
      showDeleteConfirmation,
      showEditPage,
      showViewDetails,
      editedEmployee,
      viewIndex,
    } = this.state;

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Garage_id</th>
              <th>Role</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            {this.state.Employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.employeeName}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.Garage_id}</td>
                <td>{employee.Role}</td>
                <td>
                  <div
                    className={Employeestyle.employeeDetails}
                    onClick={() => this.toggleDropdown(index)}
                  >
                    <img
                      src={ExpandIcon}
                      alt="Details"
                      className={Employeestyle.expandIcon}
                    />
                    {index === expandedRow && (
                      <div className={Employeestyle.dropdownMenu}>
                        <button
                          className={Employeestyle.dropdownButton}
                          onClick={() => this.handleViewClick(index)}
                        >
                          View
                        </button>
                        <hr></hr>
                        <button
                          className={Employeestyle.dropdownButton}
                          onClick={() => this.handleEditClick(index)}
                        >
                          Edit
                        </button>
                        <hr></hr>
                        <button
                          className={Employeestyle.dropdownButton}
                          onClick={() => this.handleDeleteClick(index)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showDeleteConfirmation && (
          <div className={Employeestyle.deleteConfirmation}>
            <div className={Employeestyle.deleteTitle}></div>
            <div className={Employeestyle.deleteContent}>
              <img src={WarningIcon} alt="warning-icon" />
              <p>Are you sure to delete this employee?</p>
              <button onClick={this.handleConfirmDelete}>Confirm</button>
              <button onClick={this.handleCancelDelete}>No</button>
            </div>
          </div>
        )}

        {showEditPage && (
          <div className={Employeestyle.editModal}>
            <div className={Employeestyle.editTitle}>
              <button onClick={this.handlecloseEditClick}>
                <img src={Close} alt="Close" />
              </button>
            </div>
            <form onSubmit={this.handleFormSubmit}>
              <label>
                Edit &nbsp; <b>{editedEmployee.employeeName}</b>
              </label>
              <input
                type="text"
                name="employeeName"
                placeholder="Name"
                value={editedEmployee.employeeName}
                onChange={this.handleInputChange}
              />
              <input
                required
                type="text"
                min="0"
                id="number"
                name="phoneNumber"
                placeholder="phoneNumber"
                defaultValue={editedEmployee.phoneNumber}
                maxLength={11}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                }}
              />

              <input
                required
                type="text"
                min="0"
                id="number"
                name="Garage_id"
                placeholder="Garage_id"
                defaultValue={editedEmployee.Garage_id}
                maxLength={6}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                }}
              />

              <select
                name="Role"
                value={editedEmployee.Role}
                onChange={this.handleInputChange}
              >
                <option value="Systemadmin">System-admin</option>
                <option value="Customerservice">Customer-service</option>
                <option value="Technicalsupport">Technical-support</option>
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
                defaultValue={editedEmployee.National_id}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                }}
              />

              <input
                required
                type="text"
                min="0"
                id="number"
                name="Salary"
                defaultValue={editedEmployee.Salary}
                placeholder="Salary"
                maxLength={11}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                }}
              />

              <div className={Employeestyle.editModelButtons}>
                <button type="submit">Edit</button>
              </div>
            </form>
          </div>
        )}

        {showViewDetails && (
          <div className={Employeestyle.viewModal}>
            <div className={Employeestyle.viewTitle}></div>
            <div className={Employeestyle.modalContent}>
              <div className={Employeestyle.modalMain}>
                <img src={viewComponentIcon} alt="ICON" />
                <div className={Employeestyle.name}>
                  <label>
                    <b>Name:</b> {this.state.Employees[viewIndex].employeeName}
                  </label>
                  <label>
                    <b>Phone Number:</b>{" "}
                    {this.state.Employees[viewIndex].phoneNumber}
                  </label>
                </div>
              </div>
              <hr></hr>
              <div className={Employeestyle.modalDetails}>
                <label>
                  <b>Garage_id:</b> {this.state.Employees[viewIndex].Garage_id}
                </label>
                <label>
                  <b>Role:</b> {this.state.Employees[viewIndex].Role}
                </label>
                <label>
                  <b>Employee_id:</b>{" "}
                  {this.state.Employees[viewIndex].Employee_id}
                </label>
                <label>
                  <b>National_id:</b>{" "}
                  {this.state.Employees[viewIndex].National_id}
                </label>
                <label>
                  <b>Salary:</b> {this.state.Employees[viewIndex].Salary}
                </label>
                <button onClick={this.handleCloseView}>Close</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Employees;

import React, { Component } from "react";
import styles from "./Users.module.css";
import ViewLight from "../assets/LightMode/view.svg";
import ViewDark from "../assets/DarkMode/view-dark.svg";
import CloseLight from "../assets/LightMode/false.svg";
import CloseDark from "../assets/DarkMode/false-dark.svg";

class Employees extends Component {
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
                Name: "",
                NationalId: '',
                Email: "",
                role: "",
                phoneNumber: "",
                garageId: "",
            },
            Employees: [
                {
                    Name: "Ahmed Mahmoud Ali",
                    NationalId: '12345678901234',
                    Email: "ahmed.mahmoud@example.com",
                    role: "customerservices",
                    phoneNumber: "01123456789",
                    garageId: "90"
                },
                {
                    Name: "Sara Abdullah Mohamed",
                    NationalId: '98765432109876',
                    Email: "sara.abdullah@example.com",
                    role: "customerservices",
                    phoneNumber: "01098765432",
                    garageId: "88"
                },
                {
                    Name: "Mohamed Khaled Ahmed",
                    NationalId: '56789012345678',
                    Email: "mohamed.khaled@example.com",
                    role: "garageadmin",
                    phoneNumber: "01234567890",
                    garageId: "35",
                },
                {
                    Name: "Fatma Ali Hassan",
                    NationalId: '34567890123456',
                    Email: "fatma.ali@example.com",
                    role: "customerservices",
                    phoneNumber: "01567890123",
                    garageId: "76"
                },
                {
                    Name: "Ali Ahmed Hassan",
                    NationalId: '01234567890123',
                    Email: "ali.ahmed@example.com",
                    role: "garageadmin",
                    phoneNumber: "01876543210",
                    garageId: "37"
                }

            ]
        };
    }

    saveToLocalStorage = () => {
        const { Employees } = this.state;
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

        document.body.classList.add("Edit-modal-active");
    };

    handleCloseEditClick = () => {
        this.setState({
            showEditPage: false,
        });

        document.body.classList.remove("Edit-modal-active");
    };

    handleDeleteClick = (index) => {
        this.setState({
            showDeleteConfirmation: true,
            deletionIndex: index,
        });

        document.body.classList.add("delete-modal-active");
    };

    handleCancelDelete = () => {
        this.setState({
            showDeleteConfirmation: false,
            deletionIndex: null,
        });

        document.body.classList.remove("delete-modal-active");
    };

    handleConfirmDelete = () => {
        const { deletionIndex } = this.state;

        const updatedEmployees = [...this.state.Employees];
        updatedEmployees.splice(deletionIndex, 1);

        this.setState(
            {
                showDeleteConfirmation: false,
                deletionIndex: null,
                Employees: updatedEmployees,
            },
            () => {
                this.saveToLocalStorage();
            }
        );

        document.body.classList.remove("delete-modal-active");
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

    handleFormSubmit = (e) => {
        e.preventDefault();

        const { editedEmployee } = this.state;

        if (
            !editedEmployee.Name ||
            !editedEmployee.Email ||
            !editedEmployee.NationalId ||
            !editedEmployee.role ||
            !editedEmployee.phoneNumber ||
            !editedEmployee.garageId
        ) {
            alert("Please fill in all fields before saving.");
            return;
        }

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
                this.saveToLocalStorage();
            }
        );

        document.body.classList.remove("Edit-modal-active");
    };

    handleViewClick = (index) => {
        this.setState({
            showViewDetails: true,
            viewIndex: index,
        });

        document.body.classList.add("view-modal-active");
    };

    handleCloseView = () => {
        this.setState({
            showViewDetails: false,
            viewIndex: null,
        });

        document.body.classList.remove("view-modal-active");
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

        const darkModeClass = this.props.darkmode ? styles["dark-mode"] : "";

        return (
            <div className={`${styles["component-body"]} ${darkModeClass}`}>
                <div className={styles["toggle-dark-mode"]} onClick={this.props.handleDarkModeToggle}>
                    {this.props.darkmode ? "Light Mode" : "Dark Mode"}
                </div>
                <table className={`${styles["table-content"]} ${darkModeClass}`}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>National ID</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Phone Number</th>
                            <th>Garage ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.Name}</td>
                                <td>{employee.NationalId}</td>
                                <td>{employee.Email}</td>
                                <td>{employee.role}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.garageId}</td>
                                <td>
                                    <div
                                        className={`${styles["details-dropdown"]} ${darkModeClass}`}
                                        onClick={() => this.toggleDropdown(index)}
                                    >
                                        <img src={this.props.darkmode ? ViewDark : ViewLight} alt="Details" className={styles["expand-icon"]} />
                                        {index === expandedRow && (
                                            <div className={styles["dropdown-menu"]}>
                                                <button className={styles["dropdown-button"]} onClick={() => this.handleViewClick(index)}>
                                                    View
                                                </button>
                                                <hr />
                                                <button className={styles["dropdown-button"]} onClick={() => this.handleEditClick(index)}>
                                                    Edit
                                                </button>
                                                <hr />
                                                <button className={styles["dropdown-button"]} onClick={() => this.handleDeleteClick(index)}>
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
                    <div className={`${styles["delete-confirmation"]} ${darkModeClass}`}>
                        <div className={`${styles["border"]} ${darkModeClass}`}></div>
                        <div className={`${styles["delete-content"]} ${darkModeClass}`}>
                            <p>Are you sure to delete this User?</p>
                            <button className={styles["button1"]} onClick={this.handleConfirmDelete}>
                                Confirm
                            </button>
                            <button className={styles["button2"]} onClick={this.handleCancelDelete}>
                                No
                            </button>
                        </div>
                    </div>
                )}
                {showEditPage && (
                    <div className={`${styles["edit-modal"]} ${darkModeClass}`}>
                        <div className={`${styles["add-title"]} ${darkModeClass}`}>
                            <button className={`${styles["but"]} ${darkModeClass}`} onClick={this.handleCloseEditClick}>
                                <img src={this.props.darkmode ? CloseDark : CloseLight} alt="close" className={styles["icon-close"]} />
                            </button>
                        </div>
                        <form onSubmit={this.handleFormSubmit}>
                            <label>Edit User &nbsp;</label>
                            <div className="form-content">
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Name"
                                    value={editedEmployee.Name}
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="NationalId"
                                    placeholder="National ID"
                                    value={editedEmployee.NationalId}
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="email"
                                    name="Email"
                                    placeholder="Email"
                                    value={editedEmployee.Email}
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Role"
                                    value={editedEmployee.role}
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    value={editedEmployee.phoneNumber}
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="garageId"
                                    placeholder="Garage ID"
                                    value={editedEmployee.garageId}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className={`${styles["edit-model-buttons"]} ${darkModeClass}`}>
                                <button type="submit">Edit</button>
                            </div>
                        </form>
                    </div>
                )}

                {showViewDetails && (
                    <div className={`${styles["view-modal"]} ${darkModeClass}`}>
                        <div className={`${styles["view-title"]} ${darkModeClass}`}></div>
                        <div className={`${styles["modal-content"]} ${darkModeClass}`}>
                            <div className={`${styles["modal-main"]} ${darkModeClass}`}>
                                <div className={`${styles["name"]} ${darkModeClass}`}>
                                    <label>
                                        <b>Name:</b> {this.state.Employees[viewIndex].Name}
                                    </label>
                                    <label>
                                        <b>National ID:</b> {this.state.Employees[viewIndex].NationalId}
                                    </label>
                                </div>
                            </div>
                            <div className={`${styles["modal-details"]} ${darkModeClass}`}>
                                <label>
                                    <b>Email:</b> {this.state.Employees[viewIndex].Email}
                                </label>
                                <label>
                                    <b>Role:</b> {this.state.Employees[viewIndex].role}
                                </label>
                                <label>
                                    <b>Phone Number:</b> {this.state.Employees[viewIndex].phoneNumber}
                                </label>
                                <label>
                                    <b>Garage ID:</b> {this.state.Employees[viewIndex].garageId}
                                </label>
                                <div className={`${styles["view-close-buttons"]} ${darkModeClass}`}>
                                    <button onClick={this.handleCloseView}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Employees;

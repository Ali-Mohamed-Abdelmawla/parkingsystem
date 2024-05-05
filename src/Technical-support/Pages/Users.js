import React, { Component } from "react";
import styles from "./Users.module.css";
import CloseLight from "../assets/LightMode/false.svg";
import CloseDark from "../assets/DarkMode/false-dark.svg";
import DataGrid from "../../System-admin/Styled-Table/CustomDataGrid";

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
            initialEmployees: [
                {
                    id: 1,
                    Name: "Ahmed Mahmoud Ali",
                    NationalId: '12345678901234',
                    Email: "ahmed.mahmoud@example.com",
                    role: "customerservices",
                    phoneNumber: "01123456789",
                    garageId: "90"
                },
                {
                    id: 2,
                    Name: "Sara Abdullah Mohamed",
                    NationalId: '98765432109876',
                    Email: "sara.abdullah@example.com",
                    role: "customerservices",
                    phoneNumber: "01098765432",
                    garageId: "88"
                },
                {
                    id: 3,
                    Name: "Mohamed Khaled Ahmed",
                    NationalId: '56789012345678',
                    Email: "mohamed.khaled@example.com",
                    role: "garageadmin",
                    phoneNumber: "01234567890",
                    garageId: "35",
                },
                {
                    id: 4,
                    Name: "Fatma Ali Hassan",
                    NationalId: '34567890123456',
                    Email: "fatma.ali@example.com",
                    role: "customerservices",
                    phoneNumber: "01567890123",
                    garageId: "76"
                },
                {
                    id: 5,
                    Name: "Ali Ahmed Hassan",
                    NationalId: '01234567890123',
                    Email: "ali.ahmed@example.com",
                    role: "garageadmin",
                    phoneNumber: "01876543210",
                    garageId: "37"
                },
                {
                    id: 6,
                    Name: "Amany Fawzy Azam",
                    NationalId: '01234567890333',
                    Email: "amanyf070@gmail.com",
                    role: "garageadmin",
                    phoneNumber: "01283196470",
                    garageId: "44"
                }
            ],
            Employees: [],
        };
    }

    componentDidMount() {
        this.setState({
            Employees: this.state.initialEmployees
        });
    }

    saveToLocalStorage = () => {
        // Implement save to local storage logic
    };

    toggleDropdown = (index) => {
        this.setState((prevState) => ({
            expandedRow: prevState.expandedRow === index ? -1 : index,
        }));
    };

    handleEditClick = (id) => {
        const index = this.state.Employees.findIndex(employee => employee.id === id);
        if (index !== -1) {
            this.setState({
                showEditPage: true,
                editIndex: index,
                editedEmployee: { ...this.state.Employees[index] },
            });
            document.body.classList.add("Edit-modal-active");
        } else {
            console.error("Row not found with id:", id);
        }
    };
    

    handleCloseEditClick = () => {
        this.setState({
            showEditPage: false,
        });

        document.body.classList.remove("Edit-modal-active");
    };

    handleDeleteClick = (id) => {
        const index = this.state.Employees.findIndex(employee => employee.id === id);
        if (index !== -1) {
            this.setState({
                showDeleteConfirmation: true,
                deletionIndex: index,
            });
            document.body.classList.add("delete-modal-active");
        } else {
            console.error("Row not found with id:", id);
        }
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

    handleViewClick = (id) => {
        const index = this.state.Employees.findIndex(employee => employee.id === id);
        if (index !== -1) {
            this.setState({
                showViewDetails: true,
                viewIndex: index,
            });
            document.body.classList.add("view-modal-active");
        } else {
            console.error("Row not found with id:", id);
        }
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
            showDeleteConfirmation,
            showEditPage,
            showViewDetails,
            editedEmployee,
            viewIndex,
        } = this.state;

        const darkModeClass = this.props.darkmode ? styles["dark-mode"] : "";
        const columns = [
            { field: "Name", headerName: "Name", flex: 1 },
            { field: "NationalId", headerName: "National ID", flex: 1 },
            { field: "Email", headerName: "Email", flex: 1 },
            { field: "role", headerName: "Role", flex: 1 },
            { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
            { field: "garageId", headerName: "Garage ID", flex: .6 },
            {
                field: "actions",
                headerName: "Settings",
                flex: 1.1,
                renderCell: (params) => (
                    <>
                        <button className={'tableBtn'} onClick={() => this.handleViewClick(params.row.id)}>View</button>
                        <hr />
                        <button className={'tableBtn'} onClick={() => this.handleEditClick(params.row.id)}>Edit</button>
                        <hr />
                        <button className={'tableBtn'} onClick={() => this.handleDeleteClick(params.row.id)}>Delete</button>
                    </>
                ),
            },
        ];

        return (
            <div className={`${styles["component-body"]} ${darkModeClass}`}>
                <div className={styles["toggle-dark-mode"]} onClick={this.props.handleDarkModeToggle}>
                    {this.props.darkmode ? "Light Mode" : "Dark Mode"}
                </div>
                <DataGrid
                    rows={this.state.Employees} // Fixed variable name
                    columns={columns}
                    getRowId={(row) => row.id}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 8, 13]}
                />
                {showViewDetails && (
                    <div className={`${styles["view-modal"]} ${darkModeClass}`}>
                        <div className={`${styles["view-title"]} ${darkModeClass}`}></div>
                        <div className={`${styles["modal-content"]} ${darkModeClass}`}>
                            <div className={`${styles["modal-main"]} ${darkModeClass}`}>
                                <div className={`${styles["info"]} ${darkModeClass}`}>
                                    <label>
                                        <b>Name:</b> {this.state.Employees[viewIndex].Name}
                                    </label>
                                    
                                    <label>
                                        <b>National ID:</b> {this.state.Employees[viewIndex].NationalId}
                                    </label>

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
                    </div>
                )}

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
            </div>
        );
    }
}

export default Employees;

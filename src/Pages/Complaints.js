import React from "react";
import axios from "axios";
import styles from "./Complaints.module.css";
import View from "../assets/LightMode/view.svg";

class Complaints extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedRow: -1,
            showDeleteConfirmation: false,
            deletionIndex: null,
            showViewDetails: false,
            viewIndex: null,
            Complaint: [],
            isDarkMode: false,
        };
    }

    componentDidMount() {
        this.fetchComplaints();
        this.saveToLocalStorage();
    }

    saveToLocalStorage = () => {
        const { Complaint } = this.state;
        localStorage.setItem("Complaint", JSON.stringify(Complaint));
    };

    toggleDropdown = (index) => {
        this.setState((prevState) => ({
            expandedRow: prevState.expandedRow === index ? -1 : index,
        }));
    };

    handleDeleteClick = (index) => {
        this.setState({
            showDeleteConfirmation: true,
            deletionIndex: index,
        });
    };

    handleCloseDelete = () => {
        this.setState({
            showDeleteConfirmation: false,
            deletionIndex: null,
        });
    };

    handleConfirmDelete = () => {
        const { deletionIndex, Complaint } = this.state;
        const updatedComplaint = [...Complaint];
        updatedComplaint.splice(deletionIndex, 1);

        this.setState(
            {
                showDeleteConfirmation: false,
                deletionIndex: null,
                Complaint: updatedComplaint,
            },
            () => {
                this.saveToLocalStorage();
            }
        );
    };

    handleViewClick = (index) => {
        this.setState({
            showViewDetails: true,
            viewIndex: index,
        });
    };

    handleCloseView = () => {
        this.setState({
            showViewDetails: false,
            viewIndex: null,
        });
    };

    // Function to toggle dark mode
    toggleDarkMode = () => {
        this.setState((prevState) => ({
            isDarkMode: !prevState.isDarkMode,
        }));
    };
    fetchComplaints = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get("https://raknaapi.azurewebsites.net/TechnicalSupport/GetAllReports", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const complaints = response.data; 
            this.setState({ Complaint: complaints });
        } catch (error) {
            console.error("Error fetching complaints:", error);
        }
    };
    
    render() {
        const {
            expandedRow,
            showDeleteConfirmation,
            showViewDetails,
            Complaint,
            viewIndex,
            isDarkMode, // Added isDarkMode state
        } = this.state;

        const darkModeClass = isDarkMode ? styles["dark-mode"] : ''; // Added dark mode class condition

        return (
            <>
                <div className={styles["component-body"]}>
                    <div className={styles["toggle-dark-mode"]} onClick={this.toggleDarkMode}>
                        {/* Icon for toggling dark mode */}
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </div>
                    <table className={`${styles["complaints-table"]} ${darkModeClass}`}>
                        <thead>
                            <tr>
                                <th>Complainant</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Complain Number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Complaint.map((complaint, index) => (
                                <tr key={index}>
                                    <td>{complaint.Complainant}</td>
                                    <td>{complaint.Email}</td>
                                    <td>{complaint.PhoneNumber}</td>
                                    <td>{complaint.ComplainNumber}</td>
                                    <td>
                                        <div
                                            className={`${styles["employee-details"]} ${darkModeClass}`}
                                            onClick={() => this.toggleDropdown(index)}
                                        >
                                            <img
                                                src={View}
                                                alt="Details"
                                                className={styles["expand-icon"]}
                                            />
                                            {index === expandedRow && (
                                                <div className={styles["dropdown-menu"]}>
                                                    <button
                                                        className={styles["dropdown-button"]}
                                                        onClick={() => this.handleViewClick(index)}
                                                    >
                                                        View
                                                    </button>
                                                    <hr />
                                                    <button
                                                        className={styles["dropdown-button"]}
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
                    <div className={`${styles["delete-confirmation"]} ${darkModeClass}`}>
                        <div className={`${styles["delete-border"]} ${darkModeClass}`}></div>
                        <div className={`${styles["delete-content"]} ${darkModeClass}`}>
                            <p>Are you sure to delete this Complaint?</p>
                            <button className={styles["button1"]} onClick={this.handleConfirmDelete}>Confirm</button>
                            <button onClick={this.handleCloseDelete}>No</button>
                        </div>
                    </div>
                )}

                    {showViewDetails && (
                        <div className={`${styles["view-modal"]} ${darkModeClass}`}>
                            <div className={`${styles["view-title"]} ${darkModeClass}`}></div>
                            <div className={`${styles["modal-content"]} ${darkModeClass}`}>
                                <div className={`${styles["modal-main"]} ${darkModeClass}`}>
                                    <div className={`${styles["name"]} ${darkModeClass}`}>
                                        <label>
                                            <b>Complaint Number:</b>{" "}
                                            {Complaint[viewIndex].ComplainNumber}
                                        </label>
                                    </div>
                                </div>

                                <div className={`${styles["modal-details"]} ${darkModeClass}`}>
                                    <b>
                                        {" "}
                                        I have encountered difficulties finding an available parking
                                        space despite the system indicating availability. This not
                                        only wastes my time but also adds unnecessary stress to my
                                        daily routine.{" "}
                                    </b>
                                    <button className={`${styles["view-model-buttons"]} ${darkModeClass}`} onClick={this.handleCloseView}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
            </>
        );
    }
}

export default Complaints;

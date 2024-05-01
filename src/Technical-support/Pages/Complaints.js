import React from "react";
import axios from "axios";
import styles from "./Complaints.module.css";
import ViewLight from "../assets/LightMode/view.svg";
import ViewDark from "../assets/DarkMode/view-dark.svg";

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

    handleViewClick = (index, reportMessage) => {
        this.setState({
            showViewDetails: true,
            viewIndex: index,
            viewReportMessage: index,
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
            const accessToken = sessionStorage.getItem('accessToken');
            const response = await axios.get("https://raknaapi.azurewebsites.net/api/Report/GetReportsBasedOnRole", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const complaints = response.data; 
            sessionStorage.setItem("totalReports", response.data.length);//مؤقتا بس عاملها علشان و انا بصور قدام الدكتور دي بترجع عدد الريبورتس علشان اعرضو في الداش بورد
            this.setState({ Complaint: complaints });
        } catch (error) {
            console.error("Error fetching complaints:", error);
        }
    };
    
    
    updateReportStatus = async () => {
        const { deletionIndex, Complaint } = this.state;
        console.log(Complaint[deletionIndex].reportId)
        const accessToken = sessionStorage.getItem("accessToken");
        // const updateStatus = {
        //     reportId: Complaint[deletionIndex].reportId,
        // };
        const reportId = Complaint[deletionIndex].ReportId
        try {
            const response = await axios.put(
                `https://raknaapi.azurewebsites.net/api/Report/UpdateReportStatus/${reportId}`,
                true,
                {
                    params:{
                        reportId: reportId
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Updated complaint:", response.data.reportId);
            const updatedComplaints = [...Complaint];
            updatedComplaints[deletionIndex] = response.data;
            this.setState(
                {
                    showDeleteConfirmation: false,
                    deletionIndex: null,
                    Complaint: updatedComplaints,
                },
                () => {
                    this.saveToLocalStorage();
                }
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    
    render() {
        const {
            expandedRow,
            showDeleteConfirmation,
            showViewDetails,
            Complaint,
            viewIndex,
            viewReportMessage,
            isDarkMode, // Added isDarkMode state
        } = this.state;
        
        const darkModeClass = this.props.darkmode ? styles["dark-mode"] : "";
        
        return (
            <div className={`${styles["component-body"]} ${darkModeClass}`}>
                <div className={styles["toggle-dark-mode"]} onClick={this.toggleDarkMode}>
                    {/* Icon for toggling dark mode */}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </div>
                <table className={`${styles["complaint-table"]} ${darkModeClass}`}>
                    <thead>
                        <tr>
                            <th>Report Id</th>
                            <th>Report Type</th>
                            <th>Report Message</th>
                            <th>Reporter Id</th>
                            <th>Reporter Name</th>
                            <th>Report status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Complaint.map((complaint, index) => (
                            <tr key={index}>
                                <td>{complaint.ReportId}</td>
                                <td>{complaint.ReportType}</td>
                                <td>{complaint.ReportMessage}</td>
                                <td>{complaint.ReporterId}</td>
                                <td>{complaint.ReporterName}</td>
                                <td>{complaint.IsFixed ? "Fixed" : "Not Fixed"}</td>
                                <td>
                                    <div className={`${styles["details-dropdown"]} ${darkModeClass}`} onClick={() => this.toggleDropdown(index)} >
                                    <img src={this.props.darkmode ? ViewDark : ViewLight} alt="Details" className={styles["expand-icon"]} />
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
                        <div className={`${styles["border"]} ${darkModeClass}`}></div>
                        <div className={`${styles["delete-content"]} ${darkModeClass}`}>
                            <p>Are you sure to delete this Complaint?</p>
                            <button className={styles["button1"]} onClick={this.updateReportStatus}>Confirm</button>
                            <button className={styles["button2"]} onClick={this.handleCloseDelete}>No</button>
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
                                        <b>Complaint ID:</b>{""}
                                        {Complaint[viewIndex].ReportId}
                                    </label>
                                </div>
                            </div>

                            <div className={`${styles["modal-details"]} ${darkModeClass}`}>
                                <b>
                                    {" "}
                                    {Complaint[viewReportMessage].ReportMessage}
                                </b>
                                
                                <button className={`${styles["view-close-buttons"]} ${darkModeClass}`} onClick={this.handleCloseView}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Complaints;

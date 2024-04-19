import React, { Component } from "react";
import axios from 'axios'; 
import styles from "./Users.module.css";
import ViewLight from "../assets/LightMode/view.svg";
import ViewDark from "../assets/DarkMode/view-dark.svg";
import CloseLight from "../assets/LightMode/false.svg";
import CloseDark from "../assets/DarkMode/false-dark.svg";

class Garage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedRow: -1,
            showDeleteConfirmation: false,
            deletionIndex: null,
            showEditPage: false,
            editIndex: null,
            editedGarages: {
                garageId: "",
                garageName:"",
                hourPrice: "",
                street: "",
                city: "",
                availableSpaces: "",
                totalSpaces: ""
            },
            Garages: [],
            isDarkMode: false,
        };
    }

    componentDidMount() {
        this.fetchData();
        this.saveToLocalStorage();
    }

    fetchData = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const response = await axios.get("https://raknaapi.azurewebsites.net/TechnicalSupport/GetAllGarages",{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            this.setState({ Garages: response.data });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
            editedGarages: { ...this.state.Garages[index] },
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

    handleConfirmDelete = async () => {
        const { deletionIndex, Garages } = this.state;
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };
            const params = {
                id: Garages[deletionIndex].garageId,
            };
            const response = await axios.delete(`https://raknaapi.azurewebsites.net/TechnicalSupport/DeleteGarage`, {
                headers,
                params,
            });
            console.log('Deleted garage:', response.data);
            const updatedGarages = [...Garages];
            updatedGarages.splice(deletionIndex, 1);
            this.setState(
            {
                showDeleteConfirmation: false,
                deletionIndex: null,
                Garages: updatedGarages,
            },
            () => {
                document.body.classList.remove("delete-modal-active");
                this.saveToLocalStorage();
            }
            );
        } catch (error) {
            console.error('Error deleting garage:', error);
        }
        document.body.classList.remove("delete-modal-active");
    };
    

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            editedGarages: {
                ...prevState.editedGarages,
                [name]: value,
            },
        }));
    };

    

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const accessToken = sessionStorage.getItem("accessToken");
        const { editedGarages, editIndex, Garages } = this.state;
        try {
                const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            };
            const response = await axios.put(`https://raknaapi.azurewebsites.net/TechnicalSupport/UpdateGarage`,
            editedGarages,
            {
                params: {
                    id: editedGarages.garageId,
                }, 
                headers
            }
        );
        console.log("Updated garage:", response.data.garageId);
            const updatedGarages = [...Garages];
            updatedGarages[editIndex] = editedGarages;
            this.setState(
            {
                showEditPage: false,
                editIndex: null,
                Garages: updatedGarages,
            },
            () => {
            this.saveToLocalStorage();
            }
        );
        } catch (error) {
        console.error("Error updating garage:", error);
        }
        document.body.classList.remove("Edit-modal-active");
    };


    saveToLocalStorage = () => {
        const { Garages } = this.state;
        localStorage.setItem("Garages", JSON.stringify(Garages));
    };

    toggleDarkMode = () => {
        this.setState((prevState) => ({
            isDarkMode: !prevState.isDarkMode,
        }));
    };


    render() {
        const { expandedRow, showDeleteConfirmation, showEditPage, editedGarages, isDarkMode, Garages } = this.state;
        const darkModeClass = this.props.darkmode ? styles["dark-mode"] : "";
        return (
            <>
                <div className={`${styles["component-body"]} ${darkModeClass}`}>
                <div className={styles["toggle-dark-mode"]} onClick={this.props.handleDarkModeToggle}>
                    {this.props.darkmode ? "Light Mode" : "Dark Mode"}
                </div>
                    <table className={`${styles["table-content"]} ${darkModeClass}`}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Garage Name</th>
                                <th>Hour Price</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>Available Spaces</th>
                                <th>Total Spaces</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Garages.map((garage, index) => (
                                <tr key={index}>
                                    <td>{garage.garageId}</td>
                                    <td>{garage.garageName}</td>
                                    <td>{garage.hourPrice}</td>
                                    <td>{garage.street}</td>
                                    <td>{garage.city}</td>
                                    <td>{garage.availableSpaces}</td>
                                    <td>{garage.totalSpaces}</td>
                                    <td>
                                        <div className={`${styles["details-dropdown"]} ${darkModeClass}`} onClick={() => this.toggleDropdown(index)}>
                                        <img src={this.props.darkmode ? ViewDark : ViewLight} alt="Details" className={styles["expand-icon"]} />
                                            {index === expandedRow && (
                                                <div className={styles["dropdown-menu"]}>
                                                    <button className={`${styles["dropdown-button"]} ${darkModeClass}`} onClick={() => this.handleEditClick(index)}>Edit</button>
                                                    <hr />
                                                    <button className={`${styles["dropdown-button"]} ${darkModeClass}`} onClick={() => this.handleDeleteClick(index)}>Delete</button>
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
                                <p>Are you sure to delete this Garage?</p>
                                <button className={`${styles["button1"]} ${darkModeClass}`} onClick={this.handleConfirmDelete}>Confirm</button>
                                <button className={`${styles["button2"]} ${darkModeClass}`} onClick={this.handleCancelDelete}>No</button>
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
                                <label>Edit Garage &nbsp;</label>
                                <input
                                    type="text"
                                    name="garageName"
                                    placeholder="Garage Name"
                                    value={editedGarages.garageName}
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="number"
                                    name="hourPrice"
                                    placeholder="Hour Price"
                                    value={editedGarages.hourPrice}
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="street"
                                    placeholder="Street"
                                    value={editedGarages.street}
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={editedGarages.city}
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="number"
                                    name="availableSpaces"
                                    placeholder="Available Spaces"
                                    value={editedGarages.availableSpaces}
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="number"
                                    name="totalSpaces"
                                    placeholder="Total Spaces"
                                    value={editedGarages.totalSpaces}
                                    onChange={this.handleInputChange}
                                />
                                <div className={`${styles["edit-model-buttons"]} ${darkModeClass}`}>
                                    <button type="submit">Edit</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default Garage;

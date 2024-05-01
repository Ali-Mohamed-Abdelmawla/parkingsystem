import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import styles from "./Users.module.css";
import ViewLight from "../assets/LightMode/view.svg";
import ViewDark from "../assets/DarkMode/view-dark.svg";
import CloseLight from "../assets/LightMode/false.svg";
import CloseDark from "../assets/DarkMode/false-dark.svg";

const Garage = ({ darkmode, handleDarkModeToggle }) => {
    const [expandedRow, setExpandedRow] = useState(-1);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deletionIndex, setDeletionIndex] = useState(null);
    const [showEditPage, setShowEditPage] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editedGarages, setEditedGarages] = useState({
        GarageId: "",
        GarageName: "",
        HourPrice: "",
        street: "",
        city: "",
        AvailableSpaces: "",
        longitude: "",
        latitude: "",
        TotalSpaces: ""
    });
    const [Garages, setGarages] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        fetchData();
        saveToLocalStorage();
    }, []);

    const fetchData = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const response = await axios.get("https://raknaapi.azurewebsites.net/TechnicalSupport/GetAllGarages", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setGarages(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const toggleDropdown = (index) => {
        setExpandedRow(prevExpandedRow => prevExpandedRow === index ? -1 : index);
    };

    const handleEditClick = (index) => {
        setShowEditPage(true);
        setEditIndex(index);
        setEditedGarages({ ...Garages[index] });
        document.body.classList.add("Edit-modal-active");
    };

    const handleCloseEditClick = () => {
        setShowEditPage(false);
        document.body.classList.remove("Edit-modal-active");
    };

    const handleDeleteClick = (index) => {
        setShowDeleteConfirmation(true);
        setDeletionIndex(index);
        document.body.classList.add("delete-modal-active");
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setDeletionIndex(null);
        document.body.classList.remove("delete-modal-active");
    };

    const handleConfirmDelete = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };
            const params = {
                id: Garages[deletionIndex].GarageId,
            };
            await axios.delete(`https://raknaapi.azurewebsites.net/TechnicalSupport/DeleteGarage`, {
                headers,
                params,
            });
            const updatedGarages = [...Garages];
            updatedGarages.splice(deletionIndex, 1);
            setGarages(updatedGarages);
            setShowDeleteConfirmation(false);
            setDeletionIndex(null);
            document.body.classList.remove("delete-modal-active");
            saveToLocalStorage();
        } catch (error) {
            console.error('Error deleting garage:', error);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedGarages(prevEditedGarages => ({
            ...prevEditedGarages,
            [name]: value,
        }));
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFormSubmit = async () => {
        const accessToken = sessionStorage.getItem("accessToken");
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            };
            await axios.put(`https://raknaapi.azurewebsites.net/TechnicalSupport/UpdateGarage`,
                editedGarages,
                {
                    params: {
                        id: editedGarages.GarageId,
                    },
                    headers
                }
            );
            const updatedGarages = [...Garages];
            updatedGarages[editIndex] = editedGarages;
            setGarages(updatedGarages);
            setShowEditPage(false);
            setEditIndex(null);
            saveToLocalStorage();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Garage updated successfully!',
            });
        } catch (error) {
            console.error("Error updating garage:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while updating the garage. Please try again later.',
            });
        }
        document.body.classList.remove("Edit-modal-active");
    };

    const saveToLocalStorage = () => {
        localStorage.setItem("Garages", JSON.stringify(Garages));
    };

    const darkModeClass = darkmode ? styles["dark-mode"] : "";

    return (
        <>
            <div className={`${styles["component-body"]} ${darkModeClass}`}>
                <div className={styles["toggle-dark-mode"]} onClick={handleDarkModeToggle}>
                    {darkmode ? "Light Mode" : "Dark Mode"}
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
                            <th>Longitude</th>
                            <th>Latitude</th>
                            <th>Total Spaces</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Garages.map((garage, index) => (
                            <tr key={index}>
                                <td>{garage.GarageId}</td>
                                <td>{garage.GarageName}</td>
                                <td>{garage.HourPrice}</td>
                                <td>{garage.street}</td>
                                <td>{garage.city}</td>
                                <td>{garage.AvailableSpaces}</td>
                                <td>{garage.longitude}</td>
                                <td>{garage.latitude}</td>
                                <td>{garage.TotalSpaces}</td>
                                <td>
                                    <div className={`${styles["details-dropdown"]} ${darkModeClass}`} onClick={() => toggleDropdown(index)}>
                                        <img src={darkmode ? ViewDark : ViewLight} alt="Details" className={styles["expand-icon"]} />
                                        {index === expandedRow && (
                                            <div className={styles["dropdown-menu"]}>
                                                <button className={`${styles["dropdown-button"]} ${darkModeClass}`} onClick={() => handleEditClick(index)}>Edit</button>
                                                <hr />
                                                <button className={`${styles["dropdown-button"]} ${darkModeClass}`} onClick={() => handleDeleteClick(index)}>Delete</button>
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
                            <button className={`${styles["button1"]} ${darkModeClass}`} onClick={handleConfirmDelete}>Confirm</button>
                            <button className={`${styles["button2"]} ${darkModeClass}`} onClick={handleCancelDelete}>No</button>
                        </div>
                    </div>
                )}
                {showEditPage && (
                    <div className={`${styles["edit-modal"]} ${darkModeClass}`}>
                        <div className={`${styles["add-title"]} ${darkModeClass}`}>
                            <button className={`${styles["but"]} ${darkModeClass}`} onClick={handleCloseEditClick}>
                                <img src={darkmode ? CloseDark : CloseLight} alt="close" className={styles["icon-close"]} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <label>Edit Garage &nbsp;</label>
                            <input
                                type="text"
                                name="GarageName"
                                placeholder="Garage Name"
                                defaultValue={editedGarages.GarageName}
                                onChange={handleInputChange}
                                {...register("GarageName", { required: true })}
                            />
                            {errors.GarageName && <span className="error">Garage Name is required</span>}

                            <input
                                type="number"
                                name="HourPrice"
                                placeholder="Hour Price"
                                defaultValue={editedGarages.HourPrice}
                                onChange={handleInputChange}
                                {...register("HourPrice", { required: true })}
                            />
                            {errors.HourPrice && <span className="error">Hour Price is required</span>}

                            <input
                                type="text"
                                name="street"
                                placeholder="Street"
                                defaultValue={editedGarages.street}
                                onChange={handleInputChange}
                                {...register("street", { required: true })}
                            />
                            {errors.street && <span className="error">Street is required</span>}

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                defaultValue={editedGarages.city}
                                onChange={handleInputChange}
                                {...register("city", { required: true })}
                            />
                            {errors.city && <span className="error">City is required</span>}

                            <input
                                type="text"
                                name="longitude"
                                placeholder="Longitude"
                                defaultValue={editedGarages.longitude}
                                onChange={handleInputChange}
                                {...register("longitude", { required: true, pattern: /^-?\d*(\.\d+)?$/ })}
                            />
                            {errors.longitude && errors.longitude.type === "required" && <span className="error">Longitude is required</span>}
                            {errors.longitude && errors.longitude.type === "pattern" && <span className="error">Please enter a valid Longitude</span>}

                            <input
                                type="text"
                                name="latitude"
                                placeholder="Latitude"
                                defaultValue={editedGarages.latitude}
                                onChange={handleInputChange}
                                {...register("latitude", { required: true, pattern: /^-?\d*(\.\d+)?$/ })}
                            />
                            {errors.latitude && errors.latitude.type === "required" && <span className="error">Latitude is required</span>}
                            {errors.latitude && errors.latitude.type === "pattern" && <span className="error">Please enter a valid Latitude</span>}

                            <input
                                type="number"
                                name="TotalSpaces"
                                placeholder="Total Spaces"
                                defaultValue={editedGarages.TotalSpaces}
                                onChange={handleInputChange}
                                {...register("TotalSpaces", { required: true })}
                            />
                            {errors.TotalSpaces && <span className="error">Total Spaces is required</span>}

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

export default Garage;

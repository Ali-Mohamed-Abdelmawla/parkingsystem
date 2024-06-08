import React, { useState, useEffect } from "react";
import axios from 'axios'; 

import Swal from 'sweetalert2';
import styles from "./Users.module.css";
import CloseLight from "../assets/LightMode/false.svg";
import CloseDark from "../assets/DarkMode/false-dark.svg";
import DataGrid from "../../System-admin/Styled-Table/CustomDataGrid";
import { useForm } from "react-hook-form";

const Garage = ({ darkmode, handleDarkModeToggle }) => {

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deletionIndex, setDeletionIndex] = useState(null);
    const [showEditPage, setShowEditPage] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showViewDetails, setShowViewDetails] = useState(false);
    const [viewIndex, setViewIndex] = useState(null);
    const [editedGarage, setEditedGarages] = useState({
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const response = await axiosInstance.get("/TechnicalSupport/GetAllGarages", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // Add unique id to each garage object
            const garagesWithIds = response.data.map((garage, index) => ({ ...garage, id: index }));
            setGarages(garagesWithIds);
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire("Error", `Failed to fetch garages: ${error.message}`, "error");
        }
    };
    const handleViewClick = (id) => {
        const rowIndex = Garages.findIndex(Garages => Garages.id === id);
        setShowViewDetails(true);
        setViewIndex(rowIndex);
    };
    const handleCloseViewDetails = () => {
        setShowViewDetails(false);
        setViewIndex(null);
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
            await axiosInstance.delete(`/TechnicalSupport/DeleteGarage`, {
                headers,
                params,
            });
            const updatedGarages = [...Garages];
            updatedGarages.splice(deletionIndex, 1);
            setGarages(updatedGarages);
            setShowDeleteConfirmation(false);
            setDeletionIndex(null);
            document.body.classList.remove("delete-modal-active");
            Swal.fire("Success", "Garage deleted successfully", "success");
        } catch (error) {
            console.error('Error deleting garage:', error);
            Swal.fire("Error", `Failed to delete garage: ${error.message}`, "error");
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
            await axios.put(
                `https://raknaapi.azurewebsites.net/TechnicalSupport/UpdateGarage`,
                editedGarage,

                {
                    params: {
                        id: editedGarage.GarageId,
                    },
                    headers,
                }
            );
            const updatedGarages = [...Garages];
            updatedGarages[editIndex] = editedGarage;
            setGarages(updatedGarages); // Update the Garages state
            setEditedGarages({ ...editedGarage }); // Update the editedGarage state
            setShowEditPage(false);
            setEditIndex(null);
            saveToLocalStorage();
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Garage updated successfully!",
            });
        } catch (error) {
            console.error("Error updating garage:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred while updating the garage. Please try again later.",
            });
        }
        document.body.classList.remove("Edit-modal-active");
    };
    

    const saveToLocalStorage = () => {
        localStorage.setItem("Garages", JSON.stringify(Garages));
    };


    const darkModeClass = darkmode ? styles["dark-mode"] : "";
    const columns = [
        { field: "GarageId", headerName: "Garage ID", flex:1},
        { field: "GarageName", headerName: "Garage Name", flex: 1 },
        { field: "HourPrice", headerName: "Hour Price", flex: 1 },
        { field: "street", headerName: "Street", flex: 1 },
        { field: "city", headerName: "City", flex: 1 },
        { field: "AvailableSpaces", headerName: "Available Spaces", flex: 1 },
        { field: "longitude", headerName: "Longitude", flex: 1 },
        { field: "latitude", headerName: "Latitude", flex: 1},
        { field: "TotalSpaces", headerName: "Total Spaces", flex: 1 },
        {
            field: "settings",
            headerName: "Settings",
            flex: 1.8,
            renderCell: (params) => (
                <>  
                    <button className={'tableBtn'} onClick={() =>handleViewClick(params.row.id)}>View</button>
                    <hr />
                    <button className={'tableBtn'} onClick={() => handleEditClick(params.row.id)}>Edit</button>
                    <hr />
                    <button className={'tableBtn'} onClick={() => handleDeleteClick(params.row.id)}>Delete</button>
                </>
            ),
        },
    ];

    return (
        <>
            <div className={`${styles["component-body"]} ${darkModeClass}`}>
                <div className={styles["toggle-dark-mode"]} onClick={handleDarkModeToggle}>
                    {darkmode ? "Light Mode" : "Dark Mode"}
                </div>
                <DataGrid
                    rows={Garages}
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
                <div className={`${styles["view-Content"]} ${darkModeClass}`}>
                    <div className={`${styles["view-title"]} ${darkModeClass}`}></div>
                    <div className={`${styles["modal-content"]} ${darkModeClass}`}>
                        <div className={`${styles["modal-main"]} ${darkModeClass}`}>
                            <div className={`${styles["info"]} ${darkModeClass}`}>
                                <label><b>GarageId:</b> {Garages[viewIndex]?.GarageId}</label>
                                <label><b>GarageName:</b> {Garages[viewIndex]?.GarageName}</label>
                                <label><b>Hour Price:</b> {Garages[viewIndex]?.HourPrice}</label>
                                <label><b>Street:</b> {Garages[viewIndex]?.street}</label>
                                <label><b>City:</b> {Garages[viewIndex]?.city}</label>
                                <label><b>Available Spaces:</b> {Garages[viewIndex]?.AvailableSpaces}</label>
                                <label><b>Longitude:</b> {Garages[viewIndex]?.longitude}</label>
                                <label><b>Latitude:</b> {Garages[viewIndex]?.latitude}</label>
                                <label><b>Total Spaces:</b> {Garages[viewIndex]?.TotalSpaces}</label>
                                <div className={`${styles["modal-details"]} ${darkModeClass}`}>
                                    <button className={`${styles["view-close-buttons"]} ${darkModeClass}`} onClick={handleCloseViewDetails}>Close</button>
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
                                defaultValue={editedGarage.GarageName}
                                onChange={handleInputChange}
                                {...register("GarageName", { required: true })}
                            />
                            {errors.GarageName && <span className="error">Garage Name is required</span>}
                            <input
                                type="number"
                                name="HourPrice"
                                placeholder="Hour Price"
                                defaultValue={editedGarage.HourPrice}
                                onChange={handleInputChange}
                                {...register("HourPrice", { required: true })}
                            />
                            {errors.HourPrice && <span className="error">Hour Price is required</span>}
                            <input
                                type="text"
                                name="street"
                                placeholder="Street"
                                defaultValue={editedGarage.street}
                                onChange={handleInputChange}
                                {...register("street", { required: true })}
                            />
                            {errors.street && <span className="error">Street is required</span>}

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                defaultValue={editedGarage.city}
                                onChange={handleInputChange}
                                {...register("city", { required: true })}
                            />
                            {errors.city && <span className="error">City is required</span>}

                            <input
                                type="text"
                                name="longitude"
                                placeholder="Longitude"
                                defaultValue={editedGarage.longitude}
                                onChange={handleInputChange}
                                {...register("longitude", { required: true, pattern: /^-?\d*(\.\d+)?$/ })}
                            />
                            {errors.longitude && errors.longitude.type === "required" && <span className="error">Longitude is required</span>}
                            {errors.longitude && errors.longitude.type === "pattern" && <span className="error">Please enter a valid Longitude</span>}

                            <input
                                type="text"
                                name="latitude"
                                placeholder="Latitude"
                                defaultValue={editedGarage.latitude}
                                onChange={handleInputChange}
                                {...register("latitude", { required: true, pattern: /^-?\d*(\.\d+)?$/ })}
                            />
                            {errors.latitude && errors.latitude.type === "required" && <span className="error">Latitude is required</span>}
                            {errors.latitude && errors.latitude.type === "pattern" && <span className="error">Please enter a valid Latitude</span>}

                            <input
                                type="number"
                                name="TotalSpaces"
                                placeholder="Total Spaces"
                                defaultValue={editedGarage.TotalSpaces}
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

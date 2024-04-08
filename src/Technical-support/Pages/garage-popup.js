import React, { useState } from 'react';
import axios from 'axios';
import closeLight from '../assets/LightMode/false.svg';
import closeDark from '../assets/DarkMode/false-dark.svg';
import styles from './garage-popup.module.css';

const GaragePopup = ({ onClose, darkmode }) => {
    const [garageData, setGarageData] = useState([]);
    const [formData, setFormData] = useState({
        garageName: '',
        hourPrice: '',
        street: '',
        city: '',
        spaces: '',
        longitude: '',
        latitude: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newGarage = { ...formData };

        try {
            const accessToken = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };
    
            const response = await axios.post("https://raknaapi.azurewebsites.net/TechnicalSupport/AddGarage", newGarage, {
                headers
            });
    
            console.log('Added new garage:', response.data);
            setGarageData([...garageData, response.data]);
            setFormData({
                garageName: "",
                hourPrice: "",
                street: "",
                city: "",
                spaces: "",
                longitude: "",
                latitude: ""
            });
        } catch (error) {
            console.error('Error adding garage:', error);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className={`${styles.popup} ${darkmode ? styles['dark-mode'] : ''}`}>
            <div className={`${styles['popup-inner']} ${darkmode ? styles['dark-mode'] : ''}`}>
                <img src={darkmode ? closeDark : closeLight} alt="close" className={`${styles['close-icon']} ${darkmode ? styles['dark-mode'] : ''}`} onClick={onClose} />
                <h2 className={`${darkmode ? styles['dark-mode'] : ''}`}>Add Garage</h2>
                <form onSubmit={handleSubmit} className={`${styles.form} ${darkmode ? styles['dark-mode'] : ''}`}>
                    <input placeholder='Garage Name' type="text" name="garageName" value={formData.garageName} onChange={handleChange} /><hr />
                    <input placeholder='Hour Price' type="number" name="hourPrice" value={formData.hourPrice} onChange={handleChange} /><hr />
                    <input placeholder='Street' type="text" name="street" value={formData.street} onChange={handleChange} /><hr />
                    <input placeholder='City' type="text" name="city" value={formData.city} onChange={handleChange} /><hr />
                    <input placeholder='Total Spaces' type="number" name="spaces" value={formData.spaces} onChange={handleChange} /><hr />
                    <input placeholder='Longitude' type="number" name="longitude" value={formData.longitude} onChange={handleChange} /><hr />
                    <input placeholder='Latitude' type="number" name="latitude" value={formData.latitude} onChange={handleChange} /><hr />
                    <button className={`${styles.submit} ${darkmode ? styles['dark-mode'] : ''}`} type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default GaragePopup;

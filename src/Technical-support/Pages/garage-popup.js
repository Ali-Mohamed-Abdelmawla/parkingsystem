import React, { useState } from 'react';
import axios from 'axios';
import closeDark from '../assets/DarkMode/false-dark.svg';
import closeLight from '../assets/LightMode/false.svg';
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
        const newGarage = {
            garageName: formData.garageName,
            hourPrice: formData.hourPrice,
            street: formData.street,
            city: formData.city,
            totalSpaces: formData.spaces,
            longitude: formData.longitude,
            latitude: formData.latitude
        };
    
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };
            const params = {
                id: newGarage.GarageId,
            };
    
            const response = await axios.post("https://raknaapi.azurewebsites.net/TechnicalSupport/AddGarage", newGarage, {
                headers,
                params
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
        <div className={`${styles.popup} ${darkmode ? styles['dark-mode'] : ''}`}> {/* Apply dark mode class */}
            <div className={`${styles['popup-inner']} ${darkmode ? styles['dark-mode-inner'] : ''}`}> {/* Apply dark mode class */}
                <img src={darkmode ? closeDark : closeLight} alt="close" className={styles['close-icon']} onClick={onClose} /> {/* Use dark mode close icon */}
                <h2>Add Garage</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input placeholder='Garage Name' type="text" name="garageName" defau={formData.garageName} onChange={handleChange} />
                    <input placeholder='Hour Price' type="number" name="hourPrice" value={formData.hourPrice} onChange={handleChange} />
                    <input placeholder='Street' type="text" name="street" value={formData.street} onChange={handleChange} />
                    <input placeholder='City' type="text" name="city" value={formData.city} onChange={handleChange} />
                    <input placeholder='Total Spaces' type="number" name="spaces" value={formData.spaces} onChange={handleChange} />
                    <input placeholder='Longitude' type="number" name="longitude" value={formData.longitude} onChange={handleChange} />
                    <input placeholder='Latitude' type="number" name="latitude" value={formData.latitude} onChange={handleChange} />
                    <button className={styles.submit} type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default GaragePopup;

import axios from 'axios';
import React, { useState } from 'react';
import styles from './garage-popup.module.css';
import closeDark from '../assets/DarkMode/false-dark.svg';
import closeLight from '../assets/LightMode/false.svg';

const UserPopup = ({ onClose, darkMode }) => { 
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        fullName: '',
        nationalId: '',
        userName: '',
        email: '',
        role: '',
        phoneNumber: '',
        garageId:'',
        salary:0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post('https://raknaapi.azurewebsites.net/TechnicalSupport/AddUser', formData, {
                headers: headers
            });

            if (!response.data) {
                throw new Error('Failed to add user');
            }

            console.log('Added newUser:', response.data);
            setUserData([...userData, response.data]);
            setFormData({
                fullName: '',
                nationalId: '',
                userName: '',
                email: '',
                role: '',
                phoneNumber: '',
                garageId:'',
                salary:0
            });
        } catch (error) {
            console.error('Error adding user:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className={`${styles.popup} ${darkMode ? styles['dark-mode'] : ''}`}>
            <div className={styles['popup-inner']}>
            <img src={darkMode ? closeDark : closeLight} alt="close" className={styles['close-icon']} onClick={onClose} />
                <h2>Add User</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input placeholder='Full Name' type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <input placeholder='National ID' type="text" name="nationalId" value={formData.nationalId} onChange={handleChange}  />
                    <input placeholder='Username' type="text" name="userName" value={formData.userName} onChange={handleChange}  />
                    <input placeholder='Email' type="email" name="email" value={formData.email} onChange={handleChange} />
                    <input placeholder='Role' type="text" name="role" value={formData.role} onChange={handleChange} />
                    <input placeholder='Phone Number' type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    <input placeholder='GarageId' type="text" name="garageId" value={formData.garageId} onChange={handleChange} />
                    <button className={styles.submit} type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default UserPopup;

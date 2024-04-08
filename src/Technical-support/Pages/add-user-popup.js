import React, { useState } from 'react';
import close from '../assets/LightMode/false.svg';
import styles from './garage-popup.module.css';

const UserPopup = ({ onClose, darkmode }) => { 
    const [userData, setUsersData] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        ID: '',
        Gender:'',
        workHours:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUsers = {
            Name: formData.Name,
            Email: formData.Email,
            ID: formData.ID,
            Gender:formData.Gender,
            workHours:formData.workHours
        };
        setUsersData([...userData, newUsers]);
        setFormData({
            Name: '',
            Email: '',
            ID: '',
            Gender:'',
            workHours:''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className={`${styles.popup} ${darkmode ? styles['dark-mode'] : ''}`}>
            <div className={`${styles['popup-inner']} ${darkmode ? styles['dark-mode'] : ''}`}>
                <img src={close} alt="close" className={styles['close-icon']} onClick={onClose} />
                <h2 className={darkmode ? styles['dark-mode'] : ''}>Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input placeholder='Name' type="text" name="Name" value={formData.Name} onChange={handleChange} /><hr/>
                    <input placeholder='Email' type="email" name="Email" value={formData.Email} onChange={handleChange} /><hr/>
                    <input placeholder='ID' type="id" name="ID" value={formData.ID} onChange={handleChange} /><hr/>
                    <input placeholder='Gender' type="gender" name="Gender" value={formData.Gender} onChange={handleChange} /><hr/>
                    <input placeholder='Work Hours' type="number" name="workHours" value={formData.workHours} onChange={handleChange} /><hr/>
                    <button className={`${styles.submit} ${darkmode ? styles['dark-mode'] : ''}`} type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default UserPopup;

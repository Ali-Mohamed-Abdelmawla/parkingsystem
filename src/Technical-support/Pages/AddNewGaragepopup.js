import React, { useState } from 'react';
import close from '../assets/LightMode/false.svg';
import './AddNewGaragepopup.css';

const GaragePopup = ({ onClose }) => {
    const [garageData, setGarageData] = useState([]);
    const [formData, setFormData] = useState({
        HourPrice: '',
        Capacity: '',
        Location: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGarage = {
            HourPrice: formData.HourPrice,
            Capacity: formData.Capacity,
            Location: formData.Location
        };
        setGarageData([...garageData, newGarage]);
        setFormData({
            HourPrice: '',
            Capacity: '',
            Location: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <img src={close} alt="close" className="close-icon" onClick={onClose} />
                <h2>Add Garage</h2>
                <form onSubmit={handleSubmit}>
                    <input placeholder='ID' type="number" name="ID" value={formData.ID} onChange={handleChange} /><hr/>
                    <input placeholder='Hour Price' type="number" name="HourPrice" value={formData.HourPrice} onChange={handleChange} /><hr/>
                    <input placeholder='Capacity' type="number" name="Capacity" value={formData.Capacity} onChange={handleChange} /><hr/>
                    <input placeholder='Location' type="text" name="Location" value={formData.Location} onChange={handleChange} /><hr/>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default GaragePopup;

import React, { useState } from 'react';
import './AddVehiclePopup.css'; 

function AddVehiclePopup({ onClose }) {
  
  const [vehicleInfo, setVehicleInfo] = useState({
    name: '',
    plateNumber: ''
  });

  
  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVehicleInfo({
      ...vehicleInfo,
      [name]: value
    });
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2 style={{ color: '#231F20' }}>Add Vehicle</h2>
        <form onSubmit={handleSubmit}>
          {/* Input field for vehicle name */}
          <div className="form-group">
            <label htmlFor="name" style={{ color: '#F2F1F1' }}>Name:</label>
            <input type="text" id="name" name="name" value={vehicleInfo.name} onChange={handleInputChange} />
          </div>
          {/* Input field for vehicle plate number */}
          <div className="form-group">
            <label htmlFor="plateNumber" style={{ color: '#F2F1F1' }}>Plate Number:</label>
            <input type="text" id="plateNumber" name="plateNumber" maxLength="6" value={vehicleInfo.plateNumber} onChange={handleInputChange} style={{ borderColor: '#231F20', backgroundColor: '#F2F1F1', color: '#231F20' }} />
          </div>
          {/* Button to submit the form */}
          <button type="submit" className="popup-button" style={{ backgroundColor: '#231F20' }}>Add</button>
          {/* Button to cancel/close the popup */}
          <button type="button" className="popup-button" onClick={onClose} style={{ backgroundColor: '#231F20' }}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddVehiclePopup;

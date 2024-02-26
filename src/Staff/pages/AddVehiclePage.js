import React, { useState } from 'react';
import '../components/Sidebar';
import './AddVehiclePage.css'
import AddVehiclePopup from './AddVehiclePopup'; 
import { ReactComponent as AddVehicleIcon } from '../assets/light-mode/AddVehicleIcon.svg';


const AddVehiclePage = () => {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="sidebar">
      {/* Sidebar content */}
      <div className="menu-items">
        {/* Add Vehicle sidebar item */}
        <div className="menu-item" onClick={openPopup}>
          <AddVehicleIcon />
          <p>Add Vehicle</p>
        </div>
      </div>

      {/* Render the AddVehiclePopup component */}
      <AddVehiclePopup onClose={closePopup} isOpen={isPopupOpen} />
    </div>
  );
};

export default AddVehiclePage;



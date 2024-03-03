import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/light-mode/light-logo.svg'; 
import { ReactComponent as DashboardIcon } from '../assets/light-mode/DashboardIcon.svg'; 
import { ReactComponent as TransactionIcon } from '../assets/light-mode/TransactionIcon.svg'; 
import { ReactComponent as ReportsIcon } from '../assets/light-mode/ReportIcon.svg'; 
import { ReactComponent as AddVehicleIcon } from '../assets/light-mode/AddVehicleIcon.svg'; 
import { ReactComponent as LogoutIcon  } from '../assets/light-mode/logoutIcon.svg'; 
import AddVehiclePopup from '../pages/AddVehiclePopup'
import './Sidebar.css';

const Sidebar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <Logo className="logo" />
        <span className="logo-text">Rakna</span>
      </div>
      <div className="menu-items">
        <MenuItem icon={<DashboardIcon />} text="Dashboard" to="/" />
        <MenuItem icon={<TransactionIcon />} text="Transaction" to="/transaction" />
        <MenuItem icon={<ReportsIcon />} text="Reports" to="/reports" />
        <div className="menu-item" onClick={handlePopupOpen}>
          <AddVehicleIcon />
          <p className='add'>Add Vehicle</p>
        </div>
      </div>
      <div className="logout">
        <LogoutIcon className="logout-icon" />
        <span>LOGOUT</span>
      </div>
      {isPopupOpen && <AddVehiclePopup onClose={handlePopupClose} />}
    </div>
  );
};

const MenuItem = ({ icon, text, to }) => {
  return (
    <div className="menu-item">
      <Link to={to}>
        {icon}
        <p>{text}</p>
      </Link>
    </div>
  );
};

// const AddVehiclePopup = ({ onClose }) => {
//   return (
//     <div className="popup-container">
//       <div className="popup">
//         <h2>Add Vehicle Popup</h2>
//         <div className="popup-content">
//           {/* Add vehicle form or content here */}
//           <p>This is the popup content.</p>
//         </div>
//         <button className="popup-button" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

export default Sidebar;

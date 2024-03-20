import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/LightMode/logo.svg';
import { ReactComponent as DashboardIcon } from '../assets/LightMode/dashboard-icon.svg';
import { ReactComponent as CustomerServicesIcon } from '../assets/LightMode/customer-services-icon.svg';
import { ReactComponent as ComplaintsIcon } from '../assets/LightMode/complaints-icon.svg';
import { ReactComponent as AddGarage } from '../assets/LightMode/add-garage.svg';
import { ReactComponent as AddEmployeeIcon } from '../assets/LightMode/add-employee-icon.svg';
import { ReactComponent as LOGOUT } from '../assets/LightMode/log-out.svg';
import AddNewGaragepopup from'../Pages/AddNewGaragepopup';
import './sidebar.css';

const Sidebar = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleAddEmployeeClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="sidebar">
            <div className="logo">
                <Logo />
            </div>

            <div className="menu">
                <MenuItem icon={<DashboardIcon />} text="Dashboard" to="/" />
                <MenuItem icon={<CustomerServicesIcon />} text="Customer Services" to="/Customer Services" />
                <MenuItem icon={<ComplaintsIcon />} text="Complaints" to="/Complaints" />
                <MenuItem icon={<AddGarage />} text="Garage" to="/ Garage" />
                <div className="menu-item" onClick={handleAddEmployeeClick}>
                    <AddEmployeeIcon />
                    <p className='add'>Add Garage</p>
                </div>
            </div>

            {isPopupOpen && <AddNewGaragepopup onClose={handleClosePopup} />}

            {/* Move logout link to the bottom */}
            <div className="menu-item">
                <Link to="#">
                    <LOGOUT />
                    <p>log-out</p>
                </Link>
            </div>
        </div>
    );
}

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

export default Sidebar;

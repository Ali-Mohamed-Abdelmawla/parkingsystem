import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/light-mode/light-logo.svg'; 
import { ReactComponent as DashboardIcon } from '../assets/light-mode/DashboardIcon.svg'; 
import { ReactComponent as TransactionIcon } from '../assets/light-mode/TransactionIcon.svg'; 
import { ReactComponent as ReportsIcon } from '../assets/light-mode/ReportIcon.svg'; 
import { ReactComponent as AddVehicleIcon } from '../assets/light-mode/AddVehicleIcon.svg'; 
import { ReactComponent as LogoutIcon  } from '../assets/light-mode/logoutIcon.svg'; 
import AddVehiclePopup from '../pages/AddVehiclePopup'; 
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles['logo-container']}>
        <Logo className={styles.logo} />
        <span className={styles['logo-text']}>Rakna</span>
      </div>
      <div className={styles['menu-items']}>
        <MenuItem icon={<DashboardIcon />} text="Dashboard" to="/" />
        <MenuItem icon={<TransactionIcon />} text="Transaction" to="/transaction" />
        <MenuItem icon={<ReportsIcon />} text="Reports" to="/reports" />
        <div className={styles['menu-item']} onClick={handlePopupOpen}>
          <AddVehicleIcon />
          <p className={styles.add}>Add Vehicle</p>
        </div>
      </div>
      <div className={styles.logout}>
        <LogoutIcon className={styles['logout-icon']} />
        <span>LOGOUT</span>
      </div>
      {isPopupOpen && <AddVehiclePopup onClose={handlePopupClose} />}
    </div>
  );
};

const MenuItem = ({ icon, text, to }) => {
  return (
    <div className={styles['menu-item']}>
      <Link to={to}>
        {icon}
        <p>{text}</p>
      </Link>
    </div>
  );
};

export default Sidebar;

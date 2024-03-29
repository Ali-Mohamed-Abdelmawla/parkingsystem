import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/light-mode/light-logo.svg'; 
import { ReactComponent as DarkLogo } from '../assets/Dark-mode/Dark-logo.svg'; 
import { ReactComponent as DashboardIcon } from '../assets/light-mode/DashboardIcon.svg'; 
import { ReactComponent as DarkDashboardIcon } from '../assets/Dark-mode/DashboardIcon.svg'; 
import { ReactComponent as TransactionIcon } from '../assets/light-mode/TransactionIcon.svg'; 
import { ReactComponent as DarkTransactionIcon } from '../assets/Dark-mode/TransactionIcon.svg'; 
import { ReactComponent as ReportsIcon } from '../assets/light-mode/ReportIcon.svg'; 
import { ReactComponent as DarkReportsIcon } from '../assets/Dark-mode/ReportIcon.svg'; 
import { ReactComponent as AddVehicleIcon } from '../assets/light-mode/AddVehicleIcon.svg'; 
import { ReactComponent as DarkAddVehicleIcon } from '../assets/Dark-mode/AddVehicleIcon.svg'; 
import { ReactComponent as LogoutIcon } from '../assets/light-mode/logoutIcon.svg'; 
import { ReactComponent as DarkLogoutIcon } from '../assets/Dark-mode/logoutIcon.svg'; 
import AddVehiclePopup from '../pages/AddVehiclePopup'; 
import styles from './Sidebar.module.css';

const Sidebar = ({ darkMode, name, toggleDarkMode }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  console.log('Dark mode:', darkMode); 

  return (
    <div className={`${styles.sidebar} ${darkMode ? styles['dark-mode'] : ''}`}>
      <div className={styles['logo-container']}>
        {darkMode ? <DarkLogo className={styles.logo} /> : <Logo className={styles.logo} />}
        <span className={styles['logo-text']}>Rakna</span>
      </div>
      <div className={styles['menu-items']}>
        <MenuItem icon={darkMode ? <DarkDashboardIcon /> : <DashboardIcon />} text="Dashboard" to="/" />
        <MenuItem icon={darkMode ? <DarkTransactionIcon /> : <TransactionIcon />} text="Transaction" to="/transaction" />
        <MenuItem icon={darkMode ? <DarkReportsIcon /> : <ReportsIcon />} text="Reports" to="/reports" />
        <div className={styles['menu-item']} onClick={handlePopupOpen}>
          {darkMode ? <DarkAddVehicleIcon /> : <AddVehicleIcon />}

          <p className={styles.add}>Add Vehicle</p>
        </div>
      </div>
      <div className={styles.logout}>
        {darkMode ? <DarkLogoutIcon className={styles['logout-icon']} /> : <LogoutIcon className={styles['logout-icon']} />}

        <span>LOGOUT</span>
      </div>
      {isPopupOpen && <AddVehiclePopup onClose={handlePopupClose} darkMode={darkMode} />}
    </div>
  );
};

const MenuItem = ({ icon, text, to }) => {
  return (
    <div className={styles["menu-item"]}>
      <Link to={to}>
        {icon}
        <p>{text}</p>
      </Link>
    </div>
  );
};

export default Sidebar;


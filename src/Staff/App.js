import React, { createContext, useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/DashboardPage';
import Transaction from './pages/TransactionPage';
import Reports from './pages/ReportsPage';
import AddVehiclePopup from './pages/AddVehiclePopup';


const App = () => {
  // State for Add Vehicle Popup
  const [isAddVehiclePopupOpen, setIsAddVehiclePopupOpen] = useState(false);
  const toggleAddVehiclePopup = () => setIsAddVehiclePopupOpen(!isAddVehiclePopupOpen);

  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Mock user data
  const name = "Slsabeel";

  const goToRoute = (route) => {
    // Logic to navigate to a specific route
  };

  return (
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <TopBar name={name} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="content">
          <Sidebar darkMode={darkMode} name={name} toggleAddVehiclePopup={toggleAddVehiclePopup} goToRoute={goToRoute} />
          <Routes>
          <Route path="/" element={<Dashboard darkMode={darkMode} />} />
          <Route path="/transaction" element={<Transaction darkMode={darkMode} />} />
          <Route path="/reports" element={<Reports darkMode={darkMode} />} />
          </Routes>
        </div>
        {isAddVehiclePopupOpen && <AddVehiclePopup onClose={toggleAddVehiclePopup} darkMode={darkMode} />}
      </div>
  );
};

export default App;

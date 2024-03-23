import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import TopBar from './components/TopBar'; 
import Dashboard from './pages/DashboardPage'; 
import Transaction from './pages/TransactionPage';
import Reports from './pages/ReportsPage';
import AddVehicle from './pages/AddVehiclePage';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const name = "Slsabeel";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <TopBar name={name} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="content">
        <Sidebar darkMode={darkMode} name={name} />
        <Routes>
          <Route path="/" element={<Dashboard darkMode={darkMode} />} />
          <Route path="/transaction" element={<Transaction darkMode={darkMode} />} />
          <Route path="/reports" element={<Reports darkMode={darkMode} />} />
          <Route path="/add-vehicle" element={<AddVehicle darkMode={darkMode}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

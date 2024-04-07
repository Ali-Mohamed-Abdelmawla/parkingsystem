import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Component/sidebar'; 
import NavBar from './Component/navbar'; 
import Dashboard from './Pages/Dashboard'; 
import Employee from './Pages/Customer-Services';
import Complaint from './Pages/Complaints';
import Garages from './Pages/Garages';

function App() {
  const name = "Amany";
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <NavBar name={name} isDarkMode={isDarkMode} handleDarkModeToggle={handleDarkModeToggle} />
      <div className="content">
        <Sidebar darkmode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Dashboard darkmode={isDarkMode} />} />
          <Route path="/Customer Services" element={<Employee darkmode={isDarkMode} handleDarkModeToggle={handleDarkModeToggle} />} />
          <Route path="/Complaints" element={<Complaint darkmode={isDarkMode} />} />
          <Route path="/Garages" element={<Garages darkmode={isDarkMode} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Component/sidebar'; 
import NavBar from './Component/navbar'; 
import Dashboard from './Pages/Dashboard'; 
import Employee from './Pages/Users';
import Complaint from './Pages/Complaints';
import Garages from './Pages/Garages';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [userName,setUserName] = useState("");
  const getUserNamefromtoken = () => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken)
      setUserName(decodedToken.FullName);
    }
  }

  useEffect(() => {
    getUserNamefromtoken();
  }, []);

  const name = userName;
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
          <Route path="/Dashboard" element={<Dashboard darkmode={isDarkMode} handleDarkModeToggle={handleDarkModeToggle}/>} />
          <Route path="/Users" element={<Employee darkmode={isDarkMode} handleDarkModeToggle={handleDarkModeToggle} />} />
          <Route path="/Complaints" element={<Complaint darkmode={isDarkMode} handleDarkModeToggle={handleDarkModeToggle}/>} />
          <Route path="/Garages" element={<Garages darkmode={isDarkMode} handleDarkModeToggle={handleDarkModeToggle} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

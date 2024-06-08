import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.js';

function SidebarContainer({ darkMode, name, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from sessionStorage
    sessionStorage.removeItem("accessToken");
    // Redirect to login page
    navigate("/");
  };

  return (
    <Sidebar
      darkMode={darkMode}
      name={name}
      toggleDarkMode={toggleDarkMode}
      navigate={navigate}
      handleLogout={handleLogout}
    />
  );
}

export default SidebarContainer;

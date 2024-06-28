import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./pages/Sidebar-component/Sidebar.js";
import TopBar from "./pages/Topbar-component/TopBar.js";
import AddVehiclePopup from "./pages/AddVehicle-component/AddVehiclePopupContainer.js";
import {jwtDecode} from "jwt-decode";

const App = () => {
  const navigate = useNavigate();
  const [isAddVehiclePopupOpen, setIsAddVehiclePopupOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode state from session storage
  useEffect(() => {
    const savedDarkMode = sessionStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    document.documentElement.setAttribute("theme", savedDarkMode ? "dark" : "light");
  }, []);

  // Update session storage and document attribute whenever dark mode changes
  useEffect(() => {
    sessionStorage.setItem("darkMode", darkMode);
    document.documentElement.setAttribute("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleAddVehiclePopup = () => {
    setIsAddVehiclePopupOpen(!isAddVehiclePopupOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const token = sessionStorage.getItem("accessToken");

  const getUserNamefromtoken = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserName(decodedToken.FullName);
    }
  };

  useEffect(() => {
    getUserNamefromtoken();
  }, []);

  const goToRoute = (route) => {
    navigate(route);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <TopBar name={userName} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="content">
        <Sidebar
          darkMode={darkMode}
          name={userName}
          toggleAddVehiclePopup={toggleAddVehiclePopup}
          goToRoute={goToRoute}
        />
        <DarkModeWrapper darkMode={darkMode} />
      </div>
      {isAddVehiclePopupOpen && (
        <AddVehiclePopup onClose={toggleAddVehiclePopup} darkMode={darkMode} />
      )}
    </div>
  );
};

export default App;

const DarkModeWrapper = ({ darkMode }) => {
  return <Outlet context={{ darkMode }} />;
};

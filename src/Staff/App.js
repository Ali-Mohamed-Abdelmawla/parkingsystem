import  {  useState,  useEffect } from 'react';
import { Routes, Route,  useNavigate, Outlet } from 'react-router-dom';
import Sidebar from './pages/Sidebar-component/Sidebar.js';
import TopBar from './pages/Topbar-component/TopBar.js';
import Dashboard from './pages/Dashboard-component/DashboardPage.js';
import Transaction from './pages/Transaction-component/TransactionPage.js';
import Reports from './pages/Reports-component/ReportsPage.js';
import AddVehiclePopup from './pages/AddVehicle-component/AddVehiclePopupContainer.js';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../auth/axios.js';
const App = () => {
  
  const navigate = useNavigate();
  const [isAddVehiclePopupOpen, setIsAddVehiclePopupOpen] = useState(false);
  const [userName,setUserName] = useState("");
  const toggleAddVehiclePopup = () => setIsAddVehiclePopupOpen(!isAddVehiclePopupOpen);

  
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const token = sessionStorage.getItem('accessToken');

  const getUserNamefromtoken = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken)
      setUserName(decodedToken.FullName);
    }
  }
  
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  
  const getCurrentParkingSessions = axiosInstance.get(
    "/api/GarageStaff/CurrentParkingSessions",
    { headers }
  );
  const getAllReservations = axiosInstance.get("/api/GarageStaff/AllReservation", {
    headers,
  });

  Promise.all([getCurrentParkingSessions, getAllReservations])
    .then((responses) => {
      const currentParkingSessionsData = responses[0].data;
      const allReservationsData = responses[1].data;

      const mergedData = [
        ...currentParkingSessionsData,
        ...allReservationsData,
      ];
      console.log("Merged data:", mergedData);
      sessionStorage.setItem("CurrentSessions", mergedData.length);
    })

  useEffect(() => {
    getUserNamefromtoken();
  }, []);

  const name = userName;

  const goToRoute = (route) => {
    navigate(route);
  };

  return (
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <TopBar name={name} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="content">
          <Sidebar darkMode={darkMode} name={name} toggleAddVehiclePopup={toggleAddVehiclePopup} goToRoute={goToRoute} />
          <DarkModeWrapper darkMode={darkMode} />
        </div>
        {isAddVehiclePopupOpen && <AddVehiclePopup onClose={toggleAddVehiclePopup} darkMode={darkMode} />}
      </div>
  );
};

export default App;

const DarkModeWrapper = ({ darkMode }) => {
  return <Outlet context={{ darkMode }} />;
};
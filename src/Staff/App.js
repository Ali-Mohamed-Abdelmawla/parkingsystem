import  {  useState,  useEffect } from 'react';
import { Routes, Route,  useNavigate, Outlet } from 'react-router-dom';
import Sidebar from './pages/Sidebar-component/Sidebar.js';
import TopBar from './pages/Topbar-component/TopBar.js';
import Dashboard from './pages/Dashboard-component/DashboardPage.js';
import Transaction from './pages/Transaction-component/TransactionPage.js';
import Reports from './pages/Reports-component/ReportsPage.js';
import AddVehiclePopup from './pages/AddVehicle-component/AddVehiclePopupContainer.js';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  
  const navigate = useNavigate();
  const [isAddVehiclePopupOpen, setIsAddVehiclePopupOpen] = useState(false);
  const [userName,setUserName] = useState("");
  const toggleAddVehiclePopup = () => setIsAddVehiclePopupOpen(!isAddVehiclePopupOpen);

  
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

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
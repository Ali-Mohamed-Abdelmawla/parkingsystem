import { useState, useEffect } from "react";
import Sidebar from "./Component/sidebar";
import NavBar from "./Component/navbar";
// import Dashboard from "./Pages/Dashboard";
// import Employee from "./Pages/Users";
// import Complaint from "./Pages/Complaints";
// import Garages from "./Pages/Garages";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";

function App() {
  const [userName, setUserName] = useState("");
  const getUserNamefromtoken = () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserName(decodedToken.FullName);
    }
  };

  useEffect(() => {
    getUserNamefromtoken();
  }, []);

  const name = userName;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <NavBar
        name={name}
        isDarkMode={isDarkMode}
        handleDarkModeToggle={handleDarkModeToggle}
      />
      <div className="content">
        <Sidebar darkmode={isDarkMode} />
        <DarkModeWrapper darkmode={isDarkMode} />
        </div>
    </div>
  );
}

export default App;

const DarkModeWrapper = ({ darkmode }) => {
  return <Outlet context={{ darkmode }} />;
};
import { useState, useEffect } from "react";
import Sidebar from "./Component/sidebar";
import NavBar from "./Component/navbar";
// import Dashboard from "./Pages/Dashboard";
// import Employee from "./Pages/Users";
// import Complaint from "./Pages/Complaints";
// import Garages from "./Pages/Garages";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import axiosInstance from "../auth/axios";
import Loader from "../helper/loading-component/loader";
function App() {
  const [userName, setUserName] = useState("");
  const [loading,setLoading] = useState(false);
  const getUserNamefromtoken = () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserName(decodedToken.FullName);
    }
  };

  
  const fetchComplaints = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/Report/GetReportsBasedOnRole",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const complaints = response.data;
      sessionStorage.setItem("totalReports", response.data.length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserNamefromtoken();
    fetchComplaints();
  }, []);

  const name = userName;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

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
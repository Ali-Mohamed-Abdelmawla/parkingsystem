import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Component/sidebar'; 
import NavBar from './Component/navbar'; 
import Dashboard from './Pages/Dashboard'; 
import Employee from './Pages/Customer-Services';
import Complaint from './Pages/Complaints';
import Garages from'./Pages/Garages';
function App() {
  const name = "Ali";

  return (
    <div className="app">
      <NavBar name={name} />
      <div className="content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Customer Services" element={<Employee />} />
          <Route path="/Complaints" element={<Complaint />} />
          <Route path="/:Garages" element={<Garages />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;





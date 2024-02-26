import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import TopBar from './components/TopBar'; 
import Dashboard from './pages/DashboardPage'; 
import Transaction from './pages/TransactionPage';
import Reports from './pages/ReportsPage';
import AddVehicle from './pages/AddVehiclePage';

const App = () => {
  const name = "Slsabeel";

  return (
    <div className="app">
     
        <TopBar name={name} />
        <div className="content">
          <Sidebar />
          <Routes>
            {/* Dashboard route */}
            <Route path="/" element={<Dashboard />} />

            {/* Transaction route */}
            <Route path="/transaction" element={<Transaction />} /> {/* Render the TransactionPage component */}

            {/* Other routes */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
          </Routes>
        </div>
     
    </div>
  );
}

export default App;





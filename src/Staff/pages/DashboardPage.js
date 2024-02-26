import React from 'react';
import './DashboardPage.css';
import groupicon from '../assets/light-mode/groupicon.svg';
import updateicon from '../assets/light-mode/updateIcon.svg';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Real-time Parking Data</h2>
      <div className="card-container">
        {/* First Card */}
        <div className="card">
          <div className="card-content">
            <div>
              <span>Total Spaces</span>
              <img src={groupicon} alt="Icon" className="icon" />
              <p className="number">100</p>
            </div>
          </div>
        </div>
        {/* Second Card */}
        <div className="card">
          <div className="card-content">
            <div>
              <span>Occupied Spaces</span>
              <img src={updateicon} alt="Icon" className="icon" />
              <p className="number">70</p>
            </div>
          </div>
        </div>
        {/* Third Card */}
        <div className="card">
          <div className="card-content">
            <div>
              <span>Available Spaces</span>
              <img src={updateicon} alt="Icon" className="icon" />
              <p className="number" style={{ color: '#ED7F16' }}>30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

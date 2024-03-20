import React from 'react';
import './Dashboard.css';
import TotalEmployee from '../assets/LightMode/total-employee.svg';
import TotalReports from '../assets/LightMode/total-reports.svg';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="card-container">
                {/* First Card */}
                <div className="card">
                    <div className="card-content">
                        <div>
                            <span>Total Customer Service</span>
                            <img src={TotalEmployee} alt="Total Employee Icon" className="icon" />
                            <p className="number">100</p>
                        </div>
                    </div>
                </div>
                {/* Second Card */}
                <div className="card">
                    <div className="card-content">
                        <div>
                            <span>Total Reports</span>
                            <img src={TotalReports} alt="Total Reports Icon" className="icon" />
                            <p className="number">20</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

// Dashboard.js
import React from 'react';
import styles from './Dashboard.module.css';
import TotalEmployeeLight from '../assets/LightMode/total-employee.svg';
import TotalReportsLight from '../assets/LightMode/total-reports.svg';
import TotalEmployeeDark from '../assets/DarkMode/total-employee-dark.svg';
import TotalReportsDark from '../assets/DarkMode/total-reports-dark.svg';

const Dashboard = ({ darkmode }) => {
    return (
        <div className={`${styles['dashboard-container']} ${darkmode ? styles['dark-mode'] : ''}`}>
            <div className={`${styles['card-container']} ${darkmode ? styles['dark-mode'] : ''}`}>
                {/* First Card */}
                <div className={`${styles.card} ${darkmode ? styles['dark-mode'] : ''}`}>
                    <div className={`${styles['card-content']} ${darkmode ? styles['dark-mode'] : ''}`}>
                        <div>
                            <span className={`${styles.span} ${darkmode ? styles['dark-mode'] : ''}`}>Total Users</span>
                            <img src={darkmode ? TotalEmployeeDark : TotalEmployeeLight} alt="Total Employee Icon" className={`${styles.icon1} ${darkmode ? styles['dark-mode'] : ''}`} />
                            <p className={`${styles.number1} ${darkmode ? styles['dark-mode'] : ''}`}>_</p>
                        </div>
                    </div>
                </div>
                {/* Second Card */}
                <div className={`${styles.card} ${darkmode ? styles['dark-mode'] : ''}`}>
                    <div className={`${styles['card-content']} ${darkmode ? styles['dark-mode'] : ''}`}>
                        <div>
                            <span className={`${styles.span} ${darkmode ? styles['dark-mode'] : ''}`}>Total Reports</span>
                            <img src={darkmode ? TotalReportsDark : TotalReportsLight} alt="Total Reports Icon" className={`${styles.icon} ${darkmode ? styles['dark-mode'] : ''}`} />
                            <p className={`${styles.number} ${darkmode ? styles['dark-mode'] : ''}`}>{sessionStorage.getItem("totalReports")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

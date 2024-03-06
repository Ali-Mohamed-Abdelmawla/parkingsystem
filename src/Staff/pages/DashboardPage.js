import React from 'react';
import styles from './DashboardPage.module.css';
import groupicon from '../assets/light-mode/groupicon.svg';
import updateicon from '../assets/light-mode/updateIcon.svg';

const DashboardPage = () => {
  return (
    <div className={styles['dashboard-container']}>
      <h2 className={styles['dashboard-title']}>Real-time Parking Data</h2>
      <div className={styles['card-container']}>
        {/* First Card */}
        <div className={styles.card}>
          <div className={styles['card-content']}>
            <div>
              <span>Total Spaces</span>
              <img src={groupicon} alt="Icon" className={styles.icon} />
              <p className={styles.number}>100</p>
            </div>
          </div>
        </div>
        {/* Second Card */}
        <div className={styles.card}>
          <div className={styles['card-content']}>
            <div>
              <span>Occupied Spaces</span>
              <img src={updateicon} alt="Icon" className={styles.icon} />
              <p className={styles.number}>70</p>
            </div>
          </div>
        </div>
        {/* Third Card */}
        <div className={styles.card}>
          <div className={styles['card-content']}>
            <div>
              <span>Available Spaces</span>
              <img src={updateicon} alt="Icon" className={styles.icon} />
              <p className={styles.number} style={{ color: '#ED7F16' }}>30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

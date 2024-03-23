import React from 'react';
import styles from './DashboardPage.module.css';
import groupiconLight from '../assets/light-mode/groupicon.svg';
import updateiconLight from '../assets/light-mode/updateIcon.svg';
import groupiconDark from '../assets/Dark-mode/groupicon.svg';
import updateiconDark from '../assets/Dark-mode/updateIcon.svg';

const DashboardPage = ({ darkMode }) => {
  return (
    <div className={`${styles['dashboard-container']} ${darkMode ? styles['dark-mode'] : ''}`}>
      <h2 className={styles['dashboard-title']}>Real-time Parking Data</h2>
      <div className={styles['card-container']}>
        {/* First Card */}
        <div className={styles.card}>
          <div className={styles['card-content']}>
            <div>
              <span>Total Spaces</span>
              <img src={darkMode ? groupiconDark : groupiconLight} alt="Icon" className={styles.icon} />
              <p className={styles.number}>100</p>
            </div>
          </div>
        </div>
        {/* Second Card */}
        <div className={styles.card}>
          <div className={styles['card-content']}>
            <div>
              <span>Occupied Spaces</span>
              <img src={darkMode ? updateiconDark : updateiconLight} alt="Icon" className={styles.icon} />
              <p className={styles.number}>70</p>
            </div>
          </div>
        </div>
        {/* Third Card */}
        <div className={styles.card}>
          <div className={styles['card-content']}>
            <div>
              <span>Available Spaces</span>
              <img src={darkMode ? updateiconDark : updateiconLight} alt="Icon" className={styles.icon} />
              <p className={styles.number} style={{ color: '#ED7F16' }}>30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;


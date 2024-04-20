import React, { useState, useEffect } from 'react';
import styles from './DashboardPage.module.css';
import groupiconLight from '../assets/light-mode/groupicon.svg';
import updateiconLight from '../assets/light-mode/updateIcon.svg';
import groupiconDark from '../assets/Dark-mode/groupicon.svg';
import updateiconDark from '../assets/Dark-mode/updateIcon.svg';
import axios from '../axios'; 

const DashboardPage = ({ darkMode }) => {
  const [availableSpaces, setAvailableSpaces] = useState(0);
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));

  useEffect(() => {
    const fetchAvailableSpaces = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        };
        console.log('Request Headers:', headers);

        const response = await axios.get('/api/GarageStaff/AvailableSpaces', { headers });
        console.log('Available spaces:', response.data);
        setAvailableSpaces(response.data.availableSpaces);
      } catch (error) {
        if (error.response) {
          console.error('Error status:', error.response.status);
          if (error.response.status === 401) {
            console.error('Unauthorized: Access token may be invalid or expired');
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
      }
    };
    
    const updateAccessToken = () => {
      try {
        const newAccessToken = localStorage.getItem('accessToken');
        if (newAccessToken) {
          setAccessToken(newAccessToken);
        } else {
          console.error('Access token not found in localStorage');
        }
      } catch (error) {
        console.error('Error retrieving access token from localStorage:', error);
      }
    };
    
    updateAccessToken();

    const intervalId = setInterval(fetchAvailableSpaces, 60000);
    return () => clearInterval(intervalId);
  }, [accessToken]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableSpaces = async () => {
      setLoading(true);
      try {
        
        setLoading(false); 
      } catch (error) {
        setLoading(false); 
      }
    };

    const intervalId = setInterval(fetchAvailableSpaces, 60000);
    return () => clearInterval(intervalId);
  }, [accessToken]);

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
              <p className={styles.number}>120</p>
            </div>
          </div>
        </div>
        {/* Second Card */}
        <div className={styles.card}>
          <div className={styles['card-content']}>
            <div>
              <span>Occupied Spaces</span>
              <img src={darkMode ? updateiconDark : updateiconLight} alt="Icon" className={styles.icon} />
              <p className={styles.number}>9</p>
            </div>
          </div>
        </div>
        {/* Third Card */}
        <div className={styles.card}>
          <div className={styles['card-content']}>
            <div>
              <span>Available Spaces</span>
              <img src={darkMode ? updateiconDark : updateiconLight} alt="Icon" className={styles.icon} />
              <p className={styles.number} style={{ color: '#ED7F16' }}>{availableSpaces}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

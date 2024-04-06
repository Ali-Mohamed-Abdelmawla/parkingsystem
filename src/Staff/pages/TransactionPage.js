import React, { useState, useEffect } from 'react';
import styles from './TransactionPage.module.css'; 
import carIcon from '../assets/light-mode/carIcon.svg'; 
import darkCarIcon from '../assets/light-mode/carIcon.svg';
// import Successful from '../assets/Payment/Successful.svg';
// import Failed from '../assets/Payment/Failed.svg';
import AddVehiclePopup from './AddVehiclePopup';
import axios from 'axios'; // Import Axios

function TransactionPage({ darkMode }) {
    const [activeTab, setActiveTab] = useState('current');
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [inGarageVehicles, setInGarageVehicles] = useState([]); 
    const accessToken = localStorage.getItem('accessToken');
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (activeTab === 'inGarage') {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };
    
            const getCurrentParkingSessions = axios.get('https://raknaapi.azurewebsites.net/api/GarageStaff/CurrentParkingSessions', { headers: headers });
    
            const getAllReservations = axios.get('https://raknaapi.azurewebsites.net/api/GarageStaff/AllReservation', { headers: headers });
    
            Promise.all([getCurrentParkingSessions, getAllReservations])
                .then(responses => {
                    const currentParkingSessionsData = responses[0].data;
                    const allReservationsData = responses[1].data;
    
                    const mergedData = [...currentParkingSessionsData, ...allReservationsData];
                    console.log('In garage vehicles and reservations:', mergedData);
                    setInGarageVehicles(mergedData);
                })
                .catch(errors => {
                    console.error('Error fetching in garage vehicles and reservations:', errors);
                });
        }
    }, [activeTab]);
    
    
    const handleConfirmButtonClick = (transaction) => {
        setSelectedTransaction(transaction);
        setShowConfirmPopup(true);
    };

    const handleDetailsButtonClick = (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetailsPopup(true);
    };

    const handleCloseConfirmPopup = async () => {
        try {
          const requestData = {
            plateLetters: "your_plate_letters_here",
            plateNumbers: "your_plate_numbers_here",
            payment: 0,
            paymentType: "Cash"
          };
      
          const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          };
      
          const response = await axios.delete(
            'https://raknaapi.azurewebsites.net/api/GarageStaff/EndParkingSession',
            
                 requestData
            ,
            {
              headers: headers,
            }
          );
      
          console.log('Parking session ended successfully');
          setShowConfirmPopup(false);
        } catch (error) {
          console.error('Error ending parking session:', error);
        }
      };
      


    const handleCloseDetailsPopup = () => {
        setShowDetailsPopup(false);
    };
    
    const carIconSrc = darkMode ? darkCarIcon : carIcon;

    

    return (
        <div className={`${styles.container} ${darkMode ? styles['dark-mode'] : ''}`}>
            <div className={styles['tab-container']}>

    <div className={`${styles.tab} ${activeTab === 'current' ? styles.active : ''}`} onClick={() => handleTabClick('current')}>
        <span className={styles['tab-text']}>Current</span>
    </div>
    <div className={`${styles.tab} ${activeTab === 'inGarage' ? styles.active : ''}`} onClick={() => handleTabClick('inGarage')}>
        <span className={styles['tab-text']}>In Garage</span>
    </div>
    <div className={`${styles.tab} ${activeTab === 'history' ? styles.active : ''}`} onClick={() => handleTabClick('history')}>
        <span className={styles['tab-text']}>History</span>
    </div>
            </div>
            <div className={styles['tab-content']}>
                {activeTab === 'current' && (
                    <div className={styles['C-card-grid']}>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className={styles['C-card']}>
                                <div className={styles['C-card-content']}>
                                    <img src={carIcon} alt="Car Icon" className={styles['C-icon']} />
                                    <div className={styles['C-Vehicle-info']}>
                                        <span>أب ج-123</span>
                                        {/* <p>Slsabeel</p> */}
                                    </div>
                                </div>
                                <p>Total Duration: 2 hours</p>
                                <div className={styles['C-card-bottom']}>
                                    <h3>Total Cost: 100 LE</h3>
                                    <button className={styles['C-confirm-button']} onClick={() => handleConfirmButtonClick({ plateNumber: 'أب ج-١٢٣', ownerName: 'Slsabeel', entryTime: '09:00 AM', exitTime: '11:00 AM', totalFee: '100 LE' })}>Confirm</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showConfirmPopup && (
                    <div className={styles['C-popup']}>
                        <div className={styles['C-popup-content']}>
                            <p>Plate Number: {selectedTransaction.plateNumber}</p>
                            {/* <p>Name: {selectedTransaction.ownerName}</p> */}
                            <p>Entry Time: {selectedTransaction.entryTime}</p>
                            <p>Exit Time: {selectedTransaction.exitTime}</p>
                            <p>Total Fee: {selectedTransaction.totalFee}</p>
                            <div className={styles['C-payment-options']}>
                                <button className={styles['C-popconfirm']} onClick={() => {
                                    setTimeout(() => {
                                        handleCloseConfirmPopup();
                                    }, 100); 
                                }}>Confirm</button>
                            </div>
                        </div>
                    </div>
                )}

{activeTab === 'inGarage' && (
    <div className={styles['I-card-grid']}>
        {console.log("inGarageVehicles:", inGarageVehicles)}
        {inGarageVehicles.map((vehicle, index) => (
            <div key={index} className={styles['I-card']}>
                <div className={styles['I-card-content']}>
                    <img src={carIcon} alt="Car Icon" className={styles['I-icon']} />
                    <div className={styles['I-Vehicle-info']}>
                        <span>{vehicle && vehicle.plateNumber}</span>
                        {/* Add more details here if needed */}
                    </div>
                </div>
                <p>Total Duration: 1 hour</p>
                <div className={styles['I-card-bottom']}>
                    <div className={styles['I-accrued-cost']}>
                        <h3>Accrued Cost: {vehicle && vehicle.accruedCost} LE</h3>
                    </div>
                </div>
            </div>
        ))}         
    </div>
    
)}
                {activeTab === 'history' && (
                    <div className={styles['H-card-grid']}>
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className={styles['H-card']}>
                                <div className={styles['H-card-content']}>
                                    <img src={carIcon} alt="Car Icon" className={styles['H-icon']} />
                                    <div className={styles['H-Vehicle-info']}>
                                    <span>أب ج-123</span>
                                        {/* <p>Slsabeel</p> */}
                                    </div>
                                </div>
                                <p>Total Duration: 2 hours</p>
                                <div className={styles['H-card-bottom']}>
                                    <div className={styles['H-total-cost']}>
                                        <h3>Total Cost:100 LE</h3>
                                    </div>
                                    <button className={styles['H-details-button']} onClick={() => handleDetailsButtonClick({ plateNumber: 'أب ج-١٢٣', ownerName: 'Slsabeel', entryTime: '09:00 AM', exitTime: '11:00 AM', paymentmethod: 'paymob', totalFee: '100 LE' })}>Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showDetailsPopup && (
                    <div className={styles['H-popup']}>
                        <div className={styles['H-popup-content']}>
                            <p>Plate Number: {selectedTransaction.plateNumber}</p>
                            {/* <p>Name: {selectedTransaction.ownerName}</p> */}
                            <p>Entry Time: {selectedTransaction.entryTime}</p>
                            <p>Exit Time: {selectedTransaction.exitTime}</p>
                            <hr></hr>
                            <p style={{ fontWeight: 'bold' }}>Total Fee : <span style={{ fontWeight: 'bold' }}>{selectedTransaction.totalFee}</span></p>
                            <button className={styles['H-close-popup']} onClick={handleCloseDetailsPopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TransactionPage;

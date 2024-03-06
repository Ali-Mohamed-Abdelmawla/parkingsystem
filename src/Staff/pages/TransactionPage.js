import React, { useState } from 'react';
import styles from './TransactionPage.module.css'; 
import carIcon from '../assets/light-mode/carIcon.svg'; 
// import Successful from '../assets/Payment/Successful.svg';
// import Failed from '../assets/Payment/Failed.svg';
import AddVehiclePopup from './AddVehiclePopup';

function TransactionPage() {
    const [activeTab, setActiveTab] = useState('current');
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [inGarageVehicles, setInGarageVehicles] = useState([]); 
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleConfirmButtonClick = (transaction) => {
        setSelectedTransaction(transaction);
        setShowConfirmPopup(true);
    };

    const handleDetailsButtonClick = (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetailsPopup(true);
    };

    const handleCloseConfirmPopup = () => {
        setShowConfirmPopup(false);
    };

    const handleCloseDetailsPopup = () => {
        setShowDetailsPopup(false);
    };
    // Function to add a new vehicle to the "In Garage" tab
    const addVehicleToGarage = (plateNumber) => {
        setInGarageVehicles([...inGarageVehicles, { plateNumber }]);
    };

    return (
        <div className={styles.container}>
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
                                        <span>أب ج-١٢٣</span>
                                        <p>Slsabeel</p>
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
                            <p>Name: {selectedTransaction.ownerName}</p>
                            <p>Entry Time: {selectedTransaction.entryTime}</p>
                            <p>Exit Time: {selectedTransaction.exitTime}</p>
                            <p>Total Fee: {selectedTransaction.totalFee}</p>
                            <div className={styles['C-payment-options']}>
                                <button className={styles['C-confirm']} onClick={() => {
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
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className={styles['I-card']}>
                                <div className={styles['I-card-content']}>
                                    <img src={carIcon} alt="Car Icon" className={styles['I-icon']} />
                                    <div className={styles['I-Vehicle-info']}>
                                        <span>أب ج-١٢٣</span>
                                        <p>Slsabeel</p>
                                    </div>
                                </div>
                                <p>Total Duration: 1 hours</p>
                                <div className={styles['I-card-bottom']}>
                                    <div className={styles['I-accrued-cost']}>
                                        <h3>Accrued Cost:50 LE</h3>
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
                                        <span>أب ج-١٢٣</span>
                                        <p>Slsabeel</p>
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
                            <p>Name: {selectedTransaction.ownerName}</p>
                            <p>Entry Time: {selectedTransaction.entryTime}</p>
                            <p>Exit Time: {selectedTransaction.exitTime}</p>
                            <p style={{ color: '#00DE73', fontWeight: 'bold' }}>Total Fee: <span style={{ color: '#00DE73', fontWeight: 'bold' }}>{selectedTransaction.totalFee}</span></p>
                            <button className={styles['H-close-popup']} onClick={handleCloseDetailsPopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TransactionPage;

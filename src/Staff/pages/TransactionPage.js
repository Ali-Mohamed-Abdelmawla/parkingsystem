import React, { useState } from 'react';
import './TransactionPage.css'; 
import carIcon from '../assets/light-mode/carIcon.svg'; 

function TransactionPage() {
    const [activeTab, setActiveTab] = useState('current');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
            <div className="tab-container">
                <div className={`tab ${activeTab === 'current' ? 'active' : ''}`} onClick={() => handleTabClick('current')}>
                    <span className="tab-text">Current</span>
                </div>
                <div className={`tab ${activeTab === 'inGarage' ? 'active' : ''}`} onClick={() => handleTabClick('inGarage')}>
                    <span className="tab-text">In Garage</span>
                </div>
                <div className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => handleTabClick('history')}>
                    <span className="tab-text">History</span>
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'current' && (
                    <div className="card-grid">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="card">
                                <div className="card-content">
                                    <img src={carIcon} alt="Car Icon" className="icon" />
                                    <div className='Vehicle-info'>
                                        <span>أب ج-١٢٣</span>
                                        <p>Slsabeel</p>
                                    </div>
                                </div>
                                <p>Total Duration: 2 hours</p>
                                <div className="card-bottom">
                                    <h3>Total Cost: 100 LE</h3>
                                    <button className="confirm-button">Confirm</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TransactionPage;

import React from 'react';

function HistoryCard({ plateNumber, ownerName, duration, cost }) {
    return (
        <div className="card">
            <h2>{plateNumber}</h2>
            <p>Owner: {ownerName}</p>
            <p>Duration: {duration}</p>
            <p>Cost: {cost}</p>
        </div>
    );
}

export default HistoryCard;

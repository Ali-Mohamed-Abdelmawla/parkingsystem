import React from 'react';
function InGarageCard({ plateNumber, ownerName, duration }) {
    return (
        <div className="card">
            <h2>{plateNumber}</h2>
            <p>Owner: {ownerName}</p>
            <p>Duration: {duration}</p>
        </div>
    );
}

export default InGarageCard;

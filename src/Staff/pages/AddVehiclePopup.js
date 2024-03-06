import React, { useState, useRef } from 'react';
import styles from './AddVehiclePopup.module.css';

function AddVehiclePopup({ onClose }) {
  const [vehicleInfo, setVehicleInfo] = useState({
    // name: '',
    plateNumber: ''
  });

  const OTPForm = ({ onClose }) => {
    // const [ownerName, setOwnerName] = useState(''); // Commented out
    const [plateNumber, setPlateNumber] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = useRef([]);

    const handleInputChange = (index, value) => {
      // Check if the character is Arabic or English letter
      if (
        (value >= '\u0600' && value <= '\u06FF') || // Arabic letters
        (value >= '٠' && value <= '٩') || // Arabic numerals
        (value >= '0' && value <= '9') // English numerals
      ) {
        const newPlateNumber = [...plateNumber];
        newPlateNumber[index] = value.toUpperCase();
        setPlateNumber(newPlateNumber);

        // Automatically navigate to the next input field
        if (value && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      } else if (value === '') {
        const newPlateNumber = [...plateNumber];
        newPlateNumber[index] = ''; // Clear the current input
        setPlateNumber(newPlateNumber);

        // Automatically navigate to the previous input field
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formattedPlateNumber = plateNumber.join('');
      // if (ownerName.trim() === '' || formattedPlateNumber.length !== 6) { // Commented out
      if (formattedPlateNumber.length !== 6) {
        setError('Please fill in all fields with correct format.');
      } else {
        setError('');
        // Send data to API
        const vehicleData = {
          // ownerName: ownerName, // Commented out
          plateNumber: formattedPlateNumber
        };
        console.log('Sending data to API:', vehicleData);
        // You can now send this data to your API using fetch or any other method
        onClose();
      }
    };


    return (
      <div>
        <form onSubmit={handleSubmit}>
          {/* <div className="input-field">
            <div className="name" >
            <label htmlFor="ownerName">Name:</label>
            <input
              type="text"
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
            </div>
          </div> */}
          <div className={styles['input-field']}>
            <label htmlFor="plateNumber" className={styles['plate-label']}>License Plate Number:</label>
            <div className={styles['plate-number-container']}>
              {/* Containers for plate number characters */}
              {plateNumber.map((value, index) => (
                <input
                  ref={(el) => (inputRefs.current[index] = el)} // Create ref for each input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>

          <button type="submit">ADD</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    );
  };

  return (
    <div className={styles['popup-container']}>
      <div className={styles.popup}>
        <h2>Add Vehicle</h2>
        <OTPForm onClose={onClose} />
      </div>
    </div>
  );
}

export default AddVehiclePopup;

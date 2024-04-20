import React, { useState, useEffect, useRef } from 'react';
import styles from './AddVehiclePopup.module.css';
import axios from '../axios'; 

function AddVehiclePopup({ onClose, darkMode }) {
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  const numberRegex = /^[0-9]+$/;
  const inputRefs = useRef([]);
  const accessToken = sessionStorage.getItem('accessToken');


  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [darkMode]);

  const startParkingSession = async (accessToken) => {
    try {
      const plateLetters = inputs.slice(0, 3).join(' '); 
      const plateNumbers = inputs.slice(3).join(''); 
  
      const response = await axios.post(
        '/api/GarageStaff/StartParkingSession',
        {
          plateLetters,
          plateNumbers
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log('Parking session started:', response.data);
  
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error('Failed to start parking session. Please try again.');
    }
  };
  
  const handleSubmit = async () => {
    const licensePlateNumber = inputs.join('');
    if (licensePlateNumber.length === 6 || licensePlateNumber.length === 7) {
      try {
        await startParkingSession(accessToken);
        onClose(); 
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("License plate number must be 6 or 7 characters long.");
    }
  };

  const handleInputChange = (index, event) => {
    const newValue = event.target.value;
    const newInputs = [...inputs];
    const currentLength = inputs[index].length;

    if (event.type === 'change') {
      if (newValue === '') {
        newInputs[index] = '';
        setInputs(newInputs);
        if (currentLength === 0 && index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else if (
        (index < 3 && arabicRegex.test(newValue)) ||
        (index >= 3 && numberRegex.test(newValue))
      ) {
        newInputs[index] = newValue;
        setInputs(newInputs);
        if (newValue.length === 1 && index < inputs.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    } else if (event.type === 'keydown' && event.key === 'Backspace' && currentLength === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleAddInputClick = () => {
    if (inputs.length < 7) {
      setInputs([...inputs, ""]);
      setTimeout(() => {
        inputRefs.current[inputs.length].focus();
      }, 0);
    }
  };

  return (
    <div className={`${styles.popupContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.popup}>
        <h2>License Plate Number</h2>
        <div className={styles.plateNumberContainer}>
          {inputs.map((input, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode={index < 3 ? "text" : "numeric"}
              value={input}
              onChange={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => handleInputChange(index, e)}
              maxLength={1}
              className={styles.input}
            />
          ))}
          {inputs.length < 7 && (
            <div className={styles.input} onClick={handleAddInputClick}>
              <div className={styles.addInput}>+</div>
            </div>
          )}
        </div>
        {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
        <button onClick={handleSubmit} className={styles.addButton}>Add</button>
      </div>
    </div>
  );
}

export default AddVehiclePopup;

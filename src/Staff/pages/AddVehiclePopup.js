import React, { useState, useRef, useEffect } from 'react';
import styles from './AddVehiclePopup.module.css'; 

function AddVehiclePopup({ onClose, darkMode }) {
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const [showAddInput, setShowAddInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  const inputRefs = useRef([]);

  
  useEffect(() => {
    
    console.log("Dark mode:", darkMode);
  }, [darkMode]);

  const handleInputChange = (index, event) => {
    const newValue = event.target.value;
    const inputType = index < 3 ? "text" : "numeric";
    if (
      (inputType === "numeric" && newValue.length <= 1 && !isNaN(newValue)) ||
      (inputType === "text" && newValue.length <= 1 && arabicRegex.test(newValue))
    ) {
      const newInputs = [...inputs];
      newInputs[index] = newValue;
      setInputs(newInputs);
      if (newValue.length === 1 && index < inputs.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleClearInput = (index) => {
    const newInputs = [...inputs];
    newInputs[index] = "";
    setInputs(newInputs);
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleAddInputClick = () => {
    setShowAddInput(false);
  };

  const handleNewInputBlur = () => {
    setShowAddInput(true);
  };

  const handleSubmit = () => {
    const licensePlateNumber = inputs.join('');
    if (licensePlateNumber.length === 6 || licensePlateNumber.length === 7) {
      // Call API here with licensePlateNumber
      console.log("Submitting license plate number:", licensePlateNumber);
      onClose();
    } else {
      setErrorMessage("Please fill all fields.");
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
              type={index < 3 ? "text" : "text"}
              inputMode={index < 3 ? "text" : "numeric"}
              value={input}
              onChange={(e) => handleInputChange(index, e)}
              maxLength={index < 3 ? 1 : undefined}
              className={styles.input}
            />
          ))}
          {showAddInput ? (
            <div
              onClick={handleAddInputClick}
              className={styles.input}
            >
               <div className={styles.addInput}>+</div>
            </div>
          ) : (
            <input
              ref={inputRefs.current[inputs.length - 1]}
              type="text"
              className={styles.input}
              onBlur={handleNewInputBlur}
            />
          )}
        </div>
        {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
        <button onClick={handleSubmit} className={styles.addButton}>Add</button>
      </div>
    </div>
  );
}

export default AddVehiclePopup;

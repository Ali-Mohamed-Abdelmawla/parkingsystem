import React from "react";
import styles from "./AddVehiclePopup.module.css";
import cancelIconLight from "../../assets/light-mode/cancel.svg";
import cancelIconDark from "../../assets/Dark-mode/cancel.svg";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";

function AddVehiclePopupPresentational({
  inputs,
  darkMode,
  onClose,
  handleSubmit,
  handleInputChange,
  handleAddInputClick,
  inputRefs,
  loading,
}) {
  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  const numberOrLetterRegex = /^[\u0600-\u06FF\s0-9]+$/;

  return (
    <div className={`${styles.popupContainer} ${darkMode? styles.darkMode : ""}`}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>License Plate Number</h2>
          <img
            src={darkMode? cancelIconDark : cancelIconLight}
            alt="Cancel"
            className={styles.cancelIcon}
            onClick={onClose}
          />
        </div>
        <div className={styles.plateNumberContainer}>
          {inputs.map((input, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode={index < 3? "text" : "none"} // Use "none" for mixed inputMode
              value={input}
              onChange={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => handleInputChange(index, e)}
              maxLength={1}
              className={styles.input}
              pattern={index < 3? arabicRegex.source : numberOrLetterRegex.source} // Apply regex pattern
            />
          ))}
          {inputs.length < 7 && (
            <div className={styles.input} onClick={handleAddInputClick}>
              +
            </div>
          )}
        </div>
        <LoadingButton
          endIcon={<AddIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          onClick={handleSubmit}
          className={`${styles.addButton} custom-loading-button`}
        >
          <span>Add</span>
        </LoadingButton>
      </div>
    </div>
  );
}

export default AddVehiclePopupPresentational;

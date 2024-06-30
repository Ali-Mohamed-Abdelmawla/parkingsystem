import React from "react";
import styles from "./AddVehiclePopup.module.css";
import cancelIconLight from "../../assets/light-mode/cancel.svg";
import cancelIconDark from "../../assets/Dark-mode/cancel.svg";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";

function AddVehiclePopupPresentational({
  register,
  handleSubmit,
  errors,
  darkMode,
  onClose,
  loading,
}) {
  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  const numberRegex = /^[0-9\u0660-\u0669]+$/;

  return (
    <div
      className={`${styles.popupContainer} ${darkMode ? styles.darkMode : ""}`}
    >
      <div className={styles.popup}>
        <div>
          <img
            src={darkMode ? cancelIconDark : cancelIconLight}
            alt="Cancel"
            className={styles.cancelIcon}
            onClick={onClose}
          />
        </div>
        <div className={styles.header}>
          <h2>License Plate Number</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            {...register("letters", {
              required: "Arabic letters are required",
              minLength: {
                value: 2,
                message: "Please enter at least 2 characters.",
              },
              maxLength: {
                value: 3,
                message: "Please keep it to a maximum of 3 characters.",
              },
              pattern: {
                value: arabicRegex,
                message: "Please enter Arabic letters only",
              },
            })}
            maxLength={3}
            className={styles.input}
            placeholder="Arabic Letters"
          />
          {errors.letters && (
            <span className={styles.error}>{errors.letters.message}</span>
          )}
          <input
            type="text"
            {...register("numbers", {
              required: "Numbers are required",
              minLength: {
                value: 3,
                message: "Please enter at least 3 numbers.",
              },
              maxLength: {
                value: 4,
                message: "Please keep it to a maximum of 4 numbers.",
              },
              pattern: {
                value: numberRegex,
                message: "Please enter numbers only",
              },
            })}
            maxLength={4}
            className={styles.input}
            placeholder="Numbers"
          />
          {errors.numbers && (
            <span className={styles.error}>{errors.numbers.message}</span>
          )}
          <LoadingButton
            endIcon={<AddIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            type="submit"
            className={`${styles.addButton} custom-loading-button`}
          >
            <span>Add</span>
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}

export default AddVehiclePopupPresentational;

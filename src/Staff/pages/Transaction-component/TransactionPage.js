import React from 'react';
import styles from './TransactionPage.module.css';
import carIcon from '../../assets/light-mode/carIcon.svg';
import darkCarIcon from '../../assets/Dark-mode/carIcon.svg';
import searchIconLight from '../../assets/light-mode/search.svg';
import searchIconDark from '../../assets/Dark-mode/search.svg';
import cancelIconLight from '../../assets/light-mode/cancel.svg';
import cancelIconDark from '../../assets/Dark-mode/cancel.svg';
import Swal from 'sweetalert2';

function TransactionPage({
  darkMode,
  showConfirmPopup,
  selectedPlateLetters,
  selectedPlateNumbers,
  selectedTransaction,
  inGarageVehicles,
  searchQuery,
  paymentAmount,
  handleConfirmButtonClick,
  handleCloseConfirmPopup,
  handleSearchInputChange,
  setShowConfirmPopup,
  setPaymentAmount
}) {
  const carIconSrc = darkMode ? darkCarIcon : carIcon;
  const searchIconSrc = darkMode ? searchIconDark : searchIconLight;
  const cancelIconSrc = darkMode ? cancelIconDark : cancelIconLight;

  return (
    <div
      className={`${styles.container} ${darkMode ? styles["dark-mode"] : ""}`}
    >
      <div className={styles["search-container"]}>
        <div className={styles["search-bar"]}>
          <img
            src={searchIconSrc}
            alt="Search Icon"
            className={styles["search-icon"]}
          />
          <input
            type="text"
            placeholder="Search vehicle"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className={styles["search-input"]}
          />
        </div>
      </div>
      <div className={styles["C-card-grid"]}>
        {inGarageVehicles && inGarageVehicles.length > 0 ? (
          inGarageVehicles
            .filter((vehicle) => {
              const plateNumber = `${vehicle.PlateLetters} ${vehicle.PlateNumbers}`;
              return plateNumber.toLowerCase().includes(searchQuery.toLowerCase());
            })
            .map((vehicle, index) => {
              if (!vehicle.PlateLetters) {
                return null; // Skip rendering if plateLetters is undefined
              }

              const plateLetters = vehicle.PlateLetters.split("").join(" ");
              const plateNumber = `${plateLetters} ${vehicle.PlateNumbers}`;

              const durationInHours = vehicle.CurSessionDuration_Hours || 0;
              const hours = Math.floor(durationInHours);
              const minutes = Math.round((durationInHours - hours) * 60);

              const duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

              return (
                <div key={index} className={styles["C-card"]}>
                  <div className={styles["C-card-content"]}>
                    <img
                      src={carIconSrc}
                      alt="Car Icon"
                      className={styles["C-icon"]}
                    />
                    <div className={styles["C-Vehicle-info"]}>
                      <span>{plateNumber}</span>
                    </div>
                  </div>
                  <p>
                    Duration: {duration}
                  </p>
                  <div className={styles["C-card-bottom"]}>
                    <h3>
                      Total cost:{" "}
                      {vehicle.CurrentBill ? vehicle.CurrentBill.toFixed(2) : "N/A"} LE
                    </h3>
                    <button
                      className={styles["C-confirm-button"]}
                      onClick={() =>
                        handleConfirmButtonClick(
                          vehicle.PlateLetters,
                          vehicle.PlateNumbers
                        )
                      }
                      disabled={!inGarageVehicles.length}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              );
            })
        ) : (
          <div className={styles["no-data-message"]}>
            No vehicles found in garage.
          </div>
        )}
      </div>

      {showConfirmPopup && selectedTransaction && (
        <div className={styles["confirm-popup"]}>
          <div className={styles["confirm-popup-content"]}>
            <h3>Confirm Payment</h3>
            <p>
              Are you sure you want to confirm payment for vehicle with plate number:{" "}
              {`${selectedTransaction.PlateLetters} ${selectedTransaction.PlateNumbers}`}?
            </p>
            <p>
              Total amount:{" "}
              {selectedTransaction.CurrentBill
                ? selectedTransaction.CurrentBill.toFixed(2)
                : "N/A"}
              LE
            </p>
            <div className={styles["confirm-buttons"]}>
              <button
                className={styles["confirm-button"]}
                onClick={handleCloseConfirmPopup}
              >
                Cancel
                <img src={cancelIconSrc} alt="Cancel Icon" />
              </button>
              <button
                className={[styles["confirm-button"], styles["confirm"]].join(
                  " "
                )}
                onClick={() => {
                  handleCloseConfirmPopup();
                  setPaymentAmount(selectedTransaction.CurrentBill || 0); // Set payment amount before processing
                  // Add SweetAlert code here
                  Swal.fire({
                    title: 'Payment Confirmed!',
                    text: 'Payment has been processed successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  });
                }}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionPage;

import React, { useState, useEffect } from "react";
import styles from "./TransactionPage.module.css";
import carIcon from "../../assets/light-mode/carIcon.svg";
import darkCarIcon from "../../assets/light-mode/carIcon.svg";
import axiosInstance from "../../../auth/axios.js";
import cancelIconLight from "../../assets/light-mode/cancel.svg";
import cancelIconDark from "../../assets/Dark-mode/cancel.svg";
import sweetAlertInstance from "../../../helper/SweetAlert.jsx";
import { useOutletContext } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import Loader from "../../../helper/loading-component/loader.jsx";

function TransactionPage() {
  const [loading, setLoading] = useState(false);
  const { darkMode } = useOutletContext();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedPlateLetters, setSelectedPlateLetters] = useState("");
  const [selectedPlateNumbers, setSelectedPlateNumbers] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [inGarageVehicles, setInGarageVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const accessToken = sessionStorage.getItem("accessToken");

  const arabicNumerals = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
  };

  const convertNumerals = (input) => {
    return input.replace(/\d/g, (d) => arabicNumerals[d]);
  };

  useEffect(() => {
    if (accessToken) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      setLoading(true);
      const getCurrentParkingSessions = axiosInstance.get(
        "/api/GarageStaff/CurrentParkingSessions",
        { headers }
      );
      const getAllReservations = axiosInstance.get(
        "/api/GarageStaff/AllReservation",
        {
          headers,
        }
      );

      Promise.all([getCurrentParkingSessions, getAllReservations])
        .then((responses) => {
          const currentParkingSessionsData = responses[0].data;
          const allReservationsData = responses[1].data;

          const mergedData = [
            ...currentParkingSessionsData,
            ...allReservationsData,
          ];
          console.log("Merged data:", mergedData);
          sessionStorage.setItem("CurrentSessions", mergedData.length);
          setInGarageVehicles(mergedData);
          setLoading(false);
        })
        .catch((errors) => {
          console.error(
            "Error fetching in garage vehicles and reservations:",
            errors
          );
        });
    }
  }, [accessToken]);

  const handleConfirmButtonClick = (plateLetters, plateNumbers) => {
    setSelectedPlateLetters(plateLetters);
    setSelectedPlateNumbers(plateNumbers);
    const transaction = inGarageVehicles.find(
      (vehicle) =>
        vehicle.PlateLetters === plateLetters &&
        vehicle.PlateNumbers === plateNumbers
    );
    setSelectedTransaction(transaction);
    setShowConfirmPopup(true);
  };

  const handleCloseConfirmPopup = async () => {
    if (paymentError) {
      const initialMessage = paymentError;
      setPaymentError("Payment amount needs to at least equal the total fee");

      setTimeout(() => {
        setPaymentError(initialMessage);
      }, 3000);

      return;
    } else if (!paymentAmount) {
      return;
    }
    try {
      const requestData = {
        plateLetters: selectedPlateLetters,
        plateNumbers: selectedPlateNumbers,
        payment: parseFloat(paymentAmount),
        paymentType: "Cash",
      };

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      setLoading(true);
      const response = await axiosInstance.delete(
        "/api/GarageStaff/EndParkingSession",
        {
          data: requestData,
          headers,
        }
      );

      console.log("Parking session ended successfully");

      // Display success alert
      sweetAlertInstance
        .fire({
          title: "Payment Successful!",
          text: "Payment has been processed successfully.",
          icon: "success",
        })
        .then(() => {
          setShowConfirmPopup(false);
          window.location.reload();
        });

    } catch (error) {
      console.error("Error ending parking session:", error);
      setShowConfirmPopup(false);
      // Display error alert
      sweetAlertInstance
        .fire({
          title: "Payment Failed!",
          text: "Failed to process payment. Please try again.",
          icon: "error",
        })
        .then(() => {
          setLoading(false);
        });
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePaymentAmountChange = (event) => {
    const value = event.target.value;
    setPaymentAmount(value);
    if (parseFloat(value) < selectedTransaction.CurrentBill) {
      setPaymentError(
        `Payment amount must be at least ${selectedTransaction.CurrentBill.toFixed(
          2
        )} LE`
      );
    } else {
      setPaymentError("");
    }
  };

  const carIconSrc = darkMode ? darkCarIcon : carIcon;
  const cancelIconSrc = darkMode ? cancelIconDark : cancelIconLight;

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: darkMode ? "#231f20" : "#f2f1f1",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${darkMode ? styles["dark-mode"] : ""}`}
    >
      <div className={styles["search-container"]}>
        <div className={styles["search-bar"]}>
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
        {inGarageVehicles
          .filter((vehicle) => {
            const plateNumber = `${vehicle?.PlateLetters} ${vehicle.PlateNumbers}`;
            return plateNumber
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          })
          .map((vehicle, index) => {
            if (!vehicle.PlateLetters) {
              return null; // Skip rendering if plateLetters is undefined
            }

            const plateLetters = vehicle.PlateLetters.split("").join(" ");
            const plateNumber = `${plateLetters} ${convertNumerals(
              vehicle.PlateNumbers
            )}`;

            const durationInHours = vehicle.CurSessionDuration_Hours || 0;
            const hours = Math.floor(durationInHours);
            const minutes = Math.round((durationInHours - hours) * 60);

            const duration =
              hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

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
                <span>
                  <strong>Duration:</strong> {duration}
                </span>
                <span>
                  <strong>Total cost: </strong>
                  {vehicle.CurrentBill
                    ? vehicle.CurrentBill.toFixed(2)
                    : "N/A"}{" "}
                  LE
                </span>
                <div className={styles["C-card-bottom"]}>
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
          })}
      </div>
      {showConfirmPopup && selectedTransaction && (
        <div className={styles["C-popup"]}>
          <div className={styles["C-popup-content"]}>
            <div>
              <img
                src={cancelIconSrc}
                alt="Cancel Icon"
                className={styles["cancel-icon"]}
                onClick={() => setShowConfirmPopup(false)}
              />
            </div>
            <div className={styles["C-popup-labels"]}>
              <span>
                <strong>
                  Plate Number: {selectedPlateLetters.split("").join(" ")}{" "}
                </strong>
                {convertNumerals(selectedPlateNumbers)}
              </span>

              <span>
                <strong>Entry Time: </strong>

                {new Date(selectedTransaction.StartDate).toLocaleString()}
              </span>
              <span>
                <strong>Exit Time: </strong>
                {new Date().toLocaleString()}
              </span>
              <span>
                <strong>Total Fee: </strong>
                {selectedTransaction.CurrentBill.toFixed(2)} LE
              </span>
              <div className={styles["C-payment-options"]}>
                <label
                  htmlFor="paymentAmount"
                  className={styles["payment-label"]}
                >
                  Payment Amount:
                </label>
                <br></br>
                <input
                  type="number"
                  id="paymentAmount"
                  value={paymentAmount}
                  onChange={handlePaymentAmountChange}
                  className={styles["payment-input"]}
                  style={{ margin: "5px" }}
                />
                <br></br>
                {paymentError && (
                  <span className={styles["error-message"]}>
                    {paymentError}
                  </span>
                )}
              </div>
            </div>

            <LoadingButton
              endIcon={<CheckIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              onClick={handleCloseConfirmPopup}
              className={styles["C-popconfirm"]} // Added custom class here
            >
              <span>Confirm</span>
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionPage;

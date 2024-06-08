import React, { useState, useEffect } from "react";
import styles from "./Transaction-component/TransactionPage.module.css";
import carIcon from "../assets/light-mode/carIcon.svg";
import darkCarIcon from "../assets/light-mode/carIcon.svg";
import axiosInstance from "../../auth/axios";
import searchIconLight from "../assets/light-mode/search.svg";
import searchIconDark from "../assets/Dark-mode/search.svg";

function TransactionPage({ darkMode }) {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedPlateLetters, setSelectedPlateLetters] = useState("");
  const [selectedPlateNumbers, setSelectedPlateNumbers] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [inGarageVehicles, setInGarageVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const getCurrentParkingSessions = axiosInstance.get(
        "/api/GarageStaff/CurrentParkingSessions",
        { headers }
      );
      const getAllReservations = axiosInstance.get("/api/GarageStaff/AllReservation", {
        headers,
      });

      Promise.all([getCurrentParkingSessions, getAllReservations])
        .then((responses) => {
          const currentParkingSessionsData = responses[0].data;
          const allReservationsData = responses[1].data;

          const mergedData = [
            ...currentParkingSessionsData,
            ...allReservationsData,
          ];
          console.log("Merged data:", mergedData);
          sessionStorage.setItem("CurrentSessions", mergedData.length-1);  // 123123123123123//
          setInGarageVehicles(mergedData);
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

      const response = await axiosInstance.delete(
        "/api/GarageStaff/EndParkingSession",
        {
          data: requestData,
          headers,
        }
      );

      console.log("Parking session ended successfully");

      setTimeout(() => {
        setShowConfirmPopup(false);
      }, 1000);
    } catch (error) {
      console.error("Error ending parking session:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const carIconSrc = darkMode ? darkCarIcon : carIcon;
  const searchIconSrc = darkMode ? searchIconDark : searchIconLight;

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
        {inGarageVehicles.map((vehicle, index) => {
          if (!vehicle.PlateLetters) {
            return null; // Skip rendering if plateLetters is undefined
          }

          const plateLetters = vehicle.PlateLetters.split("").join(" ");
          const plateNumber = `${plateLetters} ${vehicle.PlateNumbers}`;

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
                Duration:{" "}
                {vehicle.CurSessionDuration_Hours
                  ? vehicle.CurSessionDuration_Hours.toFixed(2)
                  : "N/A"}
              </p>
              <div className={styles["C-card-bottom"]}>
                <h3>
                  Total cost:{" "}
                  {vehicle.CurrentBill ? vehicle.CurrentBill.toFixed(2) : "N/A"}{" "}
                  LE
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
        })}
      </div>
      {showConfirmPopup && selectedTransaction && (
        <div className={styles["C-popup"]}>
          <div className={styles["C-popup-content"]}>
            <p>
              Plate Number: {`${selectedPlateLetters}${selectedPlateNumbers}`}
            </p>
            <p>
              Entry Time:{" "}
              {new Date(selectedTransaction.StartDate).toLocaleString()}
            </p>
            <p>Exit Time: {new Date().toLocaleString()}</p>
            <p>Total Fee: {selectedTransaction.CurrentBill.toFixed(2)} LE</p>
            <div className={styles["C-payment-options"]}>
              <label
                htmlFor="paymentAmount"
                className={styles["payment-label"]}
              >
                Payment Amount:
              </label>
              <input
                type="number"
                id="paymentAmount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className={styles["payment-input"]}
              />
            </div>
            <button
              className={styles["C-popconfirm"]}
              onClick={handleCloseConfirmPopup}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionPage;

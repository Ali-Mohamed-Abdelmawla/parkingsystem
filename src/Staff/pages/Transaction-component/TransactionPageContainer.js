import React, { useState, useEffect } from "react";
import axios from "../../axios";
import TransactionPage from "./TransactionPage.js";
import Swal from 'sweetalert2';

const TransactionPageContainer = ({ darkMode }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedPlateLetters, setSelectedPlateLetters] = useState("");
  const [selectedPlateNumbers, setSelectedPlateNumbers] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [inGarageVehicles, setInGarageVehicles] = useState([]); // Initialize with empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const getCurrentParkingSessions = axios.get(
        "/api/GarageStaff/CurrentParkingSessions",
        { headers }
      );
      const getAllReservations = axios.get("/api/GarageStaff/AllReservation", {
        headers,
      });

      Promise.all([getCurrentParkingSessions, getAllReservations])
        .then((responses) => {
          const currentParkingSessionsData = responses[0].data;
          const allReservationsData = responses[1].data;

          const mergedData = [...currentParkingSessionsData, ...allReservationsData];
          console.log("Merged data:", mergedData);
          setInGarageVehicles(mergedData);
          sessionStorage.setItem("CurrentSessions", mergedData.length);
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

      const response = await axios.delete(
        "/api/GarageStaff/EndParkingSession",
        {
          data: requestData,
          headers,
        }
      );

      console.log("Parking session ended successfully");

      setShowConfirmPopup(false);

      // Display success alert
      Swal.fire({
        title: "Payment Successful!",
        text: "Payment has been processed successfully.",
        icon: "success",
        customClass: {
          container: 'custom-swal-container', // Add custom class for positioning
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button'
        },
        backdrop: false,
        focusConfirm: false,
        allowOutsideClick: false
      });

    } catch (error) {
      console.error("Error ending parking session:", error);
      setShowConfirmPopup(false);

      // Display error alert
      Swal.fire({
        title: "Payment Failed!",
        text: "Failed to process payment. Please try again.",
        icon: "error",
        customClass: {
          container: 'custom-swal-container', // Add custom class for positioning
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button'
        },
        backdrop: false,
        focusConfirm: false,
        allowOutsideClick: false
      });
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <TransactionPage
    darkMode={darkMode}
    showConfirmPopup={showConfirmPopup}
    setSelectedPlateLetters={setSelectedPlateLetters}
    setSelectedPlateNumbers={setSelectedPlateNumbers}
    setSelectedTransaction={setSelectedTransaction}
    inGarageVehicles={inGarageVehicles}
    searchQuery={searchQuery}
    paymentAmount={paymentAmount}
    handleConfirmButtonClick={handleConfirmButtonClick}
    handleCloseConfirmPopup={handleCloseConfirmPopup}
    handleSearchInputChange={handleSearchInputChange}
    setShowConfirmPopup={setShowConfirmPopup}
    setPaymentAmount={setPaymentAmount}/>
    );
  };
  
  export default TransactionPageContainer;
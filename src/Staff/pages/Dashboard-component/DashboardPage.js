import React, { useState, useEffect } from "react";
import styles from "./DashboardPage.module.css";
import groupiconLight from "../../assets/light-mode/groupicon.svg";
import updateiconLight from "../../assets/light-mode/updateIcon.svg";
import groupiconDark from "../../assets/Dark-mode/groupicon.svg";
import updateiconDark from "../../assets/Dark-mode/updateIcon.svg";
import axiosInstance from "../../../auth/axios.js";
import CameraSwitcher from "../../Camera/camera.js";
import { useOutletContext } from "react-router-dom";
import Loader from "../../../helper/loading-component/loader.jsx";
import sweetAlertInstance from "../../../helper/SweetAlert.jsx";
const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const { darkMode } = useOutletContext();
  console.log(darkMode);
  const [availableSpaces, setAvailableSpaces] = useState(0);
  const [reservationsCount, setReservationsCount] = useState(0);

  const accessToken = sessionStorage.getItem("accessToken");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const getCurrentParkingSessions = async() => 
    setLoading(true)
    axiosInstance
    .get("/api/GarageStaff/CurrentParkingSessions", { headers })
    .then((response) => {
      console.log(
        "Current Parking Sessions without reservations:",
        response.data.length
      );
      const currentSessionsCount = response.data.length;
      axiosInstance
        .get("/api/GarageStaff/AllReservation", {
          headers,
        })
        .then((response) => {
          let withinHalfHourCount = 0;
          const halfHourInMilliseconds = 30 * 60 * 1000;
          const allReservations = response.data;
          allReservations.forEach((reservation) => {
            if (reservation.ReservationDate) {
              const reservationDate = new Date(reservation.ReservationDate);
              const now = new Date();

              // Calculate the difference in time
              const timeDifference = Math.abs(now - reservationDate);

              // Check if the difference is within 30 minutes (1800000 milliseconds)
              if (timeDifference <= halfHourInMilliseconds) {
                withinHalfHourCount++;
              }
            }
          });
          console.log(
            "Resrvations Within half hour count:",
            withinHalfHourCount
          );
          setReservationsCount(withinHalfHourCount);
          console.log(
            "Current Parking Sessions with reservations:",
            currentSessionsCount + withinHalfHourCount
          );

          sessionStorage.setItem(
            "CurrentSessions",
            currentSessionsCount + withinHalfHourCount
          );
          setLoading(false)

        })
        .catch((error) => {
          console.error("Error fetching all reservations:", error);
          sweetAlertInstance.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch data",
          });
        });
    });

  useEffect(() => {

    if (reservationsCount > 0) {

      sweetAlertInstance.fire({
        title: "",
        text: `${reservationsCount} ${
          reservationsCount === 1 ? "reservation" : "reservations"
        } currently in the garage!`,
        icon: "info",
        toast: true,
        position: "top-end",
      });
    }
  }, [reservationsCount]);

  const fetchAvailableSpaces = async () => {
    try {
      console.log("Request Headers:", headers);
      const response = await axiosInstance.get(
        "/api/GarageStaff/AvailableSpaces",
        { headers }
      );
      console.log("Available spaces:", response.data);
      console.log("Reservations count:", reservationsCount);
      console.log("Available spaces:", response.data.AvailableSpaces);

      setAvailableSpaces(response.data.AvailableSpaces);
    } catch (error) {
      if (error.response) {
        console.error("Error status:", error.response.status);
        if (error.response.status === 401) {
          console.error("Unauthorized: Access token may be invalid or expired");

        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  useEffect(() => {
    getCurrentParkingSessions();
    fetchAvailableSpaces();
    const intervalId = setInterval(fetchAvailableSpaces, 50000);
    return () => clearInterval(intervalId);
  }, []);

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
      className={`${styles["dashboard-container"]} ${
        darkMode ? styles["dark-mode"] : ""
      }`}
    >
      <h2 className={styles["dashboard-title"]}>Real-time Parking Data</h2>
      <div className={styles["card-container"]}>
        {/* First Card */}
        <div className={styles.card}>
          <div className={styles["card-content"]}>
            <div>
              <span>Total Spaces</span>
              <img
                src={darkMode ? groupiconDark : groupiconLight}
                alt="Icon"
                className={styles.icon}
              />
              <p className={styles.number}>
                {parseInt(sessionStorage.getItem("CurrentSessions")) +
                  parseInt(availableSpaces)}
              </p>
            </div>
          </div>
        </div>
        {/* Second Card */}
        <div className={styles.card}>
          <div className={styles["card-content"]}>
            <div>
              <span>Occupied Spaces</span>
              <img
                src={darkMode ? updateiconDark : updateiconLight}
                alt="Icon"
                className={styles.icon}
              />
              <p className={styles.number}>
                {sessionStorage.getItem("CurrentSessions")}
              </p>
            </div>
          </div>
        </div>
        {/* Third Card */}
        <div className={styles.card}>
          <div className={styles["card-content"]}>
            <div>
              <span>Available Spaces</span>
              <img
                src={darkMode ? updateiconDark : updateiconLight}
                alt="Icon"
                className={styles.icon}
              />
              <p className={styles.number} style={{ color: "#ED7F16" }}>
                {availableSpaces}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Add CameraSwitcher component here */}
      <div
        className={`${styles.CameraSwitcherContainer} ${
          darkMode ? styles["dark-mode"] : ""
        }`}
      >
        <CameraSwitcher darkMode={darkMode} />
      </div>
    </div>
  );
};

export default DashboardPage;

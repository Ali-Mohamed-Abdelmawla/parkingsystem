import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axiosInstance from "../../auth/axios";
import styles from "./camera.module.css";
import Swal from "sweetalert2";
import Switch from "@mui/material/Switch";
import TransactionPage from "../../Staff/pages/Transaction-component/TransactionPage";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import lightModeCancelIcon from "../assets/light-mode/cancel.svg";
import darkModeCancelIcon from "../assets/Dark-mode/cancel.svg";

function CameraSwitcher({ darkMode }) {
  const accessToken = sessionStorage.getItem("accessToken");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const webcamRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [recognizedPlate, setRecognizedPlate] = useState("");
  const [arabicLetters, setArabicLetters] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [captureArabic, setCaptureArabic] = useState(false);
  const [isEntry, setIsEntry] = useState(true); 
  const [plateDetails, setPlateDetails] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const switchCamera = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    const formData = new FormData();
    formData.append("image", blob);

    axiosInstance
      .post(
        "https://api.imgbb.com/1/upload?key=b12524ab4b955c0548dbc0dc9c669d48",
        formData
      )
      .then((response) => {
        axiosInstance
          .post(
            "https://octopus-intent-rapidly.ngrok-free.app/ODLink",
            { image_url: response.data.data.url },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => {
            let plateNumber = "";
            response.data[0]["Characters result"].forEach((element) => {
              plateNumber += element.Character;
            });

            if (!captureArabic) {
              plateNumber = plateNumber.replace(/[\u0600-\u06FF]/g, "");
            }

            const arabicLetters = plateNumber.match(/[\u0600-\u06FF]/g) || [];
            const numbers = plateNumber.match(/\d/g) || [];
            setRecognizedPlate(plateNumber);
            setArabicLetters(arabicLetters);
            setNumbers(numbers);
            setShowConfirmation(true);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error processing the image. Please try again.",
            });
          });
      })
      .catch((error) => {
        console.error("Error uploading the image:", error);
      });
  };

  const confirmPlate = () => {
    if (isEntry) {
      // Start parking session logic for entry
      axiosInstance
        .post(
          "/api/GarageStaff/StartParkingSession",
          {
            PlateLetters: recognizedPlate.replace(/\d/g, ""),
            PlateNumbers: recognizedPlate.replace(/[^\d]/g, ""),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Parking session started successfully.",
          });
          setShowConfirmation(false);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error starting parking session. Please try again.",
          });
        });
    } else {
      // Fetch vehicle details for exit
      axiosInstance
        .get("/api/GarageStaff/CurrentParkingSessions", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const currentSessions = response.data;
          const vehicle = currentSessions.find(
            (v) =>
              v.PlateLetters === recognizedPlate.replace(/\d/g, "") &&
              v.PlateNumbers === recognizedPlate.replace(/[^\d]/g, "")
          );
          if (vehicle) {
            setSelectedTransaction(vehicle);
            setShowConfirmPopup(true);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Vehicle not found in current sessions.",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching current parking sessions:", error);
        });
      setShowConfirmation(false);
    }
  };

  const handleCloseConfirmPopup = async () => {
    setLoading(true);
    const requestData = {
      PlateLetters: selectedTransaction.PlateLetters,
      PlateNumbers: selectedTransaction.PlateNumbers,
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axiosInstance.delete(
        "/api/GarageStaff/EndParkingSession",
        {
          data: requestData,
          headers,
        }
      );

      console.log("Parking session ended successfully");
      // Display success alert
      Swal.fire({
        title: "Payment Successful!",
        text: "Payment has been processed successfully.",
        icon: "success",
        backdrop: false,
        focusConfirm: false,
        allowOutsideClick: false,
      }).then(() => {
        setShowConfirmPopup(false);
        setLoading(false);
        window.location.reload();
      });
    } catch (error) {
      console.error("Error ending parking session:", error);
      setShowConfirmPopup(false);
      // Display error alert
      Swal.fire({
        title: "Payment Failed!",
        text: "Failed to process payment. Please try again.",
        icon: "error",
        backdrop: false,
        focusConfirm: false,
        allowOutsideClick: false,
      }).then(() => {
        setLoading(false);
      });
    }
  };

  const getMediaDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error("Error enumerating media devices:", error);
    }
  };

  useEffect(() => {
    getMediaDevices();
  }, []);

  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  const convertToArabicNumerals = (numbers) => {
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
    return numbers.replace(/\d/g, (d) => arabicNumerals[d]);
  };

  return (
    <div className={`${styles.Container} ${darkMode ? styles.DarkMode : ""}`}>
      <div className={styles.Camera}>
        <div className={styles.ToggleContainer}>
          <span>Exit</span>
          <Switch
            checked={isEntry}
            onChange={() => setIsEntry(!isEntry)}
            color="primary"
          />
          <span>Entry</span>
        </div>
        <select
          className={`${styles.Select} ${
            darkMode ? styles.DarkModeSelect : ""
          }`}
          onChange={(e) => switchCamera(e.target.value)}
          value={selectedDevice}
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${devices.indexOf(device) + 1}`}
            </option>
          ))}
        </select>
        <Webcam
          audio={false}
          videoConstraints={{
            deviceId: selectedDevice,
            width: 1920,
            height: 1080,
          }}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          style={{ width: "100%", height: "auto" }}
        />
        {showConfirmation && (
          <div className={styles.RecognizedPlate}>
            <p>Recognized Plate Number:</p>
            <input
              defaultValue={recognizedPlate}
              onChange={(e) => setRecognizedPlate(e.target.value)}
              type="text"
            />
            <div>
              <button onClick={confirmPlate}>Confirm</button>
            </div>
          </div>
        )}
        <button
          className={`${styles.Button} ${
            darkMode ? styles.DarkModeButton : ""
          }`}
          onClick={capturePhoto}
        >
          Capture Photo
        </button>
      </div>
      {plateDetails && (
        <TransactionPage
          plateLetters={plateDetails.PlateLetters}
          plateNumbers={plateDetails.PlateNumbers}
          onClose={() => setPlateDetails(null)}
        />
      )}
      {showConfirmPopup && selectedTransaction && (
        <div className={styles.CPopup}>
          <div className={styles.CPopupContent}>
            <div>
              <img
                src={darkMode ? darkModeCancelIcon : lightModeCancelIcon}
                alt="Cancel Icon"
                className={styles.CancelIcon}
                onClick={() => setShowConfirmPopup(false)}
              />
            </div>
            <div className={styles.CPopupLabels}>
              <span>
                <strong>
                  Plate Number: {recognizedPlate.replace(/\d/g, "")}{" "}
                </strong>
                {convertToArabicNumerals(recognizedPlate.replace(/[^\d]/g, ""))}
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
              <div className={styles.CPaymentOptions}>
                <label
                  htmlFor="paymentAmount"
                  className={styles.PaymentLabel}
                >
                  Payment Amount:
                </label>
                <br></br>
                <input
                  type="number"
                  id="paymentAmount"
                  value={paymentAmount}
                  onChange={handlePaymentAmountChange}
                  className={styles.PaymentInput}
                  style={{ margin: "5px" }}
                />
                <br></br>
                {paymentError && (
                  <span className={styles.ErrorMessage}>
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
              className={styles.CPopconfirm}
            >
              <span>Confirm</span>
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraSwitcher;

function dataURItoBlob(dataURI) {
  let byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);
  let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}


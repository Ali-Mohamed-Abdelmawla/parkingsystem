import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axiosInstance from "../../auth/axios";
import styles from "./camera.module.css";
import sweetAlertInstance from "../../helper/SweetAlert";
import Switch from "@mui/material/Switch";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import lightModeCancelIcon from "../assets/light-mode/cancel.svg";
import darkModeCancelIcon from "../assets/Dark-mode/cancel.svg";
import PhotoCameraTwoToneIcon from "@mui/icons-material/PhotoCameraTwoTone";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import cancelIconLight from "../assets/light-mode/cancel.svg";
import cancelIconDark from "../assets/Dark-mode/cancel.svg";
import { IconButton } from "@mui/material";
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";

function CameraSwitcher({ darkMode }) {
  const accessToken = sessionStorage.getItem("accessToken");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const webcamRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [recognizedPlate, setRecognizedPlate] = useState("");
  const [arabicLetters, setArabicLetters] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEntry, setIsEntry] = useState(true);

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Function to switch camera based on deviceId
  const switchCamera = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  const numberRegex = /^[0-9\u0660-\u0669]+$/;


  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    const formData = new FormData();
    formData.append("image", blob);

    setLoading(true);

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
            setLoading(false);
            // if response.data is an empty array

            if (response.data.length === 0) {
              sweetAlertInstance.fire({
                icon: "error",
                title: "Error",
                text: "No plate detected. Please try again.",
              });
              return;
            }

            let plateNumber = "";
            console.log(response.data);
            response.data[0]["Characters result"].forEach((element) => {
              plateNumber += element.Character;
            });

            const letters = plateNumber.replace(/[\u0660-\u0669]+/g, "");
            const reversedLetters = letters.split("").reverse().join("");

            const extractedNumbers =
              plateNumber.match(/[\u0660-\u0669]+/g) || [];
            const numbers = extractedNumbers.join("");

            setRecognizedPlate(plateNumber);
            setArabicLetters(reversedLetters);

            setNumbers(numbers);
            setValue("letters", reversedLetters);
            setValue("numbers", numbers);
            setShowConfirmation(true);
          })
          .catch((error) => {
            setLoading(false);
            sweetAlertInstance.fire({
              icon: "error",
              title: "Error",
              text: "Error while processing the image. Please try again.",
            });
          });
      })
      .catch((error) => {
        setLoading(false);
        sweetAlertInstance.fire({
          icon: "error",
          title: "Error",
          text: "Error while uploading the image. Please try again.",
        });
        console.error("Error uploading the image:", error);
      });
  };
  

  useEffect(() => {
    console.log(recognizedPlate);
    console.log(arabicLetters);
    console.log(numbers);
  }, [numbers]);

  const confirmPlate = (data) => {

    if (isEntry) {
      console.log(data);
      // Start parking session logic for entry
      setLoading(true);
      axiosInstance
        .post(
          "/api/GarageStaff/StartParkingSession",
          {
            PlateLetters: data.letters,
            PlateNumbers: convertNumerals(data.numbers),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          sweetAlertInstance.fire({
            icon: "success",
            title: "Success",
            text: "Parking session started successfully.",
          });

          if (response.data.Message.includes("Session already exists")) {
            sweetAlertInstance.fire({
              title: "Error!",
              text: "Car plate was registered before!",
              icon: "error",
            });
            return;
          }

          setRecognizedPlate(recognizedPlate);
          setShowConfirmation(false);

        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          sweetAlertInstance.fire({
            icon: "error",
            title: "Error",
            text: "Error starting parking session. Please try again.",
          });
        });
        setShowConfirmation(false); // دي كانت تحت ال .then بس المفروض تبقي بعد ال then و catch

    } else {
      // Fetch vehicle details for exit
      setLoading(true);
      axiosInstance
        .get("/api/GarageStaff/CurrentParkingSessions", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setLoading(false);
          const currentSessions = response.data;
          console.log(currentSessions);
          console.log("before Search", arabicLetters);
          console.log("before Search", numbers);
          console.log("before Search", convertNumerals(numbers));

          const vehicle = currentSessions.find((v) => {
            const trimmedPlateLetters = v.PlateLetters.trim();
            const trimmedPlateNumbers = v.PlateNumbers.trim();
            const trimmedArabicLetters = data.letters.trim();
            const trimmedConvertedNumbers = convertNumerals(data.numbers).trim();

            console.log(
              "Comparing PlateLetters:",
              trimmedPlateLetters,
              "with",
              trimmedArabicLetters
            );
            console.log(
              "Comparing PlateLetters lengths:",
              trimmedPlateLetters.length,
              trimmedArabicLetters.length
            );

            console.log(
              "Comparing PlateNumbers:",
              trimmedPlateNumbers,
              "with",
              trimmedConvertedNumbers
            );
            console.log(
              "Comparing PlateNumbers lengths:",
              trimmedPlateNumbers.length,
              trimmedConvertedNumbers.length
            );

            return (
              trimmedPlateLetters === trimmedArabicLetters &&
              trimmedPlateNumbers === trimmedConvertedNumbers
            );
          });

          if (vehicle) {
            console.log(vehicle);
            setSelectedTransaction(vehicle);
            setShowConfirmation(false);
            setShowConfirmPopup(true);
          } else {
            console.log(vehicle);

            sweetAlertInstance.fire({
              icon: "error",
              title: "Error",
              text: "Vehicle not found in current sessions.",
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching current parking sessions:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error fetching current parking sessions. Please try again.",
          });
        });
    }
  };

  // Function to handle closing of confirmation popup
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
        plateLetters: arabicLetters,
        plateNumbers: convertNumerals(numbers),
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
      setShowConfirmPopup(false);
      setLoading(false);

      // Display success alert
      sweetAlertInstance
        .fire({
          title: "Payment Successful!",
          text: "Payment has been processed successfully.",
          icon: "success",
        })
        .then(() => {
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

  // Function to fetch available media devices
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

  return (
    <div className={`${styles.Container} ${darkMode ? styles.DarkMode : ""}`}>
      <div className={styles.Camera}>
        <div className={styles.ToggleContainer}>
          <span>Exit</span>
          <Switch
            checked={isEntry}
            onChange={() => 
              setIsEntry(!isEntry)}
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
        {showConfirmation && recognizedPlate && (
          <div className={styles.RecognizedPlate}>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => setShowConfirmation(false)}
            >
              <CancelPresentationTwoToneIcon />
            </IconButton>

            <div className={styles.confirmationBody}>
              <h3>Recognized Plate Number</h3>
              <br></br>
              <input
                defaultValue={arabicLetters}
                maxLength={10}

                onChange={(e) => setArabicLetters(e.target.value)}
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
              />
              {errors.letters && (
                <span className={styles.addVehicleerror}>{errors.letters.message}</span>
              )}
              <input
                defaultValue={numbers}
                style={{ direction: "ltr" }}
                onChange={(e) => setNumbers(convertNumerals(e.target.value))}
                maxLength={10}
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
              />
              {errors.numbers && (
                <span className={styles.addVehicleerror}>{errors.numbers.message}</span>
              )}
              <LoadingButton
                endIcon={<CheckTwoToneIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                onClick={handleSubmit(confirmPlate)}
                className={`${styles.Button} ${
                  darkMode ? styles.DarkModeButton : ""
                } custom-loading-button`}
              >
                <span> Confirm</span>
              </LoadingButton>

            </div>
          </div>
        )}
        {!showConfirmation && (
          <LoadingButton
            endIcon={<PhotoCameraTwoToneIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={capturePhoto}
            className={`${styles.captureButton} ${
              darkMode ? styles.DarkModecaptureButton : ""
            } custom-loading-button`}
          >
            <span> Capture Photo</span>
          </LoadingButton>
        )}
      </div>

      {showConfirmPopup && selectedTransaction && (
        <div className={styles["C-popup"]}>
          <div className={styles["C-popup-content"]}>
            <div onClick={() => setShowConfirmPopup(false)}>
              <img
                src={darkMode ? darkModeCancelIcon : lightModeCancelIcon}
                alt="Cancel Icon"
                className={styles["cancel-icon"]}
              />
            </div>
            <div className={styles["C-popup-labels"]}>
              <span>
                <strong>Plate Number: </strong>
                {`${arabicLetters}   ${convertNumerals(numbers)}`}
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
                  <span
                    className={styles["error-message"]}
                    style={{ color: "#b32f2f" }}
                  >
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

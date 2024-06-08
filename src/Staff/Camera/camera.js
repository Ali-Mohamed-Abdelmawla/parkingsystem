import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axiosInstance from "../../auth/axios";
import styles from "./camera.module.css";
import Swal from "sweetalert2";

function CameraSwitcher({ darkMode }) {
  const accessToken = sessionStorage.getItem("accessToken");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const webcamRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [recognizedPlate, setRecognizedPlate] = useState("");
  const [arabicLetters, setArabicLetters] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Function to handle switching cameras
  const switchCamera = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  // Function to capture photo from webcam and upload to ImgBB
  const capturePhoto = () => {
    // Capture the image from the webcam
    const imageSrc = webcamRef.current.getScreenshot();
    let recognizedText = "";
    // Convert the Base64 image to a Blob
    const blob = dataURItoBlob(imageSrc);

    // Create a FormData object
    const formData = new FormData();
    formData.append("image", blob);

    // Upload the image to ImgBB
    axiosInstance
      .post(
        "https://api.imgbb.com/1/upload?key=b12524ab4b955c0548dbc0dc9c669d48",
        formData
      )
      .then((response) => {
        console.log("Image uploaded successfully:", response.data.data.url);
        // request to the database
        axiosInstance
          .post(
            // "https://mohammed321735-rakna-api-gdkgivmppq-ew.a.run.app/ODLink"
            "https://octopus-intent-rapidly.ngrok-free.app/ODLink",
            {
              image_url: response.data.data.url,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            let plateNumber = "";
            response.data[0]["Characters result"].forEach((element) => {
              plateNumber += element.Character;
            });
            // Extract Arabic letters and numbers
            const arabicLetters = plateNumber.match(/[\u0600-\u06FF]/g) || [];
            const numbers = plateNumber.match(/\d/g) || [];
            console.log("Recognized plate:", plateNumber);
            setRecognizedPlate(plateNumber);
            setArabicLetters(arabicLetters);
            setNumbers(numbers);
            setShowConfirmation(true);
          })
          .catch((error) => {
            console.error("Error processing the image:", error);
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

  // Function to confirm the recognized plate and start parking session
  const confirmPlate = () => {

    console.log("Recognized plate before starting session:", recognizedPlate);


    const arabicLetters = recognizedPlate.match(/[\u0621-\u064A]/g) || [];
const arabicNumbers = recognizedPlate.match(/[\u0660-\u0669]/g) || [];
    // Start the parking session
      axiosInstance
        .post(
          "/api/GarageStaff/StartParkingSession",
          {
            PlateLetters: arabicLetters.join(""),
            PlateNumbers: arabicNumbers.join(""),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Parking session started successfully:", response.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Parking session started successfully.",
          });
          // Additional logic after starting the parking session
        })
        .catch((error) => {
          console.error("Error starting parking session:", error);
          // Handle error
        })
        .finally(() => {
          setShowConfirmation(false); // Hide the confirmation dialog
        });

  };

  // Function to start the parking session
  // const startParkingSession = () => {
  //   // Send a POST request to start parking session

  // };

  // Function to fetch list of available media devices
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

  // Effect to fetch media devices on component mount
  useEffect(() => {
    getMediaDevices();
  }, []);

  return (
    <div className={`${styles.Container} ${darkMode ? styles.DarkMode : ""}`}>
      <div className={styles.Camera}>
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
            width: 1920, // Set to the maximum width your webcam supports
            height: 1080, // Set to the maximum height your webcam supports
          }}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={1} // Set to 1 for highest quality
          style={{ width: "100%", height: "auto" }}
        />
        {showConfirmation && (
          <div className={styles.RecognizedPlate}>
            <p>Recognized Plate Number:</p>
            {/* <p>Arabic Letters: {arabicLetters.join("")}</p>
            <p>Numbers: {numbers.join("")}</p> */}
            <input defaultValue={recognizedPlate} onChange={(e) => setRecognizedPlate(e.target.value)} type="text" />
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
    </div>
  );
}

export default CameraSwitcher;

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

//============================================================================================================

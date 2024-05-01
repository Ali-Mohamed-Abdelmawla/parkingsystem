import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import styles from "./camera.module.css";

function CameraSwitcher({ darkMode }) {
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
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=b12524ab4b955c0548dbc0dc9c669d48",
        formData
      )
      .then((response) => {
        console.log("Image uploaded successfully:", response.data.data.url);
        // request to the database
        axios
          .post(
            "https://mohammed321735-rakna-api-gdkgivmppq-ew.a.run.app/ODLink",
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
            setRecognizedPlate(plateNumber);
            setArabicLetters(arabicLetters);
            setNumbers(numbers);
            setShowConfirmation(true);
          })
          .catch((error) => {
            console.error("Error processing the image:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading the image:", error);
      });
  };

  // Function to confirm the recognized plate and start parking session
  const confirmPlate = () => {
    // Check if the recognized plate has 6 or 7 characters
    if (numbers.length === 6 || numbers.length === 7) {
      // Start the parking session
      startParkingSession();
    } else {
      // Plate number does not have expected length, display an error message or handle it accordingly
      console.error("Error: Recognized plate number does not have the expected length.");
      // You can display an error message to the user or handle the situation in any other way
    }
  };

  // Function to start the parking session
  const startParkingSession = () => {
    // Send a POST request to start parking session
    axios
      .post(
        'https://raknaapi.azurewebsites.net/api/GarageStaff/StartParkingSession',
        {
          PlateLetters: arabicLetters.join(''),
          PlateNumbers: numbers.join(''),
        }
      )
      .then((response) => {
        console.log('Parking session started successfully:', response.data);
        // Additional logic after starting the parking session
      })
      .catch((error) => {
        console.error('Error starting parking session:', error);
        // Handle error
      })
      .finally(() => {
        setShowConfirmation(false); // Hide the confirmation dialog
      });
  };

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
            <p>Arabic Letters: {arabicLetters.join('')}</p>
            <p>Numbers: {numbers.join('')}</p>
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
// chatgpt 4

// import React, { useState, useRef, useEffect } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";
// import styles from "./App.module.css";

// function CameraSwitcher({ darkMode }) {
//   const [selectedDevice, setSelectedDevice] = useState(null);
//   const webcamRef = useRef(null);
//   const [devices, setDevices] = useState([]);
//   const [recognizedPlate, setRecognizedPlate] = useState("");
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const switchCamera = (deviceId) => {
//     setSelectedDevice(deviceId);
//   };

//   const capturePhoto = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     const blob = dataURItoBlob(imageSrc);
//     const formData = new FormData();
//     formData.append("image", blob);

//     axios.post("https://api.imgbb.com/1/upload?key=b12524ab4b955c0548dbc0dc9c669d48", formData)
//       .then((response) => {
//         console.log("Image uploaded successfully:", response.data.data.url);
//         axios.post("https://mohammed321735-rakna-api-gdkgivmppq-ew.a.run.app/ODLink", { image_url: response.data.data.url }, { headers: { "Content-Type": "application/json" } })
//           .then((response) => {
//             const plateNumber = response.data[0]["Characters result"].map(element => element.Character).join('');
//             setRecognizedPlate(plateNumber);
//             setShowConfirmation(true);
//           })
//           .catch((error) => {
//             console.error("Error processing the image:", error);
//           });
//       })
//       .catch((error) => {
//         console.error("Error uploading the image:", error);
//       });
//   };

//   const getMediaDevices = async () => {
//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const videoDevices = devices.filter(device => device.kind === "videoinput");
//       setDevices(videoDevices);
//       if (videoDevices.length > 0) {
//         setSelectedDevice(videoDevices[0].deviceId);
//       }
//     } catch (error) {
//       console.error("Error enumerating media devices:", error);
//     }
//   };

//   useEffect(() => {
//     getMediaDevices();
//   }, []);

//   return (
//     <div className={`${styles.Container} ${darkMode ? styles.DarkMode : ""}`}>
//       <div className={styles.Camera}>
//         <select className={`${styles.Select} ${darkMode ? styles.DarkModeSelect : ""}`} onChange={(e) => switchCamera(e.target.value)} value={selectedDevice}>
//           {devices.map((device, index) => (
//             <option key={device.deviceId} value={device.deviceId}>
//               {device.label || `Camera ${index + 1}`}
//             </option>
//           ))}
//         </select>
//         <Webcam
//           audio={false}
//           videoConstraints={{ deviceId: selectedDevice, width: 1920, height: 1080 }}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           screenshotQuality={1}
//           style={{ width: "100%", height: "auto" }}
//         />
//         {showConfirmation && (
//           <div className={styles.RecognizedPlate}>
//             <p>Recognized Plate Number: {recognizedPlate}</p>
//             <div>
//               <button onClick={confirmPlate}>Confirm</button>
//               <button onClick={rejectPlate}>Reject</button>
//             </div>
//           </div>
//         )}
//         <button className={`${styles.Button} ${darkMode ? styles.DarkModeButton : ""}`} onClick={capturePhoto}>
//           Capture Photo
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CameraSwitcher;

// function dataURItoBlob(dataURI) {
//   let byteString = dataURI.split(",")[0].indexOf("base64") >= 0 ? atob(dataURI.split(",")[1]) : unescape(dataURI.split(",")[1]);
//   let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
//   let ia = new Uint8Array(byteString.length);
//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//   return new Blob([ia], { type: mimeString });
// }


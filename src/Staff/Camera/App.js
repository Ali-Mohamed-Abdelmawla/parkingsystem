import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

function CameraSwitcher() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const webcamRef = useRef(null);
  const [devices, setDevices] = useState([]);

  // Function to handle switching cameras
  const switchCamera = (deviceId) => {
    setSelectedDevice(deviceId);
  };

// خلينا لون البليته ابيض
   const capturePhoto = () => {
    // Capture the image from the webcam
    const imageSrc = webcamRef.current.getScreenshot();
   
    // Create an Image object and set its source to the captured image
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
       // Create a canvas element
       const canvas = document.createElement('canvas');
       const ctx = canvas.getContext('2d');
   
       // Set the canvas dimensions to match the image
       canvas.width = img.width;
       canvas.height = img.height;
   
       // Draw the image onto the canvas
       ctx.drawImage(img, 0, 0, img.width, img.height);
   
       // Apply a saturation filter with 0% saturation
       ctx.filter = 'saturate(0%)';
   
       // Redraw the image with the filter applied
       ctx.drawImage(img, 0, 0, img.width, img.height);
   
       // Convert the canvas to a Base64 encoded string
       const filteredImageSrc = canvas.toDataURL();
   
       // Extract the Base64 encoded image data from the data URL
       const base64Image = filteredImageSrc.split(",")[1];

       let recognizedText = "";
       // Now, you can send the Base64 encoded image to the OCR API
       axios
         .post(
           "https://mohammed321735-rakna-api-gdkgivmppq-ew.a.run.app/OD",
           { image_base64: base64Image },
           { headers: { "Content-Type": "application/json" } }
         )
         .then((response) => {
           // Process the response from the OCR API
           response.data[0]["Characters result"].forEach((element) => {
             console.log(element.Character);
             // Append each character to the string
             recognizedText += element.Character;
             console.log("this is the text: ", recognizedText);
           });
   
           // Identify Arabic numerals
           let arabicNumerals = recognizedText.match(/[\u0660-\u0669]/g) || [];
   
           // Remove Arabic numerals from the original string
           let remainingText = recognizedText.replace(/[\u0660-\u0669]/g, '');
   
           // The remaining characters are considered Arabic letters
           let arabicLetters = remainingText.match(/[\u0600-\u06FF]/g) || [];
   
           console.log("Arabic Letters:", arabicLetters.join(""));
           console.log("Arabic Numerals:", arabicNumerals.join(""));
         })
         .catch((error) => {
           console.error("Error posting data:", error);
         });
    };
   };

   

  // Fetch list of available media devices
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
    <div className="Camera">
      <select
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
        videoConstraints={{ deviceId: selectedDevice }}
        ref={webcamRef}
        style={{ width: "100%", height: "auto" }}
      />
      <button onClick={capturePhoto}>Capture Photo</button>
    </div>
  );
}

export default CameraSwitcher;

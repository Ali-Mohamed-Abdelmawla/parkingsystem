import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../auth/axios.js";
import Swal from "sweetalert2";
import AddVehiclePopupPresentational from "./AddVehiclePopupPresentational.js";

function AddVehiclePopupContainer({ onClose, darkMode }) {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  const numberRegex = /^[0-9]+$/;
  const inputRefs = useRef([]);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [darkMode]);

  const startParkingSession = async (accessToken) => {
    try {
      const plateLetters = inputs.slice(0, 3).join(" ");
      const plateNumbers = inputs.slice(3).join("");
      setLoading(true);

      const response = await axiosInstance.post(
        "/api/GarageStaff/StartParkingSession",
        {
          plateLetters,
          plateNumbers,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Parking session started:", response.data);
      console.log("Response:", response.data.Message);
      console.log(
        "Response:",
        response.data.Message.includes("Session already exists")
      );
      if (response.data.Message.includes("Session already exists")) {
        Swal.fire({
          title: "Error!",
          text: "Car plate was registered before!",
          icon: "error",

        });
      } else {
        Swal.fire({
          title: "Success!",
          text: "Parking session started successfully!",
          icon: "success",

        }).then(() => {
          onClose();
          window.location.reload();
        });
      }
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      console.log("Error message:", error.response.data);

      setLoading(false);
      throw new Error("Failed to start parking session. Please try again.");
    }
  };

  const handleSubmit = async () => {
    const licensePlateNumber = inputs.join("");
    if (licensePlateNumber.length === 6 || licensePlateNumber.length === 7) {
      try {
        await startParkingSession(accessToken);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          customClass: {
            container: darkMode
              ? "custom-swal-container-dark"
              : "custom-swal-container-light",
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            content: "custom-swal-content",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "License plate number must be 6 or 7 characters long.",
        icon: "error",
        customClass: {
          container: darkMode
            ? "custom-swal-container-dark"
            : "custom-swal-container-light",
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          content: "custom-swal-content",
          confirmButton: "custom-swal-confirm-button",
        },
      });
    }
  };

  const handleInputChange = (index, event) => {
    const newValue = event.target.value;
    const newInputs = [...inputs];
    const currentLength = inputs[index].length;

    if (event.type === "change") {
      if (newValue === "") {
        newInputs[index] = "";
        setInputs(newInputs);
        if (currentLength === 0 && index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else if (
        (index < 3 && arabicRegex.test(newValue)) ||
        (index >= 3 && numberRegex.test(newValue))
      ) {
        newInputs[index] = newValue;
        setInputs(newInputs);
        if (newValue.length === 1 && index < inputs.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    } else if (
      event.type === "keydown" &&
      event.key === "Backspace" &&
      currentLength === 0 &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleAddInputClick = () => {
    if (inputs.length < 7) {
      setInputs([...inputs, ""]);
      setTimeout(() => {
        inputRefs.current[inputs.length].focus();
      }, 0);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AddVehiclePopupPresentational
      inputs={inputs}
      darkMode={darkMode}
      onClose={handleClose}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleAddInputClick={handleAddInputClick}
      inputRefs={inputRefs}
      loading={loading}
    />
  );
}

export default AddVehiclePopupContainer;

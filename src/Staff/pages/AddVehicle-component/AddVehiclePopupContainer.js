import React, { useState } from "react";
import axiosInstance from "../../../auth/axios.js";
import Swal from "sweetalert2";
import AddVehiclePopupPresentational from "./AddVehiclePopupPresentational.js";
import { useForm } from "react-hook-form";

function AddVehiclePopupContainer({ onClose, darkMode }) {
  const [loading, setLoading] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const startParkingSession = async (data) => {
    try {
      const plateLetters = data.letters.trim();
      const plateNumbers = data.numbers.trim();
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

  const onSubmit = async (data) => {
    await startParkingSession(data);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AddVehiclePopupPresentational
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      darkMode={darkMode}
      onClose={handleClose}
      loading={loading}
    />
  );
}

export default AddVehiclePopupContainer;

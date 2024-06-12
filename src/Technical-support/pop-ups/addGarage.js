import React, { useState } from "react";
import axiosInstance from "../../auth/axios";
import Swal from "sweetalert2";
import closeLight from "../assets/LightMode/false.svg";
import styles from "./garage-popup.module.css";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
const AddGarage = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      setLoading(true);
      const response = await axiosInstance.post(
        "/TechnicalSupport/AddGarage",
        formData,
        {
          headers,
        }
      );

      console.log("Added new garage:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Garage added successfully!",
        confirmButtonColor: "#4caf50",
      }).then(() => {
        reset(); // Reset form fields
        onClose(); // Close popup
        window.location.reload();
        setLoading(false);
      });
    } catch (error) {
      console.error("Error adding garage:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add garage. Please try again later.",
        confirmButtonColor: "#f44336",
      }).then(() => {
        setLoading(false);
      });
    }
  };

  return (
    <div className={`${styles.popup}`}>
      <div
        className={`${styles["popup-inner"]}`}
      >
        <img
          src={closeLight}
          alt="close"
          className={styles["close-icon"]}
          onClick={onClose}
        />
        <h2>Add Garage</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            placeholder="Garage Name"
            type="text"
            {...register("garageName", {
              required: "Garage name is required",
            })}
          />
          {errors.garageName && (
            <span className={styles.error}>{errors.garageName.message}</span>
          )}

          <input
            placeholder="Hour Price"
            type="number"
            {...register("hourPrice", {
              required: "hour price is required",
              pattern: {
                value: /^\d+(\.\d+)?$/, // Regular expression to match only digits
                message: "The entered value should be a valid price",
              },
            })}
          />
          {errors.hourPrice && (
            <span className={styles.error}>{errors.hourPrice.message}</span>
          )}

          <input
            placeholder="Longitude"
            type="text"
            {...register("longitude", {
              required: "Longitude is required",
              pattern: {
                value: /^\d+(\.\d+)?$/, // Regular expression to match only digits
                message: "The entered value should be a number",
              },
              minLength: {
                value: -180,
                message: "Minimum value should be -180",
              },
              maxLength: {
                value: 180,
                message: "Maximum value should be 180",
              },
            })}
          />
          {errors.longitude && (
            <span className={styles.error}>{errors.longitude.message}</span>
          )}

          <input
            placeholder="Latitude"
            type="text"
            {...register("latitude", {
              required: "Latitude is required",
              pattern: {
                value: /^\d+(\.\d+)?$/, // Regular expression to match only digits
                message: "The entered value should be a number",
              },
              minLength: {
                value: -90,
                message: "Minimum value should be -90",
              },
              maxLength: {
                value: 90,
                message: "Maximum value should be 90",
              },
            })}
          />
          {errors.latitude && (
            <span className={styles.error}>{errors.latitude.message}</span>
          )}

          <input
            placeholder="Street"
            type="text"
            {...register("street", {
              required: "street name is required",
            })}
          />
          {errors.street && (
            <span className={styles.error}>{errors.street.message}</span>
          )}

          <input
            placeholder="City"
            type="text"
            {...register("city", {
              required: "city name is required",
            })}
          />

          {errors.city && (
            <span className={styles.error}>{errors.city.message}</span>
          )}

          <input
            placeholder="Total Spaces"
            type="number"
            {...register("totalSpaces", {
              required: "TotalSpaces is required",
              minLength: 1,
              maxLength: 11,
              pattern: {
                value: /^\d+$/,
                message: "The entered value should be a number",
              },
            })}
          />

          {errors.totalSpaces && (
            <span className={styles.error}>{errors.totalSpaces.message}</span>
          )}

          <div className={`${styles["edit-model-buttons"]}`}>
            <LoadingButton
              endIcon={<AddIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              <span>Add</span>
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGarage;

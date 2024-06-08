import React,{useState} from "react";
import axiosInstance from "../../auth/axios";
import Swal from "sweetalert2";
import closeDark from "../assets/DarkMode/false-dark.svg";
import closeLight from "../assets/LightMode/false.svg";
import styles from "./garage-popup.module.css";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
const GaragePopup = ({ onClose, darkMode }) => {
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
      setLoading(true)
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
        setLoading(false)
      });
    } catch (error) {
      console.error("Error adding garage:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add garage. Please try again later.",
        confirmButtonColor: "#f44336",
      }).then(() => {
        setLoading(false)
      })
    }
  };

  return (
    <div className={`${styles.popup} ${darkMode ? styles["dark-mode"] : ""}`}>
      <div
        className={`${styles["popup-inner"]} ${
          darkMode ? styles["dark-mode-inner"] : ""
        }`}
      >
        <img
          src={darkMode ? closeDark : closeLight}
          alt="close"
          className={styles["close-icon"]}
          onClick={onClose}
        />
        <h2>Add Garage</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            placeholder="Garage Name"
            type="text"
            {...register("garageName", { required: true })}
          />
          <br />
          {errors.garageName && (
            <span className={styles.error}>Garage Name is required</span>
          )}

          <input
            placeholder="Hour Price"
            type="number"
            {...register("hourPrice", { required: true })}
          />
          <br />

          {errors.hourPrice && (
            <span className={styles.error}>Hour Price is required</span>
          )}

          <input
            placeholder="Street"
            type="text"
            {...register("street", { required: true })}
          />
          <br />

          {errors.street && <span className={styles.error}>Street is required</span>}

          <input
            placeholder="City"
            type="text"
            {...register("city", { required: true })}
          />
          <br />

          {errors.city && <span className={styles.error}>City is required</span>}

          <input
            placeholder="Longitude"
            type="text"
            {...register("longitude", {
              required: true,
              pattern: {
                value: /^-?\d*(\.\d+)?$/, // يقبل الأعداد الصحيحة والعشرية السالبة أو الموجبة
              },
            })}
          />
          <br />

          {errors.longitude && errors.longitude.type === "required" && (
            <span className={styles.error}>Longitude is required</span>
          )}

          {errors.longitude && errors.longitude.type === "pattern" && (
            <span className={styles.error}>Please enter a valid Longitude</span>
          )}

          <input
            placeholder="Latitude"
            type="text"
            {...register("latitude", {
              required: true,
              pattern: {
                value: /^-?\d*(\.\d+)?$/, // يقبل الأعداد الصحيحة والعشرية السالبة أو الموجبة
              },
            })}
          />
          <br />

          {errors.latitude && errors.latitude.type === "required" && (
            <span className={styles.error}>Latitude is required</span>
          )}

          {errors.latitude && errors.latitude.type === "pattern" && (
            <span className={styles.error}>Please enter a valid Latitude</span>
          )}

          <input
            placeholder="Total Spaces"
            type="number"
            {...register("totalSpaces", { required: true })}
          />
          <br />

          {errors.totalSpaces && (
            <span className={styles.error}>Total Spaces is required</span>
          )}

          <div className={`${styles["edit-model-buttons"]} ${darkMode}`}>
 
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

export default GaragePopup;

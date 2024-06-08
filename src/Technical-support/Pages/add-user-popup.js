import React, { useState } from "react";
import closeDark from "../assets/DarkMode/false-dark.svg";
import closeLight from "../assets/LightMode/false.svg";
import styles from "./garage-popup.module.css";
import axiosInstance from "../../auth/axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
const UserPopup = ({ onClose, darkMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const[loading,setLoading] = useState(false)
  const onSubmit = async (data) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      setLoading(true)
      const response = await axiosInstance.post(
        "/TechnicalSupport/AddUser",
        data,
        {
          headers: headers,
        }
      );

      if (!response.data) {
        throw new Error("Failed to add user");
      }

      console.log("Added new user:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User added successfully!",
        confirmButtonColor: "#4caf50",
      }).then(() => {
        reset();
        onClose();
        window.location.reload();
        setLoading(false)
      });
    } catch (error) {
      console.error("Error adding user:", error);
      console.log(error.response.data);
      if(error.response.data.includes("Email is already registered!")) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email is already registered!",
          confirmButtonColor: "#f44336",

        }).then(() => {
            setLoading(false)
        });
    }else{
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add user. Please try again later.",
        confirmButtonColor: "#f44336",

      }).then(() => {
          setLoading(false)
      });
    }
    }
  };

  return (
    <div className={`${styles.popup} ${darkMode ? styles["dark-mode"] : ""}`}>
      <div className={styles["popup-inner"]}>
        <img
          src={darkMode ? closeDark : closeLight}
          alt="close"
          className={styles["close-icon"]}
          onClick={onClose}
        />
        <h2>Add User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="FullName"
            type="text"
            {...register("FullName", { required: true })}
          />
          <br />

          {errors.FullName && (
            <span className={styles.error}>FullName is required</span>
          )}

          <input
            placeholder="National ID"
            type="text"
            {...register("NationalId", {
              required: true,
              minLength: 14,
              maxLength: 14,
              pattern: { value: /^\d+$/ },
            })}
          />
          <br />

          {errors.NationalId && errors.NationalId.type === "required" && (
            <span className={styles.error}>National ID is required</span>
          )}
          {errors.NationalId && errors.NationalId.type === "minLength" && (
            <span className={styles.error}>National ID must be exactly 14 digits</span>
          )}
          {errors.NationalId && errors.NationalId.type === "maxLength" && (
            <span className={styles.error}>National ID must be exactly 14 digits</span>
          )}
          {errors.NationalId && errors.NationalId.type === "pattern" && (
            <span className={styles.error}>The entered value should be a number</span>
          )}

          <input
            placeholder="Username"
            type="text"
            {...register("UserName", {
              required: true,
              pattern: /^[a-zA-Z0-9]{5,20}$/,
            })}
          />
          <br />

          {errors.UserName && errors.UserName.type === "required" && (
            <span className={styles.error}>Username is required</span>
          )}
          {errors.UserName && errors.UserName.type === "pattern" && (
            <span className={styles.error}>
              Username must be 5 to 20 characters long with no spaces and
              special characters
            </span>
          )}

          <input
            placeholder="Email"
            type="email"
            {...register("Email", {
              required: true,
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i },
            })}
          />
          <br />

          {errors.Email && errors.Email.type === "required" && (
            <span className={styles.error}>Email is required</span>
          )}
          {errors.Email && errors.Email.type === "pattern" && (
            <span className={styles.error}>Please enter a valid email</span>
          )}

          <select {...register("Role", { required: true })}>
            <option value="garageadmin">garageadmin</option>
            <option value="customerservice">customerservice </option>
          </select>
          <br />

          {errors.Role && <span className={styles.error}>Role is required</span>}

          <input
            placeholder="Phone Number"
            type="text"
            {...register("PhoneNumber", {
              required: true,
              minLength: 11,
              maxLength: 11,
            })}
          />
          <br />

          {errors.PhoneNumber && errors.PhoneNumber.type === "required" && (
            <span className={styles.error}>Phone Number is required</span>
          )}
          {errors.PhoneNumber && errors.PhoneNumber.type === "minLength" && (
            <span className={styles.error}>
              Phone Number must be exactly 11 digits
            </span>
          )}
          {errors.PhoneNumber && errors.PhoneNumber.type === "maxLength" && (
            <span className={styles.error}>
              Phone Number must be exactly 11 digits
            </span>
          )}

          <input
            placeholder="Garage Id"
            type="number"
            {...register("GarageId", { required: true })}
          />
          <br />

          {errors.GarageId && (
            <span className={styles.error}>Garage ID is required</span>
          )}

          <input
            placeholder="Salary"
            type="number"
            {...register("Salary", { required: true })}
          />
          <br />

          {errors.Salary && <span className={styles.error}>Salary is required</span>}
          <div>
            {/* <button className={styles.submit} type="submit">
              Add
            </button> */}
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

export default UserPopup;

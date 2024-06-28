import Select, { components } from "react-select";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";

import closeDark from "../assets/DarkMode/false-dark.svg";
import closeLight from "../assets/LightMode/false.svg";
import styles from "./garage-popup.module.css";
import axiosInstance from "../../auth/axios";
import sweetAlertInstance from "../../helper/SweetAlert";
import AllGaragesSelect from "../../helper/All-Garages-select/All-Garages-select";
import "../../helper/Garage-admins-select.css";

const AddUser = ({ onClose, darkMode }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(null);
  const [customerService, setCustomerService] = useState(false);

  useEffect(() => {
    setCustomerService(role === "customerservice");
  }, [role]);

  const customStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      background: "var(--input-background-color)",
      color: "var(--font-color) !important",
      display: "flex",
      width: "100%",
      flexWrap: "nowrap",
      borderColor: isFocused ? "var(--special-color1)" : "black",
      boxShadow: "none",
      cursor: "pointer",
      border: "1px solid var(--special-color1)",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        background: "var(--hover-effect-color)",
        border: "1px solid rgba(105, 105, 105, 0.671)",
        boxShadow: "",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "17px",
      color: "var(--font-color) !important",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--special-color1)", // Change the color of the dropdown icon
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      color: "var(--special-color1)", // Change the color of the indicator separator
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "var(--font-color)", // Change the color of the "No options" message
    }),
    menu: (provided) => ({
      ...provided,
      background: "var(--secondary-color)",
      "::-webkit-scrollbar": {
        width: "12px",
        backgroundColor: "#dfd4b0",
        borderRadius: "10px",
      },
      classNames: "custom-scrollbar", // Add the custom class here
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "var(--special-color1)"
        : isFocused
        ? "var(--color-background) !important"
        : "var(--secondary-color)",
      cursor: "pointer",
    }),
  };

  const handleChange = (selectedOption, field) => {
    console.log(selectedOption);
    setRole(selectedOption.value);
    field.onChange(selectedOption.value);
  };

  const onSubmit = async (data) => {

    if(data.Role === "garageadmin"){
      data.Salary = 0
    }

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      setLoading(true);
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
      sweetAlertInstance.fire({
        icon: "success",
        title: "Success",
        text: "User added successfully!",
        confirmButtonColor: "#4caf50",
      }).then(() => {
        reset();
        onClose();
        window.location.reload();
        setLoading(false);
      });
    } catch (error) {
      console.error("Error adding user:", error);
      console.log(error.response.data);
      if (error.response.data.includes("Email is already registered!")) {
        sweetAlertInstance.fire({
          icon: "error",
          title: "Error",
          text: "Email is already registered!",
          confirmButtonColor: "#f44336",
        }).then(() => {
          setLoading(false);
        });
      } else if (error.response.data.includes("Username is already used !")) {
        sweetAlertInstance.fire({
          icon: "error",
          title: "Error",
          text: "Username is already used !",
          confirmButtonColor: "#f44336",
        }).then(() => {
          setLoading(false);
        });
      } else {
        sweetAlertInstance.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add user. Please try again later.",
          confirmButtonColor: "#f44336",
        }).then(() => {
          setLoading(false);
        });
      }
    }
  };

  const roleOptions = [
    { label: "Garage Admin", value: "garageadmin" },
    { label: "Customer Service", value: "customerservice" },
  ];

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
            {...register("FullName", { required: "Full name is required" })}
          />
          {errors.FullName && (
            <span className={styles.error}>{errors.FullName.message}</span>
          )}

          <input
            placeholder="National ID"
            type="text"
            {...register("NationalId", {
              required: "National ID is required",
              minLength: {
                value: 14,
                message: "National ID must be exactly 14 digits",
              },
              maxLength: {
                value: 14,
                message: "National ID must be exactly 14 digits",
              },
              pattern: {
                value: /^\d+$/,
                message: "The entered value should be a number",
              },
            })}
          />
          {errors.NationalId && (
            <span className={styles.error}>{errors.NationalId.message}</span>
          )}

          <input
            placeholder="Username"
            type="text"
            {...register("UserName", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username must be at least 5 characters long",
              },
              maxLength: {
                value: 20,
                message: "Username must be at most 20 characters long",
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Username must contain only letters and numbers",
              },
            })}
          />
          {errors.UserName && (
            <span className={styles.error}>{errors.UserName.message}</span>
          )}

          <input
            placeholder="Email"
            type="email"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.Email && (
            <span className={styles.error}>{errors.Email.message}</span>
          )}

          <input
            placeholder="Phone Number"
            type="text"
            {...register("PhoneNumber", {
              required: "Phone Number is required",
              minLength: {
                value: 11,
                message: "Your entry needs to be 11 digits long.",
              },
              maxLength: {
                value: 11,
                message: "Please limit your entry to 11 digits.",
              },
              pattern: {
                value: /^\d+$/, // Regular expression to match only digits
                message: "The entered value should be a number",
              },
            })}
          />
          {errors.PhoneNumber && (
            <span className={styles.error}>{errors.PhoneNumber.message}</span>
          )}
          {customerService ? (
            <>
              <input
                placeholder="Salary"
                type="number"
                {...register("Salary", {
                  required: "Salary is required",
                  pattern: {
                    value: /^\d+(\.\d+)?$/, // Regular expression to match only digits
                    message: "The entered value should be a number",
                  },
                })}
              />
              {errors.Salary && (
                <span className={styles.error}>{errors.Salary.message}</span>
              )}
            </>
          ) : null}

          {customerService ? null : (
            <>
              <div style={{ width: "80%", margin: "8px", textAlign: "left" }}>
                <Controller
                  name="GarageId"
                  control={control}
                  rules={{ required: "Garage ID is required" }}
                  render={({ field }) => (
                    <AllGaragesSelect
                      {...field}
                      onGarageSelect={(selectedOption) => {
                        console.log(selectedOption);
                        field.onChange(selectedOption.garageId);
                      }}
                      role={role}
                    />
                  )}
                />
              </div>
              {errors.GarageId && (
                <span className={styles.error}>{errors.GarageId.message}</span>
              )}
            </>
          )}

          <div style={{ width: "80%", margin: "8px", textAlign: "left" }}>
            <Controller
              name="Role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Role"
                  value={
                    role
                      ? roleOptions.find((option) => option.value === role)
                      : null
                  }
                  options={roleOptions}
                  className={styles.select}
                  onChange={(selectedOption) => {
                    handleChange(selectedOption, field);
                  }}
                  styles={customStyles}
                />
              )}
            />
          </div>
          {errors.Role && (
            <span className={styles.error}>{errors.Role.message}</span>
          )}

          <div>
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

export default AddUser;

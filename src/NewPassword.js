import { useForm } from "react-hook-form";
import axiosInstance from "./auth/axios";
import Resetstyles from "./Login.module.css";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
const Newpassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const location = useLocation();
  const otp = location.state?.otp; // Get the OTP passed from Resetpassword component
  const info = location.state?.passUpdateInfo
  const onSubmit = (data) => {
    setLoading(true);
    axiosInstance
      .post(
        "/api/Auth/ResetPassword",
        {
          NewPassword: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password resetted successfully",
        })
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to reset password",
        })
        setLoading(false);
      });
  };

  const password = watch("password");

  return (
    <div className={Resetstyles.resetContainer}>
      <div className={Resetstyles.resetContent}>
        <h2>
          Please provide your new password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>

            <input
              type="password"
              placeholder="New Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be no more than 20 characters long",
                },
                validate: {
                  lowercase: (value) =>
                    value.match(/[a-z]/) ? true : "Password must contain at least one lowercase letter",
                  uppercase: (value) =>
                    value.match(/[A-Z]/) ? true : "Password must contain at least one uppercase letter",
                  number: (value) =>
                    value.match(/[0-9]/) ? true : "Password must contain at least one number",
                  specialChar: (value) =>
                    value.match(/[@$!%*?&]/) ? true : "Password must contain at least one special character (@, $, !, %, *, ?, &)",
                },
              })}
            />
            {errors.password && (
              <div className={Resetstyles.error}>{errors.password.message}</div>
            )}

            <input
              type="password"
              placeholder="Confirm New Password"
              {...register("NewPassword", {
                required: "Please confirm your password",
                validate: value =>
                  value === password || "The passwords do not match"
              })}
            />
            {errors.NewPassword && (
              <div className={Resetstyles.error}>{errors.NewPassword.message}</div>
            )}
          </div>
          <LoadingButton
            endIcon={<AddIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            type="submit"
          >
            <span>Submit</span>
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default Newpassword;
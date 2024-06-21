import { useState } from "react";
import Loginstyles from "./Login.module.css";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
// import SendIcon from "@mui/icons-material/Send";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./auth/axios";
import Swal from "sweetalert2";
const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  loading,
  showResetPassword,
  resetPasswordLoading,
  setResetPasswordLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    handleLogin(data);
  };

  const handleForgotPassword = () => {
    console.log(username);
    setResetPasswordLoading(true);
    axiosInstance
      .post(
        "/api/Auth/RequestPasswordReset",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            email: username,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setResetPasswordLoading(false);
        navigate("/resetpassword", { state: { Email: username } });
      })
      .catch((error) => {
        console.log(error);
        setResetPasswordLoading(false);
        if (error.response.data.includes("User not found.")) {
          Swal.fire("Error", "Email is not found", "error");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: "Email is required" })}
        type="text"
        placeholder="ُEmail"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && (
        <div className={Loginstyles.error}>{errors.username.message}</div>
      )}

      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* <div onClick={() => navigate("/resetpassword")} className={Loginstyles.forgotPassword}>forgot your password?</div> */}
      {errors.password && (
        <div className={Loginstyles.error}>{errors.password.message}</div>
      )}
      {showResetPassword && (
        <div className={Loginstyles.error} onClick={handleForgotPassword}>
          forgot your password?
        </div>
      )}

      <div className={Loginstyles.loginFormButtons}>
        <LoadingButton
          endIcon={<LoginIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          <span>Login</span>
        </LoadingButton>
      </div>
    </form>
  );
};

export default LoginForm;

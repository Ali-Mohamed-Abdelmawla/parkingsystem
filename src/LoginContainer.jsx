import { useState } from "react";
import Loginstyles from "./Login.module.css";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
// import SendIcon from "@mui/icons-material/Send";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  loading,
  showResetPassword,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: "Username is required" })}
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

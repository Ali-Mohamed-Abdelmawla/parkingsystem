
import Loginstyles from "./Login.module.css";

import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: "Username is required" })}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && <div className={Loginstyles.error}>{errors.username.message}</div>}

      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <div className={Loginstyles.error}>{errors.password.message}</div>}

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

import { useForm } from "react-hook-form";
import axiosInstance from "./auth/axios";
import Resetstyles from "./Login.module.css";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Resetpassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state?.Email;
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOTPLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const resendCode = () => {
    setOTPLoading(true);
    axiosInstance
      .post(
        "/api/Auth/RequestPasswordReset",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            email: info,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setOTPLoading(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "An OTP was sent to your email, please check it out",
        });
      })
      .catch((error) => {
        console.log(error);
        setOTPLoading(false);
        if (error.response.data.includes("User not found.")) {
          Swal.fire("Error", "Email is not found", "error");
        }
      });
  };
  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    axiosInstance
      .get("/api/Auth/SendResetPassword", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          otp: data.otp,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        navigate("/newpassword", {
          state: { otp: data.otp, passUpdateInfo: response.data },
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.Success);
        if (error.response.data.Success === false) {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "OTP validity has ended",
          }).then(() => {
            setShowResend(true);
          })
          //   .then(() => {
          //       navigate("/");
          //   })
        }
      });
  };
  return (
    <div className={Resetstyles.resetContainer}>
      <div className={Resetstyles.resetContent}>
        <h2>
          An otp was sent to your email,please provide it below to proceed the
          resetting process
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="OTP"
              {...register("otp", { required: "Please provide the otp" })}
            ></input>
            {errors.otp && (
              <div className={Resetstyles.error}>{errors.otp.message}</div>
            )}{" "}
          </div>
          <LoadingButton
            endIcon={<AddIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            <span>Submit</span>
          </LoadingButton>
          {showResend && (
            <LoadingButton
              endIcon={<SendIcon />}
              loading={otpLoading}
              loadingPosition="end"
              variant="contained"
              onClick={resendCode}
            >
              <span>Resend otp</span>
            </LoadingButton>
          )}
        </form>
      </div>
    </div>
  );
};
export default Resetpassword;

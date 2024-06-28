import { useForm } from "react-hook-form";
import axiosInstance from "./auth/axios";
import Resetstyles from "./Login.module.css";
import { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { useLocation, useNavigate } from "react-router-dom";
import sweetAlertInstance from "./helper/SweetAlert";

const Resetpassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state?.Email;
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOTPLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [canResend, setCanResend] = useState(false); // New state to control resend ability
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const formatTime = (t) => (t < 10 ? "0" + t : t);

  useEffect(() => {
    const interval = setInterval(() => {
      const m = Math.floor(timeLeft / 60);
      const s = timeLeft - m * 60;

      setMin(m);
      setSec(s);
      if (m <= 0 && s <= 0) return () => clearInterval(interval);

      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const resendCode = () => {
    if (!canResend) return; // Prevent sending if not allowed
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
        sweetAlertInstance.fire({
          icon: "success",
          title: "Success",
          text: "An OTP was sent to your email, please check it out",
        });
        setCanResend(false); // Disable resend after successful request
      })
      .catch((error) => {
        console.log(error);
        setOTPLoading(false);
        if (error.response.data.includes("User not found.")) {
          sweetAlertInstance.fire("Error", "Email is not found", "error");
        }
      });
  };

  // Example cooldown logic: disable resend for 60 seconds after a successful request
  useEffect(() => {
    let cooldownTimer;
    if (showResend) {
      cooldownTimer = setTimeout(() => {
        setCanSubmit(true);
        setCanResend(true);
      }, 60000); // 60 seconds cooldown
    }
    return () => clearTimeout(cooldownTimer);
  }, [showResend]);

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
          sweetAlertInstance.fire({
            icon: "error",
            title: "Error",
            text: "OTP validity has ended",
          }).then(() => {
            setShowResend(true);
            setCanSubmit(false);
          });
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
            )}
          </div>
          {canSubmit && (
            <LoadingButton
              endIcon={<AddIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              <span>Submit</span>
            </LoadingButton>
          )}
          {canResend && (
            <>
              <LoadingButton
                endIcon={<SendIcon />}
                loading={otpLoading}
                loadingPosition="end"
                variant="contained"
                onClick={resendCode}
              >
                <span>Resend otp</span>
              </LoadingButton>
            </>
          )}
          {showResend && (
            <div>
              <span>{formatTime(min)}</span>:<span>{formatTime(sec)}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;

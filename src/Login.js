import { useState } from "react";
import Loginstyles from "./Login.module.css";
import LoginForm from "./LoginContainer";
import Logo from "./Login-assets/login-logo.svg";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import sweetAlertInstance from "./helper/SweetAlert";
import axiosInstance from "./auth/axios";
import Loader from "./helper/loading-component/loader";
function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (username && password) {
      try {
        setLoading(true);
        await axiosInstance
          .post(
            "/api/Auth/Login",
            {
              email: trimmedUsername,
              password: trimmedPassword,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              sessionStorage.setItem("accessToken", response.data.Token);

              console.log(response.data.IsAuthenticated);
              if (response.data.Token) {
                handleLoginToken(response.data.Token);
              } else {
                console.log("no token");
                if (
                  response.data.IsAuthenticated === false &&
                  response.data.Message === "Email is not confirmed yet!"
                ) {
                  sweetAlertInstance
                    .fire("Error", "please, verify your account", "error")
                    .then(() => {
                      setLoading(false);
                      navigate("");
                    });
                } else if (
                  response.data.IsAuthenticated === false &&
                  response.data.Message === "Email or Password is incorrect!"
                ) {
                  sweetAlertInstance
                    .fire("Error", "Email or Password is incorrect", "error")
                    .then(() => {
                      navigate("");
                      setLoading(false);
                      setShowResetPassword(true);
                    });
                } else if (response.data.IsAuthenticated === false) {
                  sweetAlertInstance
                    .fire("Error", "Something wrong happened !", "error")
                    .then(() => {
                      navigate("");
                      setLoading(false);
                    });
                }
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLoginToken = (Token) => {
    if (sessionStorage.getItem("accessToken") !== "undefined") {
      try {
        const decodedToken = jwtDecode(Token);
        const userRole = decodedToken.roles;
        console.log(userRole);
        if (navigate) {
          // Ensure navigate is available
          if (userRole === "garageadmin") {
            navigate("/SystemAdmin");
          } else if (userRole === "garagestaff") {
            navigate("/GarageStaff");
          } else if (userRole === "customerservice") {
            navigate("/CustomerService");
          } else if (userRole === "technicalsupport") {
            navigate("/TechnicalSupport");
          }
        } else {
          navigate("");
          sweetAlertInstance("Error", "login failed", "error");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  if (resetPasswordLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className={Loginstyles.loginPage}>
      <div className={Loginstyles.loginContainer}>
        <div className={Loginstyles.Logo}>
          <img src={Logo} alt="logo" />
          <p>To reshape the future of parking</p>
        </div>
        <div className={Loginstyles.rightSide}>
          <div className={Loginstyles.App}>
            <h1>Login</h1>
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
              loading={Loading}
              showResetPassword={showResetPassword}
              setResetPasswordLoading={setResetPasswordLoading}
              resetPasswordLoading={resetPasswordLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

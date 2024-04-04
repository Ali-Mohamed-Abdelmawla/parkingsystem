import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./Login";
import SystemAdmin from "./System-admin/index";
import CustomerService from "./Customer-service/index";
import TechnicalSupport from "./Technical-support/App";
import { swal } from 'sweetalert2';
// import TechnicalSupport from "./Technical-support/App";
import GarageStaff from "./Staff/App";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// ========================= PROTECTED ROUTE =========================
const IsAuthenticated = () => {
  // Check if the JWT token is stored in sessionStorage
  const token = sessionStorage.getItem("accessToken")
  const decoded = jwtDecode(token)
  const navigate = useNavigate(); // Hook for navigation

  console.log(decoded.roles)
  const userRole = decoded.roles;
  if (navigate) { // Ensure navigate is available
    if (userRole === "garageadmin") {
      navigate("/SystemAdmin");
    } else if (userRole === "garageadmin") {
      navigate("/GarageStaff");
    } else if (userRole === "customerservice") {
      navigate("/CustomerService");
    } else if (userRole === "technicalsupport") {
      navigate("/TechnicalSupport");
    } else {
      navigate("");
      swal("Error", "login failed", "error");
    }
  
  return sessionStorage.getItem("accessToken") !== null;
};
}


// Define a higher-order component for protected routes
const ProtectedRoute = ({ element, path }) => {
  if (!IsAuthenticated()) {
    // Redirect to login if not authenticated
    console.log("you are not logged in")
    return <Navigate to="/" replace />;
  }
  return <>{element}</>;
};
// ========================= PROTECTED ROUTE =========================

function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Login />,
    },
    {
      path: "/SystemAdmin",
      element: <ProtectedRoute element={<SystemAdmin />} />,
    },
    {
      path: "/GarageStaff",
      element: <ProtectedRoute element={<GarageStaff />} />,
    },
    {
      path: "/TechnicalSupport",
      element: <ProtectedRoute element={<TechnicalSupport />} />,
    },
    {
      path: "/CustomerService",
      element: <ProtectedRoute element={<CustomerService />} />,
    },
    // Catch-all route for undefined paths
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

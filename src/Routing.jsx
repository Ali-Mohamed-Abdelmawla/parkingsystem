import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Login from "./Login";
import SystemAdmin from "./System-admin/index";
import CustomerService from "./Customer-service/index";
import TechnicalSupport from "./Technical-support/App";

// system admin components
import Employees from "./System-admin/Employees-component/EmployeesContainer";
import Dashboard from "./System-admin/Dashboard-component/Dashboard";
import Complaints from "./System-admin/Complaints-component/ComplaintsContainer";

import Swal from "sweetalert2";

// import TechnicalSupport from "./Technical-support/App";
import GarageStaff from "./Staff/App";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// ========================= PROTECTED ROUTE =========================
// const IsAuthenticated = () => {
//   // Check if the JWT token is stored in sessionStorage
//   const token = sessionStorage.getItem("accessToken");
//   const navigate = useNavigate(); // Hook for navigation

//   if (token) {
//     const decoded = jwtDecode(token);

//     console.log(decoded.roles);
//     const userRole = decoded.roles;
//     // if (navigate) { // Ensure navigate is available
//     if (userRole === "garageadmin") {
//       navigate("/SystemAdmin");
//     } else if (userRole === "garageadmin") {
//       navigate("/GarageStaff");
//     } else if (userRole === "customerservice") {
//       navigate("/CustomerService");
//     } else if (userRole === "technicalsupport") {
//       navigate("/TechnicalSupport");
//     }
//   } else {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "You are not logged in",
//     });
//     navigate("/");
//   }

//   return sessionStorage.getItem("accessToken") !== null;
// };


// // Define a higher-order component for protected routes
// const ProtectedRoute = ({ element, path }) => {
//   if (!IsAuthenticated()) {
//     // Redirect to login if not authenticated
//     console.log("you are not logged in");
//     return <Navigate to="" replace />;
//   }
//   return <>{element}</>;
// };

//--------------trying to fix--------------------

const IsAuthenticated = () => {
  // Check if the JWT token is stored in sessionStorage
  const token = sessionStorage.getItem("accessToken");
  return token !== null;
};

// Define a higher-order component for protected routes
const ProtectedRoute = ({ element, path }) => {
  const isAuthenticated = IsAuthenticated();
  const navigate = useNavigate(); // Hook for navigation

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
        Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not logged in",
    });
    console.log("you are not logged in");
    
    navigate("/");
    return null;
  }
  return <>{element}</>;
};

// ========================= Routes =========================

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/SystemAdmin/*",
      element: <ProtectedRoute element={<SystemAdmin />} />,
      children: [
        {
          path: "SystemAdmin/Dashboard",
          element: <Dashboard />,
        },
        {
          path: "SystemAdmin/Employees",
          element: <Employees />,
        },
        {
          path: "SystemAdmin/Complaints",
          element: <Complaints />,
        },
        // Add more children routes for SystemAdmin if needed
      ],
    },
    {
      path: "/GarageStaff/*",
      element: <ProtectedRoute element={<GarageStaff />} />,
      children: [
        // Add children routes for GarageStaff
      ],
    },
    {
      path: "/TechnicalSupport/*",
      element: <ProtectedRoute element={<TechnicalSupport />} />,
      children: [
        // Add children routes for TechnicalSupport
      ],
    },
    {
      path: "/CustomerService/*",
      element: <ProtectedRoute element={<CustomerService />} />,
      children: [
        // Add children routes for CustomerService
      ],
    },

  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

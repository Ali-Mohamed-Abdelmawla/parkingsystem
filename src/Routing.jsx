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
import ActiveSessions from './System-admin/ActiveSessions-component/Activesessions';
import Salaries from './System-admin/Salaries-component/Salaries';

// staff commponents
import Transaction from "./Staff/pages/TransactionPage";
import Reports from "./Staff/pages/ReportsPage";
// customer service components
import Swal from "sweetalert2";
import ComplaintsforCustomerService from "./Customer-service/Complaints-component/ComplaintsContainer";

// import TechnicalSupport from "./Technical-support/App";
import GarageStaff from "./Staff/App";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Garage from "./Technical-support/Pages/Garages";

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
        {
          path: "SystemAdmin/ActiveSessions",
          element: <ActiveSessions />,
        },
        {
          path: "SystemAdmin/Salaries",
          element: <Salaries />,
        },
        // Add more children routes for SystemAdmin if needed
      ],
    },
    {
      path: "/GarageStaff/*",
      element: <ProtectedRoute element={<GarageStaff />} />,
      children: [
        {
          path:"GarageStaff/Report",
          element:<Reports/>
        },
        {
          path:"GarageStaff/Transaction",
          element:<Transaction/>
        },
      ],
    },
    {
      path: "/TechnicalSupport/*",
      element: <ProtectedRoute element={<TechnicalSupport />} />,
      children: [
        {
          path:"TechnicalSupport/Dashboard",
          element:<Dashboard/>
        },
        {
          path:"TechnicalSupport/Employee",
          element:<Employees/>
        },
        {
          path:"TechnicalSupport/Complaint",
          element:<Complaints/>
        },
        {
          path:"TechnicalSupport/Garages",
          element:<Garage/>
        },
      ],
    },
    {
      path: "/CustomerService/*",
      element: <ProtectedRoute element={<CustomerService />} />,
      children: [
        // Add children routes for CustomerService
        {
          path: 'CustomerService/Complaints',
          element: <ComplaintsforCustomerService />
        }
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

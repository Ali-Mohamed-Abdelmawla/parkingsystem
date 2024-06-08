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
import DashboardPage from "./Staff/pages/Dashboard-component/DashboardPage";
import Transaction from "./Staff/pages/Transaction-component/TransactionPage";
import Reports from "./Staff/pages/Reports-component/ReportsPage";

// customer service components
import ComplaintsforCustomerService from "./Customer-service/Complaints-component/ComplaintsContainer";

// technical support components
import ComplaintsforTechnicalSupport from "./Technical-support/Pages/Complaints";
import DashboardforTechnicalSupport from "./Technical-support/Pages/Dashboard";
import UsersforTechnicalSupport from "./Technical-support/Pages/Users"
import Garage from "./Technical-support/Pages/Garages";

import GarageStaff from "./Staff/App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
    }).then(() => {
      console.log("redirect to login");
      navigate("/");
    })
    
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
      path: "/SystemAdmin",
      element: <ProtectedRoute element={<SystemAdmin />} />,
      children: [
        {
          path: "/SystemAdmin",
          element: <Dashboard />,
        },
        {
          path: "/SystemAdmin/Employees",
          element: <Employees />,
        },
        {
          path: "/SystemAdmin/Complaints",
          element: <Complaints />,
        },
        {
          path: "/SystemAdmin/ActiveSessions",
          element: <ActiveSessions />,
        },
        {
          path: "/SystemAdmin/Salaries",
          element: <Salaries />,
        },
        // Add more children routes for SystemAdmin if needed
      ],
    },
    {
      path: "/GarageStaff",
      element: <ProtectedRoute element={<GarageStaff />} />,
      children: [
        {
          path:"/GarageStaff",
          element:<DashboardPage/>
        },
        {
          path:"/GarageStaff/Report",
          element:<Reports/>
        },
        {
          path:"/GarageStaff/Transaction",
          element:<Transaction/>
        },
      ],
    },
    {
      path: "/TechnicalSupport",
      element: <ProtectedRoute element={<TechnicalSupport />} />,
      children: [
        {
          path:"/TechnicalSupport",
          element:<DashboardforTechnicalSupport />
        },
        {
          path:"/TechnicalSupport/Employee",
          element:<UsersforTechnicalSupport />
        },
        {
          path:"/TechnicalSupport/Complaint",
          element:<ComplaintsforTechnicalSupport />
        },
        {
          path:"/TechnicalSupport/Garages",
          element:<Garage />
        },
      ],
    },
    {
      path: "/CustomerService",
      element: <ProtectedRoute element={<CustomerService />} />,
      children: [
        // Add children routes for CustomerService
        {
          path: '/CustomerService',
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

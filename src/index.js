import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Login from "./Login";
import SystemAdmin from "../src/System-admin/index";
import CustomerService from "../src/Customer-service/index";
import TechnicalSupport from "./Technical-support/App";
import GarageStaff from "../src/Staff/App";
import ComplaintsContainer from "./Customer-service/Complaints-component/ComplaintsContainer";
import Routing from './Routing'
// import TechnicalSuppport from "./Technical-support/App"

// --------------------------------------------------------------------------------------------------------------------- \\

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <CustomerService />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// const router = createBrowserRouter([
//   {
//     path: "",
//     element: <CustomerService />,
//     children: [
//       {
//         path: "/complaints",
//         element: <ComplaintsContainer />,
//       },
// {
//   path: "/customerService/reply",
// element: <ComplaintsContainer />,
// },
//     ],
//   },

// Add other routes as needed
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Routing />
);

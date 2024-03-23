import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import SystemAdmin from "./System-admin/index";
import Staff from "./Staff/App";
import TechnicalSuppport from "./Technical-support/App"
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TechnicalSuppport />
    </BrowserRouter>
  </React.StrictMode>
);

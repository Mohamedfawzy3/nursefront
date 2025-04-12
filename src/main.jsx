import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./style.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>{/* Wrap the app with BrowserRouter */}
    <UserProvider> {/* Wrap the app with UserProvider */}
              <App />
          </UserProvider>
  </React.StrictMode>
);

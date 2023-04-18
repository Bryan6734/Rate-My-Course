import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="24251031658-d7nhpabmlvqla3anlm0r1523pb8mcj3v.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </GoogleOAuthProvider>
);

reportWebVitals();

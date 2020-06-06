import React, { useState } from "react";
import AuthContext from "./store/Auth";
import Routes from "./routes/Routes";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "./assets/scss/scss.scss";

export default function App() {
  return (
    <AuthContext>
      <ToastContainer />
      <Routes />
    </AuthContext>
  );
}

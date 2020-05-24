import React, { useState } from "react";
import AuthContext from "./store/Auth";
import Routes from "./routes/Routes";
import "./App.css";

export default function App() {
  return (
    <AuthContext>
      <Routes />
    </AuthContext>
  );
}

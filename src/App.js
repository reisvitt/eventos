import React from "react";
import AuthContext from "./store/Auth";
import Routes from "./routes/Routes";

export default function App() {
  return (
    <AuthContext>
      <Routes />
    </AuthContext>
  );
}

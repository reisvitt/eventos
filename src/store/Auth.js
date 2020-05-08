import React, { createContext, useState, useContext } from "react";
import api from "../services/api";
import { setToken } from "../utils/auth";

const Context = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function SignUp(data) {
    await new Promise((resolve, reject) => {
      api
        .post("/user", data)
        .then((response) => {
          console.log("response", response);
          setToken(response.data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function SignIn(email, password) {
    console.log("Email:", email);
    console.log("Password:", "não vou falar");
  }

  function SignOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <Context.Provider value={{ SignIn, SignOut, SignUp, user }}>
      {children}
    </Context.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(Context);
  const { signIn, signOut, SignUp } = context;

  return { signIn, signOut, SignUp };
}

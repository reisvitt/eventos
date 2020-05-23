import React, { createContext, useState, useContext, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import api from "../services/api";
import { setToken, isAuthenticated } from "../utils/auth";

const Context = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [fetchUser, setFetchUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get("/me");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setUser(response.data.user);
          setFetchUser(true);
        } catch (error) {
          setFetchUser(true);
          console.log("ERROR AO CARREGAR USUARIO");
        }
      } else {
        setFetchUser(true);
      }
    };
    getUser();
  }, []);

  async function SignUp(data) {
    await new Promise((resolve, reject) => {
      api
        .post("/user", data)
        .then((response) => {
          setToken(response.data.token);
          setUser(response.data.user);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function SignIn(email, password) {
    await new Promise((resolve, reject) => {
      api
        .get("/login", {
          auth: {
            username: email,
            password: password,
          },
        })
        .then((response) => {
          setToken(response.data.token);
          setUser(response.data.user);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function SignOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <Context.Provider value={{ SignIn, SignOut, SignUp, user }}>
      {!fetchUser ? (
        <div className="loading loading-initial">
          <h3>
            <AiOutlineLoading3Quarters
              className="icon-loading"
              size={25}
              style={{ marginTop: 20 }}
            />
          </h3>
        </div>
      ) : (
        children
      )}
    </Context.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(Context);
  const { SignIn, SignOut, SignUp, user } = context;

  return { SignIn, SignOut, SignUp, user };
}

//import { secureStorage } from "./SecureStorage";

const getToken = () => {
  return localStorage.getItem("event-token");
};

const setToken = (token) => {
  localStorage.setItem("event-token", token);
};

const removeToken = () => {
  localStorage.removeItem("event-token");
};

const isAuthenticated = () => {
  console.log("getToken", getToken());
  return !!getToken();
};

export { getToken, setToken, removeToken, isAuthenticated };

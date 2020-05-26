import React from "react";
import { toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const customId = "custom-id-yes";

const autoClose = 3000;

export const Success = (message) => {
  return toast.success(message, {
    toastId: customId,
    pauseOnHover: true,
    closeOnClick: true,
    autoClose: autoClose,
  });
};

export const Warn = (message) => {
  return toast.warn(message, {
    toastId: customId,
    pauseOnHover: true,
    closeOnClick: true,
    autoClose: autoClose,
  });
};

export const NetWorkError = (message) => {
  return toast.error(message, {
    toastId: customId,
    closeOnClick: false,
    autoClose: false,
  });
};

export const Error = (message) => {
  if (message === "Error ao carregar usuário: Network Error") {
    return NetWorkError(message);
  }
  return toast.error(message, {
    toastId: customId,
    pauseOnHover: true,
    closeOnClick: true,
    autoClose: autoClose,
  });
};

export default function Default(message) {
  toast.info(message, {
    toastId: customId,
    pauseOnHover: true,
    closeOnClick: true,
    autoClose: autoClose,
  });
}

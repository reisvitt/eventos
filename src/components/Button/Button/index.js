import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export const Button = ({ onClick, title = "default", to }) => {
  return (
    <div className="default-button">
      {onClick ? (
        <Link onClick={onClick()}>{title}</Link>
      ) : (
        <Link to={to}>{title}</Link>
      )}
    </div>
  );
};

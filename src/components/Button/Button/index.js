import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export const Button = ({ onClick, title = "default", to, style, className = '' }) => {
  return (
    <div className={`default-button ${className}`} style={{ ...style }}>
      {onClick ? (
        <Link onClick={onClick()}>{title}</Link>
      ) : (
        <Link to={to}>{title}</Link>
      )}
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export const OutlineButton = ({ onClick, title = "default", to }) => {
  return (
    <div className="outline-button">
      {onClick ? (
        <Link onClick={onClick()}>{title}</Link>
      ) : (
        <Link to={to}>{title}</Link>
      )}
    </div>
  );
};

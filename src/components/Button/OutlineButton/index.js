import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export const OutlineButton = ({ onClick, title = "default", to, style }) => {
  return (
    <div className="outline-button" style={{ ...style }}>
      {onClick ? (
        <Link onClick={onClick()}>{title}</Link>
      ) : (
        <Link to={to}>{title}</Link>
      )}
    </div>
  );
};

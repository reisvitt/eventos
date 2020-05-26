import React from "react";

import "./styles.css";

const Title = ({ className, title }) => {
  return (
    <div className={`title-container ${className}`}>
      <h1>{title}</h1>
    </div>
  );
};

export default Title;

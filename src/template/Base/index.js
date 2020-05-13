import React from "react";
import Header from "../../components/Header";
import "./styles.css";

const Base = (props) => {
  return (
    <div className="site">
      <Header />
      <div className="base">{props.children}</div>
    </div>
  );
};

export default Base;

import React from "react";
import Header from "../../components/Header";
import "./styles.css";

const Base = (props) => {
  return (
    <div className="site">
      <Header />
      {props.children}
    </div>
  );
};

export default Base;

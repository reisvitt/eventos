import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Page Inicial</h1>

      <div className="container-home">
        <div className="nav">
          <Link className="link" to="/register">
            Sign Up
          </Link>
          <Link className="link" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

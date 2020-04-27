import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="cabecario">
      <img className="imgLogo" src={logo} alt="logoSite" />
      <input
        className="searchBar"
        type="text"
        placeholder="Pesquisar evento.."
      ></input>
      <Link className="linkR" to="/register">
        Sign Up
      </Link>
      <Link className="linkL" to="/login">
        Sign In
      </Link>
    </header>
  );
};

export default Header;

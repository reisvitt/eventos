import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import js from "../../assets/js.jpg";
import { OutlineButton, Button } from "../Button";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <section className="section-logo">
        <Link to="/">
          <img className="logo" src={logo} alt="logoSite" />
        </Link>
      </section>
      <section className="menu">
        <Link to="/">Meus eventos</Link>
        {<hr />}
        <div className="menu-profile">
          <img src={js} />
          <FaChevronDown className="icon" size={18} color="#fff" />
        </div>
      </section>
      {/*
      <section className="section-auth">
        <OutlineButton to="/login" title="Entrar" />
        <Button to="/register" title="Cadastrar" />
      </section>
    */}
    </header>
  );
};

export default Header;

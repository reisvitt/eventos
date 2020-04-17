import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logoImg from '../../assets/logo.png'

export default class Cabecario extends React.Component {

    render(){
        return(
            <header className="cabecario">
                <img className="imgLogo" src ={logoImg} alt = "logoSite"/>
                <input className= "searchBar" type="text" placeholder="Pesquisar evento.."></input>
                <Link className="linkR" to="/register">
                Sign Up 
                </Link>
                <Link className="linkL" to="/login">
                Sign In
                </Link>
            </header>
        );
    }

}
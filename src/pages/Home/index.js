import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logoImg from '../../assets/logo.png'
//import { FiPower, FiTrash2 } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="home">
      
      <div className="container-home">
        <div className="nav">
            <img className="imgLogo" src ={logoImg} alt = "logoSite"/>
            <input className= "searchBar" type="text" placeholder="Pesquisar evento.."></input>
            <Link className="linkR" to="/register">
              Sign Up 
            </Link>
            <Link className="linkL" to="/login">
              Sign In
            </Link>
            
        </div>
      </div>
      
      <ul>
        <li>
          <strong>Titulo do evento</strong>
          <p>Descrição do evento</p>
          <p>Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(120)}</p>
          <Link className="link" to="/details">
              Detalhes
          </Link>
        </li>

        <li>
          <strong>Titulo do evento</strong>
          <p>Descrição do evento</p>
          <p>Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(120)}</p>
          <Link className="link" to="/details">
              Detalhes
          </Link>
        </li>

        <li>
          <strong>Titulo do evento</strong>
          <p>Descrição do evento</p>
          <p>Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(120)}</p>
          <Link className="link" to="/details">
              Detalhes
          </Link>
        </li>

        <li>
          <strong>Titulo do evento</strong>
          <p>Descrição do evento</p>
          <p>Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(120)}</p>
          <Link className="link" to="/details">
              Detalhes
          </Link>
        </li>

        <li>
          <strong>Titulo do evento</strong>
          <p>Descrição do evento</p>
          <p>Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(120)}</p>
          <Link className="link" to="/details">
              Detalhes
          </Link>
        </li>

        <li>
          <strong>Titulo do evento</strong>
          <p>Descrição do evento</p>
          <p>Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(120)}</p>
          <Link className="link" to="/details">
              Detalhes
          </Link>
        </li>
      </ul>

    </div>
  );
};

export default Home;

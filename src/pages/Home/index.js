import React, { useEffect, useState }  from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logoImg from '../../assets/logo.png'
import api from '../../services/api';
//import { FiPower, FiTrash2 } from 'react-icons/fi';

const Home = () => {
  
  const[events,setEvents] = useState([]);

  useEffect(() => {
    api.get('/event/list', {
    
    }).then(response => {
        setEvents(response.data);
    })
  });

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
      {events.map(event => (
        <li key={event.id}>
          <strong>Titulo:</strong>
          <p>{event.title}</p>
          
          <strong>Descrição:</strong>
          <p>{event.description}</p>

          <p>Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(event.__v)}</p>
          <Link className="link" to="/details">
              Detalhes
          </Link>
        </li>
      ))}

      </ul>

    </div>
  );
};

export default Home;

import React, { useEffect, useState }  from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import api from '../../services/api';
import Cabecario from '../../components/Cabecario';
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
      
      <Cabecario />
      
      <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>Titulo:</strong>
              <p>{event.title}</p>
              
              <strong>Descrição:</strong>
              <p>{event.description}</p>

              <p> <strong>Valor: </strong> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(event.__v)}</p>
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

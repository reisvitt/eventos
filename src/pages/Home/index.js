import React, { useEffect, useState }  from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import api from '../../services/api';
import Cabecario from '../../components/Cabecario';
import imagem from '../../assets/secomp.png';
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
            <li>
              <div className="detailAtividade">
                  <div className="imagem">
                      <img src={imagem} alt="fotoAtividade"></img>
                  </div>
                  
                  <div className="textoDetail">
                      <strong className="titulo">{event.title}</strong>
                      <p className="data">22/10/2020, 23/10/2020 e 24/10/2020</p>
              
                      <p className="descricao">{event.description}</p>

                      <div className="horarioElocal">
                          <p><strong>Horário: </strong> 12:00</p>
                          <p><strong>Local: </strong> Modulo 1(preto)</p>
                          
                      </div>
                      <p><strong>Valor: </strong>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(event.__v)}</p>
                      <Link className="link" to="/details">
                        Detalhes
                      </Link>
                      
                  </div>
                  
              </div>

            </li>
          ))}

      </ul>

    </div>
  );
};

export default Home;

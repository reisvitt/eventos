import React from "react";
import "./styles.css";
import api from '../../services/api';
import Cabecario from '../../components/Cabecario';
import { Link } from "react-router-dom";


const Details = () =>{
    //falta botao de se inscrever
    return(
        <div className="details">
           
            <div className="conteudo">
                <div className="contEscrito">
                    <strong className="title">Semana de ciência da computação da UESB</strong>
                    <p className="descricao">descrição descrição descrição descrição descrição descrição descrição  </p>
                    <p className="numeroVal"> <strong className="valor">Valor: </strong> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(2000)}</p>
                </div>
                
            </div>
            
            <div className="botaoIns">
                <Link className="Inscrever" to="/details">
                    Inscrever
                </Link>
            </div>
            
            
            <ul>
                <li>
                    <strong>Titulo atividade:</strong>
                    <p>mini curso 1</p>
              
                    <strong>Descrição atividade:</strong>
                    <p>descricao atividade</p>

                    <strong>Horário:</strong>
                    <p>12:00</p>

                    <strong>Local:</strong>
                    <p>Modulo 1(preto)</p>

                </li>

                <li>
                    <strong>Titulo atividade:</strong>
                    <p>mini curso 2</p>
              
                    <strong>Descrição atividade:</strong>
                    <p>descricao atividade</p>

                    <strong>Horário:</strong>
                    <p>12:00</p>

                    <strong>Local:</strong>
                    <p>Modulo 1(preto)</p>

                </li>

                <li>
                    <strong>Titulo atividade:</strong>
                    <p>mini curso 3</p>
              
                    <strong>Descrição atividade:</strong>
                    <p>descricao atividade</p>

                    <strong>Horário:</strong>
                    <p>12:00</p>

                    <strong>Local:</strong>
                    <p>Modulo 1(preto)</p>

                </li>

                <li>
                    <strong>Titulo atividade:</strong>
                    <p>mini curso 4</p>
              
                    <strong>Descrição atividade:</strong>
                    <p>descricao atividade</p>

                    <strong>Horário:</strong>
                    <p>12:00</p>

                    <strong>Local:</strong>
                    <p>Modulo 1(preto)</p>

                </li>
            </ul>
            
        </div>
        
    );
};

export default Details;
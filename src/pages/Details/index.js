import React from "react";
import "./styles.css";
//import api from '../../services/api';
//import Cabecario from '../../components/Cabecario';
import { Link } from "react-router-dom";
import imagem from '../../assets/miniCursoRos.png';
import ministrante1 from '../../assets/brad_pitt.jpg';
import ministrante2 from '../../assets/indiana_jones.jpg';
import ministrante3 from '../../assets/tony_stark.jpg';


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
                    <div className="detailAtividade">
                        <div className="imagem">
                            <img src={imagem} alt="fotoAtividade"></img>
                        </div>
                        
                        <div className="textoDetail">
                            <strong className="titulo">Titulo da atividade</strong>
                            <p className="data">22/10/2020, 23/10/2020 e 24/10/2020</p>
                    
                            <p className="descricao">descricao do evento, simples e concisa, se for muito grande, deve ter os ... (3 pontinhos) para não atrapalhar a exibição dos autores</p>

                            <div className="horarioElocal">
                                <p><strong>Horário: </strong> 12:00</p>
                                <p><strong>Local: </strong> Modulo 1(preto)</p>
                            </div>
                            <div className="feitoPor">
                                <p>Por: </p>
                                <img src={ministrante1} alt="fotoAtividade1"></img>
                                <img src={ministrante2} alt="fotoAtividade2"></img>
                                <img src={ministrante3} alt="fotoAtividade3"></img>
                            </div>
                            
                        </div>
                        
                    </div>

                </li>

                <li>
                    <div className="detailAtividade">
                        <div className="imagem">
                            <img src={imagem} alt="fotoAtividade"></img>
                        </div>
                        
                        <div className="textoDetail">
                            <strong className="titulo">Titulo da atividade</strong>
                            <p className="data">22/10/2020, 23/10/2020 e 24/10/2020</p>
                    
                            <p className="descricao">descricao do evento, simples e concisa, se for muito grande, deve ter os ... (3 pontinhos) para não atrapalhar a exibição dos autores</p>

                            <div className="horarioElocal">
                                <p><strong>Horário: </strong> 12:00</p>
                                <p><strong>Local: </strong> Modulo 1(preto)</p>
                            </div>
                            <div className="feitoPor">
                                <p>Por: </p>
                                <img src={ministrante1} alt="fotoAtividade1"></img>
                                <img src={ministrante2} alt="fotoAtividade2"></img>
                                <img src={ministrante3} alt="fotoAtividade3"></img>
                            </div>
                            
                        </div>
                        
                    </div>

                </li>

                <li>
                    <div className="detailAtividade">
                        <div className="imagem">
                            <img src={imagem} alt="fotoAtividade"></img>
                        </div>
                        
                        <div className="textoDetail">
                            <strong className="titulo">Titulo da atividade</strong>
                            <p className="data">22/10/2020, 23/10/2020 e 24/10/2020</p>
                    
                            <p className="descricao">descricao do evento, simples e concisa, se for muito grande, deve ter os ... (3 pontinhos) para não atrapalhar a exibição dos autores</p>

                            <div className="horarioElocal">
                                <p><strong>Horário: </strong> 12:00</p>
                                <p><strong>Local: </strong> Modulo 1(preto)</p>
                            </div>
                            <div className="feitoPor">
                                <p>Por: </p>
                                <img src={ministrante1} alt="fotoAtividade1"></img>
                                <img src={ministrante2} alt="fotoAtividade2"></img>
                                <img src={ministrante3} alt="fotoAtividade3"></img>
                            </div>
                            
                        </div>
                        
                    </div>

                </li>

                <li>
                    <div className="detailAtividade">
                        <div className="imagem">
                            <img src={imagem} alt="fotoAtividade"></img>
                        </div>
                        
                        <div className="textoDetail">
                            <strong className="titulo">Titulo da atividade</strong>
                            <p className="data">22/10/2020, 23/10/2020 e 24/10/2020</p>
                    
                            <p className="descricao">descricao do evento, simples e concisa, se for muito grande, deve ter os ... (3 pontinhos) para não atrapalhar a exibição dos autores</p>

                            <div className="horarioElocal">
                                <p><strong>Horário: </strong> 12:00</p>
                                <p><strong>Local: </strong> Modulo 1(preto)</p>
                            </div>
                            <div className="feitoPor">
                                <p>Por: </p>
                                <img src={ministrante1} alt="fotoAtividade1"></img>
                                <img src={ministrante2} alt="fotoAtividade2"></img>
                                <img src={ministrante3} alt="fotoAtividade3"></img>
                            </div>
                            
                        </div>
                        
                    </div>

                </li>
                
            </ul>
            
        </div>
        
    );
};

export default Details;
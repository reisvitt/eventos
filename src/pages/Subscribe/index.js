import React, { useState } from "react";
import Campo from "../../components/Campo/";

import "./styles.css";

import { Link } from "react-router-dom";

const Subscribre = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  //funcao do render: retornar o conteudo html do componente App
  document.title = "Cadastrar";
  //<Campos text = "DATA/NASCI" type = "date" />

  const handleSubmit = e => {
    e.preventDefault();
    console.log("subscribe");
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <Campo
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            text="Nome completo"
          />
          <Campo
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            text="Senha"
            type="password"
          />
          <Campo
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            text="E-mail"
            type="email"
          />
          <Campo
            onChange={e => {
              setCpf(e.target.value);
            }}
            value={cpf}
            text="CPF"
            type="number"
          />
          <div className="container-link">
            <button type="submit" className="link">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  ); //fim return
}; //fim classe App

export default Subscribre;

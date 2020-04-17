import React, { useState } from "react";
import Campo from "../../components/Campo/";
import api from "../../services/api";
import { setToken } from '../../utils/auth'

import "./styles.css";

const Subscribre = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  document.title = "Cadastrar"; // title da pagina

  const handleSubmit = async e => {
    e.preventDefault();

    // fazer tratamento

    const name_user = name.split(" ", 2);

    const user = {
      first_name: name_user[0],
      last_name: name_user[1],
      email: email,
      name: name,
      cpf: cpf,
      password: password
    };

    const response = await api.post("/user", user);
    if (response.status === 201) {
      setToken(response.data.token)
      props.history.push("/");

    } else {
      setErrorMessage(response.data.message);
      setErrorVisible(true);

      setTimeout(() => {
        setErrorVisible(false);
      }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        {errorVisible ? (
          <label className="errorMessage">{erroMessage}</label>
        ) : null}
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

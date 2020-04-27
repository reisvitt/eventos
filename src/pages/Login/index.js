import React, { useState } from "react";
import Campo from "../../components/Campo";
import api from "../../services/api";

import { setToken, getToken } from "../../utils/auth";
import { Link, useHistory } from "react-router-dom";


import "./styles.css";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //funcao do render: retornar o conteudo html do componente App

  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await api.get("/login",{
      auth: {
        username: email,
        password: password  
      }
    })
    setToken(response.data.token)
    console.log(response.data)

    history.push('/')

    // console.log("email:", email);
    // console.log("senha:", password);
  };

  document.title = "Login";

  //<Campos text = "DATA/NASCI" type = "date" />
  return (
    <div className="container-login">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Campo
            text="E-mail"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            type="text"
          />
          <Campo
            text="Senha"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            type="password"
          />
          <div className="container-link">
            <button className="link" type="submit">
            Entrar
            {/* <Link className="link" to="/"> 
              Entrar
            </Link> */}
            </button>
          </div>
        </form>
      </div>
    </div>
  ); //fim return
}; //fim classe App

export default Login;

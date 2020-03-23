import React, { useState } from "react";
import Campo from "../../components/Campo";

import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //funcao do render: retornar o conteudo html do componente App

  const handleSubmit = e => {
    e.preventDefault();

    console.log("email:", email);
    console.log("senha:", password);
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
            alue={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            type="password"
          />
          <div className="container-link">
            <button className="link" type="submit">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  ); //fim return
}; //fim classe App

export default Login;

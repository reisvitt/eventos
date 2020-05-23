import React, { useState } from "react";
import Campo from "../../components/Campo";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../store/Auth";

import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { SignIn } = useAuthContext();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    SignIn(email, password)
      .then((response) => {
        history.push("/");
      })
      .catch((error) => {
        console.log("ERROR AO LOGAR");
        console.log(error);
      });
  };

  document.title = "Login";

  return (
    <div className="container-login">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Campo
            text="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
          />
          <Campo
            text="Senha"
            value={password}
            onChange={(e) => {
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

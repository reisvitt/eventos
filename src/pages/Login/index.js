import React, { useState } from "react";
import Base from "../../template/Base";

import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import ButtonForm from "../../components/FormComponents/ButtonForm";

import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../store/Auth";

import Title from "../../components/Theme/Title";

import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { SignIn } = useAuthContext();
  //funcao do render: retornar o conteudo html do componente App

  const history = useHistory();

  const handleSubmit = async (e) => {
    SignIn(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log("ERROR AO LOGAR");
        console.log(error);
      });
  };

  document.title = "Login";

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = "* Campo requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "* Endereço de email inválido";
    }
    if (!password) {
      errors.password = "* Campo requerido";
    }
    return errors;
  };

  return (
    <Base>
      <div className=" login-container">
        <div>
          <img
            src="https://cdn.worldvectorlogo.com/logos/react-1.svg"
            style={{ width: 500, color: "#4d4daa" }}
            alt="logo"
          />
        </div>
        <div className="form-content">
          <div className="title">
            <Title className="title-container" title="Entrar" />
          </div>
          <Formulary
            initialValues={{
              email: "",
              password: "",
            }}
            validate={validate}
            onSubmit={handleSubmit}
            content={
              <>
                <MyTextInput
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="Email do usuário"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <MyTextInput
                  label="Senha"
                  name="password"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </>
            }
            button={<ButtonForm type="submit" text="Entrar" />}
          />
        </div>
      </div>
    </Base>
  ); //fim return
}; //fim classe Login

export default Login;

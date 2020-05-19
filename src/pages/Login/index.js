import React, { useState } from "react";
import api from "../../services/api";

import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import ButtonForm from "../../components/FormComponents/ButtonForm";

import { setToken, getToken } from "../../utils/auth";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //funcao do render: retornar o conteudo html do componente App

  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await api.get("/login", {
      auth: {
        username: email,
        password: password
      }
    })
    setToken(response.data.token)
    console.log(response.data)
    alert('Você está logado! :)')
    history.push('/')


    try {
      const response = await api.get("/login", {
        headers: {
          authorization: [email, password],
        },
      });

      if (response.status === 200) {
        setToken(response.data.token);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  document.title = "Login";

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = '* Campo requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = '* Endereço de email inválido';
    }
    if (!password) {
      errors.password = '* Campo requerido';
    }
    return errors;
  };

  return (
    <div className="form-content">
      <h1 className="title-form">
        <strong>Login</strong>
      </h1>
      <Formulary
        initialValues={{
          email: '',
          password: '',
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
        button={
          <ButtonForm
            type="submit"
            text="Entrar"
          />
        }
      />
    </div>
  ); //fim return
}; //fim classe Login

export default Login;
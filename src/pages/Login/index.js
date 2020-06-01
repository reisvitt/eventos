import React, { useState } from "react";
import Base from "../../template/Base";
import * as Yup from "yup";

import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import ButtonForm from "../../components/FormComponents/ButtonForm";
import Title from "../../components/Theme/Title";
import { Error } from "../../components/Toast";

import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../store/Auth";


import "./styles.css";

const Login = () => {
  const { SignIn } = useAuthContext();
  //funcao do render: retornar o conteudo html do componente App

  const history = useHistory();

  const handleSubmit = async (e) => {
    SignIn(e.email, e.password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        Error(`Error ao entrar: ${error.message}`);
        console.log(error);
      });
  };

  document.title = "Entrar";

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('* Endereço de email inválido').required('* Campo requerido'),
    password: Yup.string().required('* Campo requerido'),
  })


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
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            content={
              <>
                <MyTextInput
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="Email do usuário"
                  
                />
                <MyTextInput
                  label="Senha"
                  name="password"
                  type="password"
                  placeholder="Senha"
                  
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

import React, { useState } from "react";
import Base from "../../template/Base";
import * as Yup from "yup";
import { Row, Col } from "reactstrap";
import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import ButtonForm from "../../components/FormComponents/ButtonForm";
import Title from "../../components/Theme/Title";
import { Error } from "../../components/Toast";

import ButtonLoader from "../../components/Button/ButtonLoader";

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
    email: Yup.string()
      .email("* Endereço de email inválido")
      .required("* Campo requerido"),
    password: Yup.string().required("* Campo requerido"),
  });

  return (
    <Base>
      <Row className="mt-3 d-flex align-items-center">
        <Col className="d-none d-lg-flex">
          <img
            src="https://cdn.worldvectorlogo.com/logos/react-1.svg"
            style={{ width: 500, color: "#4d4daa" }}
            alt="logo"
          />
        </Col>
        <Col className="form-content">
          <Formulary
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            content={
              <Row className="d-flex flex-column justify-content-center align-items-center">
                <Row
                  noGutters
                  className="col-10 col-sm-8 col-md-6 col-lg-10 d-flex"
                >
                  <Col xs={12}>
                    <Title className="title-container" title="Entrar" />
                  </Col>
                  <Col xs={12}>
                    <MyTextInput
                      label="Email"
                      name="email"
                      type="text"
                      placeholder="Email do usuário"
                    />
                  </Col>
                  <Col xs={12}>
                    <MyTextInput
                      label="Senha"
                      name="password"
                      type="password"
                      placeholder="Senha"
                    />
                  </Col>
                </Row>
              </Row>
            }
            button={
              <div className="default-button">
                <ButtonForm type="submit" text="Entrar" />
                {
                  //<ButtonLoader type="submit" text="Entrar" />
                }
              </div>
            }
          />
        </Col>
      </Row>
    </Base>
  ); //fim return
}; //fim classe Login

export default Login;

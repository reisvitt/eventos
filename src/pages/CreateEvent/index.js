import React, { useState, useEffect } from "react";
import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import MyTextAreaInput from "../../components/FormComponents/MyTextAreaInput";
import Datepicker from "../../components/FormComponents/Datepicker";
import ButtonForm from "../../components/FormComponents/ButtonForm";
import { saveEvent } from "../../services/endpoints";
import Base from "../../template/Base";
import Title from "../../components/Theme/Title";
import { FaCalendarAlt } from "react-icons/fa";
import { Success, Error } from "../../components/Toast";
import * as Yup from "yup";
import { Col, Row } from "reactstrap";

import "./styles.css";

const CreateEvent = (props) => {
  document.title = "Criar Evento"; // title of page

  const handleSubmit = async (form) => {
    saveEvent({
      title: form.title,
      start_date: form.start_date,
      end_date: form.end_date,
      address: [{ address: form.address, contact: "", email: "" }],
      description: form.description,
    })
      .then((response) => {
        Success("Evento Criado com sucesso!");
        props.history.push("/");
      })
      .catch((error) => {
        Error(`Falha ao criar evento: ${error.message}`);
      });
  };

  const schema = Yup.object().shape({
    title: Yup.string()
      .required("* Campo requerido")
      .max(100, "Máximo 100 caracteres"),
    start_date: Yup.date(),
    end_date: Yup.date().min(
      Yup.ref("start_date"),
      "O final do evento não pode ser antes de seu inicio!"
    ),
  });

  return (
    <Base>
      <Title title="Novo Evento" />
      <div className="form-content mt-5">
        <Formulary
          initialValues={{
            title: "",
            address: "",
            description: "",
            price: "",
            start_date: "",
            end_date: "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
          content={
            <Row>
              <Col xs={12}>
                <MyTextInput
                  label="* Nome do Evento"
                  name="title"
                  type="text"
                  placeholder="Nome do evento"
                />
              </Col>

              <Row noGutters className="col-12">
                <Col xs={12} sm={6} className="pr-1">
                  <Datepicker name="start_date" text="Início do evento" />
                </Col>
                <Col xs={12} sm={6} className="pl-1">
                  <Datepicker name="end_date" text="Fim do evento" />
                </Col>
              </Row>

              <Col xs={12}>
                <MyTextInput
                  label="Endereço"
                  name="address"
                  type="text"
                  placeholder="Local do evento"
                />
              </Col>
              <Col xs={12}>
                <MyTextAreaInput
                  label="Descrição"
                  name="description"
                  type="text"
                  placeholder="Descrição"
                />
              </Col>
            </Row>
          }
          button={<ButtonForm type="submit" text="Criar Evento" />}
        />
      </div>
    </Base>
  ); //fim return
}; //fim classe RegisterEvent

export default CreateEvent;

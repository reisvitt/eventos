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
      <div className="form-content">
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
            <>
              <MyTextInput
                label="* Nome do Evento"
                name="title"
                type="text"
                placeholder="Nome do evento"
              />

              <div className="row">
                <div className="col">
                  <Datepicker name="start_date" text="Início do evento" />
                </div>
                <div className="col">
                  <Datepicker name="end_date" text="Fim do evento" />
                </div>
              </div>
              <MyTextInput
                label="Endereço"
                name="address"
                type="text"
                placeholder="Local do evento"
              />
              <MyTextAreaInput
                label="Descrição"
                name="description"
                type="text"
                placeholder="Descrição"
              />
            </>
          }
          button={<ButtonForm type="submit" text="Criar Evento" />}
        />
      </div>
    </Base>
  ); //fim return
}; //fim classe RegisterEvent

export default CreateEvent;

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
//import { toast } from "react-toastify";

import "./styles.css";

const CreateEvent = (props) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const [title, setTitle] = useState("");
  const [startDateEvent, setStartDateEvent] = useState("");
  const [endDateEvent, setEndDateEvent] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [accountable, setAccountable] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [startSubscriptionEvent, setStartSubscriptionEvent] = useState("");
  const [endSubscriptionEvent, setEndSubscriptionEvent] = useState("");

  const [erroMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const [saving, setSaving] = useState(false);

  document.title = "Criar Evento"; // title of page

  const handleSubmit = async (e) => {
    setSaving(true);
    saveEvent({
      title,
      start_date: startDateEvent,
      end_date: endDateEvent,
      picture: "",
      address: [{ address, contact, email }],
      start_subscribe: startSubscriptionEvent,
      end_subscribe: endSubscriptionEvent,
      accountable: accountable,
      description: description,
      activities: [],
      price: price,
      assistants: [],
      is_available: true,
      payment_address: [],
    })
      .then((response) => {
        Success("Evento Criado com sucesso!");
        setSaving(false);
        props.history.push("/");
      })
      .catch((error) => {
        Error(`Falha ao criar evento: ${error.message}`);
        setSaving(false);
      });
  };

  const validate = () => {
    const errors = {};
    if (!title) {
      errors.title = "* Campo requerido";
    } else if (title.length > 15) {
      errors.title = "* Deve ter 15 caracteres ou menos";
    }
    return errors;
  };

  return (
    <Base>
      <Title title="Novo Evento" />
      <div className="form-content">
        {errorVisible ? (
          <label className="errorMessage">{erroMessage}</label>
        ) : null}
        <Formulary
          initialValues={{
            title: "",
            address: "",
            description: "",
            price: "",
          }}
          validate={validate}
          onSubmit={handleSubmit}
          content={
            <>
              <MyTextInput
                label="* Nome do Evento"
                name="title"
                type="text"
                placeholder="Nome do evento"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <div className="row">
                <div className="col">
                  <Datepicker
                    selected={startDateEvent}
                    onChange={(date) => {
                      setStartDateEvent(date);
                    }}
                    text="Início do evento"
                  />
                </div>
                <div className="col">
                  <Datepicker
                    selected={endDateEvent}
                    onChange={(date) => {
                      setEndDateEvent(date);
                    }}
                    text="Fim do evento"
                  >
                    <FaCalendarAlt size={20} color="#4d4faa" />
                  </Datepicker>
                </div>
              </div>
              <MyTextInput
                label="Endereço"
                name="address"
                type="text"
                placeholder="Local do evento"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <MyTextAreaInput
                label="Descrição"
                name="description"
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
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

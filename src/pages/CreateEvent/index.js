import React, { useState } from "react";
import Campo from "../../components/Campo";
import api from "../../services/api";

import "./styles.css";

const RegisterEvent = props => {

  //BD labels
  const [eventName, setEventName] = useState("");
  const [startDateEvent, setStartDateEvent] = useState("");
  const [endDateEvent, setEndDateEvent] = useState("");
  const [startSubscriptionEvent, setStartSubscriptionEvent] = useState("");
  const [endSubscriptionEvent, setEndSubscriptionEvent] = useState("");
  const [locale, setLocale] = useState("");
  const [description, setDescription] = useState("");

  //Mockup labels
  const [coordName, setCoordName] = useState("");
  const [assistentName, setAssistentName] = useState("");
  const [theme, setTheme] = useState("");
  const [numberParticipants, setNumberParticipants] = useState("");
  const [value, setValue] = useState("");

  const [erroMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  document.title = "Criar Evento"; // title of page

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Registered Event");

    //     // fazer tratamento

    const event = {
      //       first_name: name_user[0],
      //       last_name: name_user[1],
      //       email: email,
      //       name: name,
      //       cpf: cpf,
      //       password: password
    };

    //    const response = await api.post("/user", event);
    //    console.log("response", response);

    //   if (response.data.success) {
    //     console.log("success");
    //     props.history.push("/");
    //   } else {
    //     setErrorMessage(response.data.message);
    //     setErrorVisible(true);

    //     setTimeout(() => {
    //       setErrorVisible(false);
    //     }, 5000);
    //   }
  };

  return (
    <div className="content">
      <div className="form-content">
        {errorVisible ? (
          <label className="errorMessage">{erroMessage}</label>
        ) : null}
        <h1><strong>Criação do Evento</strong></h1>

        <form onSubmit={handleSubmit}>
          <Campo
            value={eventName}
            onChange={e => {
              setEventName(e.target.value);
            }}
            text="Nome do Evento"
          />
          <Campo
            value={coordName}
            onChange={e => {
              setCoordName(e.target.value);
            }}
            text="Coordenador"
          />
          <Campo
            value={assistentName}
            onChange={e => {
              setAssistentName(e.target.value);
            }}
            text="Nome Assistente"
          />
          <Campo
            value={theme}
            onChange={e => {
              setTheme(e.target.value);
            }}
            text="Tema"
          />
          <Campo
            value={numberParticipants}
            onChange={e => {
              setNumberParticipants(e.target.value);
            }}
            text="Numero de Participantes"
          />
          <Campo
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
            text="Valor do Evento"
          />
          <Campo
            value={startDateEvent}
            onChange={e => {
              setStartDateEvent(e.target.value);
            }}
            text="Início do evento"
          />
          <Campo
            value={endDateEvent}
            onChange={e => {
              setEndDateEvent(e.target.value);
            }}
            text="Término do evento"
          />
          <Campo
            value={startSubscriptionEvent}
            onChange={e => {
              setStartSubscriptionEvent(e.target.value);
            }}
            text="Início das incrições"
          />
          <Campo
            value={endSubscriptionEvent}
            onChange={e => {
              setEndSubscriptionEvent(e.target.value);
            }}
            text="Término das incrições"
          />
          <Campo
            value={locale}
            onChange={e => {
              setLocale(e.target.value);
            }}
            text="Localidade"
          />
          <div className="campo-container">
            <div>
              <label>Descrição</label>
            </div>
            <textarea
              className="input"
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div>
            <button type="submit" className="link">
              Criar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  ); //fim return
}; //fim classe RegisterEvent

export default RegisterEvent;

import React, { useState } from "react";
import Campo from "../../components/Campo/";
import api from "../../services/api";

import "./styles.css";

const Subscribre = props => {
   const [eventName, setEventName] = useState("");
   const [coordName, setCoordName] = useState("");
   const [assistentName, setAssistentName] = useState("");
   const [theme, setTheme] = useState("");
   const [duration, setDuration] = useState("");
   const [numberParticipants, setNumberParticipants] = useState(false);
   const [valor, setValor] = useState("");

//   document.title = "Criar"; // title da pagina

//   const handleSubmit = async e => {
//     e.preventDefault();
//     console.log("subscribe");

//     // fazer tratamento

//     const name_user = name.split(" ", 2);

//     const user = {
//       first_name: name_user[0],
//       last_name: name_user[1],
//       email: email,
//       name: name,
//       cpf: cpf,
//       password: password
//     };

//     const response = await api.post("/user", user);
//     console.log("response", response);

//     if (response.data.success) {
//       console.log("success");
//       props.history.push("/");
//     } else {
//       setErrorMessage(response.data.message);
//       setErrorVisible(true);

//       setTimeout(() => {
//         setErrorVisible(false);
//       }, 5000);
//     }
   //};

  return (
    <div className="container">
      <div className="form-container">
        {errorVisible ? (
          <label className="errorMessage">{erroMessage}</label>
        ) : null}
        <h1>Cadastro</h1>

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
            text="Nome Coordenador"
          />
          <Campo
            value={assistentName}
            onChange={e => {
              setAssistentName(e.target.value);
            }}
            text="Nome Assistente"
            type="Nome Assistente"
          />
          <Campo
            value={theme}
            onChange={e => {
              setTheme(e.target.value);
            }}
            text="Tema do Evento"
          />
          <Campo
            value={duration}
            onChange={e => {
              setDuration(e.target.value);
            }}
            text="Duração do evento"
          />
          <Campo
            value={numberParticipants}
            onChange={e => {
              setNumberParticipants(e.target.value);
            }}
            text="Numero de Participantes"
          />
          <Campo
            value={valor}
            onChange={e => {
              setValor(e.target.value);
            }}
            text="Valor do Evento"
          />

          <div className="container-link">
            <button type="submit" className="link">
              Cadastrar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  ); //fim return
}; //fim classe App

export default Subscribre;

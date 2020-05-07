import React, { useState } from "react";
import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import MyTextAreaInput from "../../components/FormComponents/MyTextAreaInput";
import Datepicker from "../../components/FormComponents/Datepicker";
import api from "../../services/api";
import { getToken } from "../../utils/auth";

import "./styles.css";

const validate = values => {
  console.log(values)
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 15) {
    errors.title = 'Must be 15 characters or less';
  }

  return errors;
};

const RegisterEvent = (props) => {
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

  document.title = "Criar Evento"; // title of page

  const handleSubmit = async e => {
    e.preventDefault();
    
    console.log(getToken('event-token'))
    const response = await api.post("/event", {
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
      headers: {
        authorization: getToken('event-token')
      }
    })

    console.log(response)

    if (response.status === 201) {
      props.history.push("/");
      alert("Evento criado com sucesso! :)")
    } else {
      setErrorMessage(response.data.error);
      setErrorVisible(true);

      setTimeout(() => {
        setErrorVisible(false);
      }, 5000);
    }
  };

  return (
    <div className="content">
      {errorVisible ? (
        <label className="errorMessage">{erroMessage}</label>
      ) : null}
      <h1>
        <strong>Criação do Evento</strong>
      </h1>
      <Formulary
        initialValues={{
          title: '',
          address: '',
          description: '',
        }}
        //validate={validate}
        //onSubmit={handleSubmit}
        content={
          <>
            <MyTextInput
              label="title"
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
                  onChange={date => {
                    setStartDateEvent(date)
                  }
                  }
                  text="Início do evento"
                />
              </div>
              <div className="col">
                <Datepicker
                  selected={endDateEvent}
                  onChange={date => {
                    setEndDateEvent(date)
                  }
                  }
                  text="Fim do evento"
                />
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
        button={
          <>
            <div>
              <button type="submit" className="link">
                Criar Evento
            </button>
            </div>
          </>
        }
      />
    </div>
  ); //fim return
}; //fim classe RegisterEvent

export default RegisterEvent;

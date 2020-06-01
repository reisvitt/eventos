import React, { useState, useEffect } from "react";
import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import MyTextAreaInput from "../../components/FormComponents/MyTextAreaInput";
import Datepicker from "../../components/FormComponents/Datepicker";
import ButtonForm from "../../components/FormComponents/ButtonForm";
import { saveEvent, getEvent } from "../../services/endpoints";
import Base from "../../template/Base";
import Title from "../../components/Theme/Title";
import { FaCalendarAlt } from "react-icons/fa";
import { Success, Error } from "../../components/Toast";
import { useParams } from "react-router-dom";
import JS from "../../assets/js.png";
import Loading from "../../components/Loading";
import * as Yup from "yup";
import DatePick from "react-datepicker";

import "./styles.css";

const EditEvent = (props) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const { id } = useParams();

  const [erroMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const [saving, setSaving] = useState(false);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  document.title = "Criar Evento"; // title of page

  useEffect(() => {
    // pegar as informações do BD
    setLoading(true);
    getEvent(id)
      .then((evento) => {
        console.log("EVENTO", evento.data);

        setEvent({
          accountable: evento.data.accountable || "",
          address: evento.data.address || "",
          description: evento.data.description || "",
          start_date: evento.data.start_date || "",
          end_date: evento.data.end_date || "",
          title: evento.data.title || "",
          payment_address: evento.data.payment_address || "",
          picture: evento.data.picture || JS,
          start_subscribe: evento.data.start_subscribe || "",
          end_subscribe: evento.data.end_subscribe || "",
          price: evento.data.price || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERRO AO CARREGAR DADOS:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    console.log("e", {
      ...e,
    });
    setSaving(true);
    /*saveEvent({
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
        Success("Evento atualizado com sucesso!");
        setSaving(false);
        props.history.push("/");
      })
      .catch((error) => {
        Error(`Falha ao atualizar evento: ${error.message}`);
        setSaving(false);
      });*/
  };

  const schema = Yup.object().shape({
    title: Yup.string("Campo requerido").max(100, "Máximo 100 caracteres!"),
    start_date: Yup.date(),
    end_date: Yup.date().min(
      Yup.ref("start_date"),
      "O final do evento não pode ser antes de seu inicio!"
    ),
    start_subscribe: Yup.date().max(
      Yup.ref("end_date"),
      "O inicio das incrições precisa ser antes do fim do evento!"
    ),
    end_subscribe: Yup.date()
      .min(
        Yup.ref("start_subscribe"),
        "O final das inscrições não pode ser antes de seu inicio!"
      )
      .max(
        Yup.ref("end_date"),
        "O final das inscriçõe precisa ser antes do final do evento!"
      ),
  });

  return (
    <Base>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Title title="Editar Evento" />
          <div className="form-content">
            {errorVisible ? (
              <label className="errorMessage">{erroMessage}</label>
            ) : null}
            <Formulary
              initialValues={event}
              validationSchema={schema}
              onSubmit={handleSubmit}
              content={
                <>
                  <MyTextInput
                    label="* Nome do Evento"
                    name="title"
                    key="title"
                    type="text"
                    placeholder="Nome do evento"
                  />
                  <div className="row">
                    <div className="col">
                      <Datepicker
                        text="Início do evento"
                        name="start_date"
                        type="text"
                      />
                    </div>

                    <div className="col">
                      <Datepicker
                        name="end_date"
                        type="text"
                        text="Fim do evento"
                      ></Datepicker>
                    </div>
                    <div className="col">
                      <Datepicker
                        name="start_subscribe"
                        type="text"
                        text="Início das inscrições"
                      />
                    </div>
                    <div className="col">
                      <Datepicker
                        name="end_subscribe"
                        type="text"
                        text="Fim das inscrições"
                      />
                    </div>
                  </div>
                  {/*
                  <MyTextInput
                    label="Endereço"
                    name="address"
                    type="text"
                    placeholder="Local do evento"
                  />
                  <MyTextInput
                    label="Contato"
                    name="contact"
                    type="text"
                    placeholder="Telefone/Celular"
                  />
                  <MyTextInput
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Endereço de email"
                  />

                  */}
                  <MyTextInput
                    label="Setor responsável"
                    name="accountable"
                    type="text"
                    placeholder="Setor responsável"
                  />
                  <MyTextAreaInput
                    label="Descrição"
                    name="description"
                    type="text"
                    placeholder="Descrição"
                  />
                </>
              }
              button={<ButtonForm type="submit" text="Salvar alterações" />}
            />
          </div>
        </>
      )}
    </Base>
  ); //fim return
}; //fim classe EditEvent

export default EditEvent;

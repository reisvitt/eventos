import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OutlineButton, Button } from "../../components/Button";
import { getEvent } from "../../services/endpoints";
import Base from "../../template/Base";
import ActivityCard from "../../components/ActivityCard";
import Assistants from "../../components/Assistants";
import Loading from "../../components/Loading";

import Modal from "../../components/Modal";
import ToastAnimated, { showToast } from "../../components/Toast/toast";
import "react-toastify/dist/ReactToastify.css";
import { Modal as ModalTeste } from "@material-ui/core";

import "./styles.css";

const Event = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = (value) => {
    console.log("value", value);
    setIsOpen(value);
  };

  useEffect(() => {
    getEvent(id)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("erro no load do evento", error);
        //toast de erro
        setLoading(false);
      });
  }, []);

  function handleSuccess() {
    showToast({ type: "success", message: "Mensagem de sucesso" });
  }

  function handleError() {
    showToast({ type: "warn", message: "Mensagem de erro" });
  }

  function showAssistents() {
    // essa informação já tem salvo no evento
    // mostra um modal com os assistents e o botao de adicionar.
    // os assistens que já estiverem cadastrados deve aparecer um lixeira ao lado para deletar
    // teve surgir outro modal para confirmação
  }

  if (loading) {
    return (
      <Base>
        <Loading />
      </Base>
    );
  }

  //falta botao de se inscrever
  return (
    <>
      {modalIsVisible ? (
        <Modal onClose={() => setModalIsVisible(false)} />
      ) : null}
      <Base>
        <div className="event-container">
          <div className="conteudo">
            <div className="contEscrito">
              <strong className="title">{event.title}</strong>
              <p className="descricao">{event.description}</p>
              <p className="numeroVal">
                {" "}
                <strong className="valor">Valor: {event.prince}</strong>{" "}
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(2000)}
              </p>
            </div>
          </div>

          <section className="controls">
            <Button
              onClick={() => setModalIsVisible(false)}
              title="Nova atividade"
            />

            <OutlineButton title="Inscrever-se" />
            <Button title="Assistentes" />
            <OutlineButton title="Editar evento" />
            <button onClick={() => toggle(true)}></button>
            <ToastAnimated />
          </section>

          <ModalTeste
            BackdropProps={{ style: { backgroundColor: "transparent" } }}
            open={isOpen}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            onClose={() => toggle(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Assistants />
          </ModalTeste>
          {}

          <div className="container-activities">
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
          </div>
        </div>
      </Base>
    </>
  );
};

export default Event;

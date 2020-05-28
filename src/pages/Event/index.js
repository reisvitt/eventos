import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OutlineButton, Button } from "../../components/Button";
import { getEvent } from "../../services/endpoints";
import Base from "../../template/Base";
import ActivityCard from "../../components/ActivityCard";
import Assistants from "../../components/Assistants";
import Loading from "../../components/Loading";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "@material-ui/core";

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
        //await new Promise((resolve) => setTimeout(resolve, 2000));
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("erro no load do evento", error);
        //toast de erro
        setLoading(false);
      });
  }, []);

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
            <button onClick={() => toggle(true)}></button>

            <Button title="Nova atividade" to={`/activity/create/${id}`} />
            <Button title="Editar atividade" to={`/event/edit/${id}`} />
          </section>
          {/*
            <Modal
            <Button title="Assistentes" />
            <OutlineButton title="Editar evento" />
            <OutlineButton title="Inscrever-se" />
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
            </Modal>

            */}

          <div className="container-activities">
            {event.activities.length > 0 ? (
              event.activities.map((activity) => (
                <ActivityCard key={activity._id} activity={activity} />
              ))
            ) : (
              <h2>Este evento ainda não possui nenhuma atividade!</h2>
            )}
          </div>
        </div>
      </Base>
    </>
  );
};

export default Event;

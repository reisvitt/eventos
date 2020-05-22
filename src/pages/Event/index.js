import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { OutlineButton, Button } from "../../components/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import api from "../../services/api";
import Base from "../../template/Base";
import ActivityCard from "../../components/ActivityCard";

import Modal from "../../components/Modal";
import Toast from "../../components/Toast/toast";
import ToastAnimated, { showToast } from "../../components/Toast/toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import "./styles.css";

const Event = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const { id } = useParams();


  useEffect(() => {
    api
      .get(`/event/${id}`)
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("erro no load do evento", error);
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
        <div className="loading">
          <h3>
            <AiOutlineLoading3Quarters className="icon-loading" />
          </h3>
        </div>
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
            <ToastAnimated />
            <button onClick={handleSuccess}>toast sucess!</button>
            <button onClick={handleError}>toast error!</button>
          </section>

          <ul>
            <li>
              <ActivityCard />
            </li>
            <li>
              <ActivityCard />
            </li>
            <li>
              <ActivityCard />
            </li>
            <li>
              <ActivityCard />
            </li>
            <li>
              <ActivityCard />
            </li>
            <li>
              <ActivityCard />
            </li>
            <li>
              <ActivityCard />
            </li>
            <li>
              <ActivityCard />
            </li>
            <li>
              <ActivityCard />
            </li>
          </ul>
        </div>
      </Base>
    </>
  );
};

export default Event;

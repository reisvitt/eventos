import React, { useState, useEffect } from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import Loading from "../../Loading";
import "./styles.css";
import api from "../../../services/api";
import { Success } from "../../Toast";

const AssistantCard = ({ add, user, id, reload }) => {
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);

  function handleClickUser() {
    //exibir um pop com algumas informações básicas do usuário
    // foto
    // email/
    // nome
    // e descricao
    // botao para abrir o perfil da pessoa em uma nova aba
  }

  function handleAddAssistant() {
    setAdding(true);
    api
      .post(`/event/${id}/assistant`, {
        email: user.email,
      })
      .then(() => {
        reload();
        setAdding(false);
        Success("Assistente adicionado!");
      })
      .catch((error) => {
        console.log("ERROR", error);
        setAdding(false);
      });
  }

  async function handleRemoveAssistant() {
    setDeleting(true);
    api
      .delete(`/event/${id}/assistant/${user.id}`)
      .then((response) => {
        console.log("RESPONSE", response);
        reload();
        setDeleting(false);
      })
      .catch((error) => {
        console.log("ERROR", error);
        setDeleting(false);
      });
  }

  return (
    <div className="container-assistant-card" title="Visualizar">
      <div className={`assistant ${adding && "adicionando"}`}>
        <span className="name">{user.name}</span>
        <span className="email">{user.email}</span>
      </div>
      {!add ? (
        <button
          className={!deleting ? "buttonIcon" : "loadingIcon"}
          title="Remover Assistente"
          onClick={handleRemoveAssistant}
        >
          {deleting ? (
            <Loading />
          ) : (
            <AiOutlineUserDelete className="icon" color={"red"} size={20} />
          )}
        </button>
      ) : (
        <button
          className={!adding ? "buttonIcon" : "loadingIcon"}
          title="Adicionar Assistente"
          onClick={handleAddAssistant}
        >
          {adding ? (
            <Loading />
          ) : (
            <AiOutlineUserAdd className="icon" color="green" size={20} />
          )}
        </button>
      )}
    </div>
  );
};

export default AssistantCard;

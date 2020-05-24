import React from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import "./styles.css";

const AssistantCard = ({ add, user }) => {
  function handleClickUser() {
    //exibir um pop com algumas informações básicas do usuário
    // foto
    // email/
    // nome
    // e descricao
    // botao para abrir o perfil da pessoa em uma nova aba
  }

  function handleRemoveAssistant() {}

  return (
    <div
      className="container-assistant-card"
      title="Visualizar"
      onClick={handleClickUser}
    >
      <div className="assistant">
        <span className="name">{user.name}</span>
        <span className="email">{user.email}</span>
      </div>
      {!add && (
        <button
          className="buttonIcon"
          title="Remover Assistente"
          onClick={handleRemoveAssistant}
        >
          <AiOutlineUserDelete className="icon" color={"red"} size={20} />
        </button>
      )}
    </div>
  );
};

export default AssistantCard;

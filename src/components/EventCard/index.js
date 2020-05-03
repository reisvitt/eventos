import React from "react";
import image from "../../assets/js.jpg";
import "./styles.css";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  function getThreeWordsOfMonth() {
    // retorna as tres primeiras letras do mes em questao
  }

  function getDate() {
    // se o evento começar e acabar no mesmo dia, deve retornar uma unica data
    return (
      <>
        <span className="month">Nov</span>
        <span className="day">14</span>
        <span className="to">à</span>
        <span className="month">Nov</span>
        <span className="day">30</span>
      </>
    );
  }

  return (
    <div className="event-card">
      <div className="container-price">
        <span className="price">R$ 15,00</span>
      </div>
      <Link to={`/event/${event._id}`}>
        <img src={image} alt="event-img"></img>
      </Link>
      <div className="about">
        <div className="data">{getDate()}</div>
        <div className="details">
          <Link to={`/event/${event._id}`}>
            <h3 className="title">{event.title}</h3>
          </Link>
          <span className="description">{event.description}</span>
          <span className="accountable">{event.accountable}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

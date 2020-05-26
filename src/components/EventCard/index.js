import React from "react";
import image from "../../assets/js.jpg";
import "./styles.css";
import { Link } from "react-router-dom";
import { getMonthName, getDay, getMonth, getYear } from "../../utils/Date";
const EventCard = ({ event }) => {
  function getThreeWordsOfMonth() {
    // retorna as tres primeiras letras do mes em questao
  }

  function getDate() {
    const dayStart = getDay(event.start_date);
    const dayEnd = getDay(event.end_date);
    const monthStart = getMonthName(event.start_date);
    const monthEnd = getMonthName(event.end_date);
    const yearStart = getYear(event.start_date);
    const yearEnd = getYear(event.end_date);
    //const dateNow = new Date().getFullYear();

    if (yearStart === yearEnd) {
      if (monthStart === monthEnd) {
        if (dayStart === dayEnd) {
          // mesmo dia

          return (
            <>
              <span className="day">{dayStart}</span>
              <span className="month">{monthStart}</span>
            </>
          );
        }
      }
    }
    return (
      <>
        <span className="month">{monthStart}</span>
        <span className="day">{dayStart}</span>
        <span className="to">à</span>
        <span className="day">{dayEnd}</span>
        <span className="month">{monthEnd}</span>
      </>
    );
  }

  return (
    <div className="event-card">
      <Link to={`/event/${event._id}`}>
        <img src={event.picture || image} alt="event-img"></img>
      </Link>
      <div className="about">
        <div className="data">{getDate()}</div>
        <div className="details">
          <Link to={`/event/${event._id}`}>
            <h3 className="title">{event.title}</h3>
          </Link>
          <div className="divDescrition">
            <span className="description">{event.description}</span>
          </div>
          <span className="accountable">{event.accountable}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import EventCard from "../../components/EventCard";
import Base from "../../template/Base";
import { getAllEvents } from "../../services/endpoints";
import { Container, Row, Col } from "reactstrap";

import "./styles.css";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents()
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setEvents(response.data);
        setLoading(false);
      })
      .catch(async (error) => {
        // exibir TOAST com o erro
        console.log("ERRO AO CARREGAR EVENTOS");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Base>
        <div className="loading">
          <h3>
            Carregando próximos eventos...
            <AiOutlineLoading3Quarters className="icon-loading" />
          </h3>
        </div>
      </Base>
    );
  }

  return (
    <Base>
      <div className="home">
        <h2>Próximos eventos</h2>
        <div className="row">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Home;

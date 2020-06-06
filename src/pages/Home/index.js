import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import EventCard from "../../components/EventCard";
import Base from "../../template/Base";
import { getAllEvents } from "../../services/endpoints";
import Title from "../../components/Theme/Title";
import { Row } from "reactstrap";

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
        <Title title="Próximos Eventos" />
        <Row noGutters className="mt-4">
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <h2>Nenhum evento disponível até o momento</h2>
          )}
        </Row>
      </div>
    </Base>
  );
};

export default Home;

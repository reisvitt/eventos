import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import EventCard from "../../components/EventCard";
import "./styles.css";
import Base from "../../template/Base";
import api from "../../services/api";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/event/list")
      .then(async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setEvents(response.data);
        setLoading(false);
      })
      .catch(async (error) => {
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
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </Base>
  );
};

export default Home;

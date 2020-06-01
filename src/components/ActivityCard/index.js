import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { getMonthName, getDay, getMonth, getYear } from "../../utils/Date";
import "./styles.css";

import image from "../../assets/js.jpg";

const ActivityCard = ({ activity }) => {
  const { id } = useParams();

  useEffect(() => {
    console.log("ACTIVITY", { activity });
  }, []);

  function getDate() {
    if (!activity.start_date && !activity.end_date) {
      return "Sem data até o momento";
    }
    const dayStart = getDay(activity.start_date);
    const dayEnd = getDay(activity.end_date);
    const monthStart = getMonthName(activity.start_date);
    const monthEnd = getMonthName(activity.end_date);
    const yearStart = getYear(activity.start_date);
    const yearEnd = getYear(activity.end_date);
    //const dateNow = new Date().getFullYear();

    if (yearStart === yearEnd) {
      if (monthStart === monthEnd) {
        if (dayStart === dayEnd) {
          // mesmo dia

          return `Data: ${dayStart} de ${monthStart}`;
        } else {
          return `Data: De ${dayStart} à ${dayEnd} de ${monthStart}`;
        }
      } else {
        return `Data: De ${dayStart} de ${monthStart} à ${dayEnd} de ${monthEnd}`;
      }
    } else {
      return `Data: De ${dayStart} de ${monthStart} de ${yearStart} à ${dayEnd} de ${monthEnd} de ${yearEnd}`;
    }
  }

  return (
    <div className="activity-card">
      <Link to={`/event/${id}/${activity._id}`}>
        <img
          className="picture"
          src={activity.picture || image}
          alt="activity"
        />
      </Link>

      <div className="about">
        <div className="title-container">
          <Link to={`/event/${id}/${activity}`}>
            <h3 className="title">{activity.title}</h3>
          </Link>
          <span className="info">Vagas restantes</span>
          <IconButton className="more-vert">
            <MoreVert size={25} style={{ color: "#363636" }} />
          </IconButton>
        </div>
        <label className="data">{getDate()}</label>

        <div className="description">
          <p>{activity.description}</p>
        </div>
        <div className="support-container">
          <span>Por: </span>
          <ul>
            <li>
              <a href="link do profile do usuário">
                <img
                  src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                  alt="alt"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;

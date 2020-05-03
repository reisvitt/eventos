import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";
import { MoreVert } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import "./styles.css";

import image from "../../assets/js.jpg";

const ActivityCard = ({ activity }) => {
  const { id } = useParams();

  useEffect(() => {
    //api.get("activity")
  }, []);

  return (
    <div className="activity-card">
      <Link to={`/event/${id}/${activity}`}>
        <img className="picture" src={image} alt="activity" />
      </Link>

      <div className="about">
        <div className="title-container">
          <Link to={`/event/${id}/${activity}`}>
            <h3 className="title">Título da atividade</h3>
          </Link>
          <span className="info">Vagas restantes</span>
          <IconButton className="more-vert">
            <MoreVert size={25} style={{ color: "#363636" }} />
          </IconButton>
        </div>
        <label className="data">
          Data: De <strong>14</strong> à <strong>30</strong> de outubro
        </label>

        <div className="description">
          <p>
            sku asdkysadhsdksad soaiuds dsadhjsakudsakd saduaskdjsa dsaoidhsakud
            sa skaudhskauds sakduhkuds aksudhukasd asduashdask dasudasd asdukasd
            sadukasd sadukbs sakdhasd sakudbasdk sakdhasd sakudbasdk sakdhasd
            sakudbasdk vv sakudbasdk vv sakudbasdk vv sakudbasdk vv
          </p>
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

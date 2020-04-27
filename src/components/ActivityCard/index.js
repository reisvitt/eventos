import React from "react";
import { MoreVert } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import "./styles.css";

const ActivityCard = ({ activity }) => {
  return (
    <div className="activity-card">
      <a href="link para a atividade">
        <img
          className="picture"
          src="https://c4.wallpaperflare.com/wallpaper/966/672/905/javascript-minimalism-wallpaper-preview.jpg"
          alt="activity"
        />
      </a>

      <div className="more">
        <div className="title-container">
          <a href="link para a atividade">
            <h3 className="title">Título da atividade</h3>
          </a>
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
            sadukasd sadukbs sakdhasd sakudbasdk
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

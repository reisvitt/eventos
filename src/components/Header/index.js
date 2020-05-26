import React from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import js from "../../assets/js.jpg";

import { removeToken } from "../../utils/auth";

import { OutlineButton, Button } from "../Button";
import { FaChevronDown } from "react-icons/fa";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { useAuthContext } from "../../store/Auth";

const StyledMenu = withStyles({
  paper: {
    width: "220px",
    background: "#4d4faa",
    color: "white",
    paddingRight: "20px",
    paddingLeft: "20px",
  },
})((props) => (
  <Menu
    disableScrollLock={true}
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Header = () => {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { SignOut, user } = useAuthContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const HandleLogOut = () => {
    SignOut();
    history.push("/");
  };

  const handleCreateEvent = () => {
    history.push("/event/create");
  };

  return (
    <header>
      <section className="section-logo">
        <Link to="/">
          <img className="logo" src={logo} alt="logoSite" />
        </Link>
      </section>
      {user ? (
        <section className="menu">
          <div className="mainMenu">
            <Link to="/">Meus eventos</Link>
            <Link to="/">Novo Evento</Link>
          </div>
          {<hr />}
          <div className="menu-profile">
            <img src={user.avatar || js} alt="profile" />
            <FaChevronDown
              className="icon"
              size={18}
              color="#fff"
              onClick={handleClick}
            />

            <div className="open">
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    outline: "none",
                    margin: 10,
                  }}
                >
                  {user.name}
                </p>

                <Divider style={{ backgroundColor: "#fff" }} />

                <StyledMenuItem style={{ outline: "none" }}>
                  Meu Perfil
                </StyledMenuItem>

                <StyledMenuItem
                  style={{ outline: "none" }}
                  onClick={handleCreateEvent}
                >
                  Criar Novo Evento
                </StyledMenuItem>

                <StyledMenuItem style={{ outline: "none" }}>
                  Configurações
                </StyledMenuItem>

                <Divider style={{ backgroundColor: "#fff" }} />
                <StyledMenuItem
                  onClick={HandleLogOut}
                  style={{ outline: "none" }}
                >
                  Logout
                </StyledMenuItem>
              </StyledMenu>
            </div>
          </div>
        </section>
      ) : (
        <section className="section-auth">
          <OutlineButton to="/login" title="Entrar" />
          <Button to="/register" title="Cadastrar" />
        </section>
      )}
    </header>
  );
};

export default Header;

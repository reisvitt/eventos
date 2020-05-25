import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./../pages/Home";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import Activity from "./../pages/Activity";
import Event from "./../pages/Event";
import PageError from "./../pages/Error";
import CreateEvent from "./../pages/CreateEvent";
import CreateActivity from "../pages/CreateActivity";
import { useAuthContext } from "../store/Auth";
import { Success, Warn } from "../components/Toast";

const NoAuthRouter = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Component {...props} />
        ) : (
          (Warn("Você já está logado!"), (<Redirect to="/" />))
        )
      }
    />
  );
};

const PrivateRouter = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const Routers = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <NoAuthRouter path="/register" exact component={Register} />
      <NoAuthRouter path="/login" exact component={Login} />
      <Route path="/activity/create/:id" exact component={CreateActivity} />
      <Route path="/activity" exact component={Activity} />
      <Route path="/event" exact component={Event} />
      <Route path="/event/create" exact component={CreateEvent} />
      <Route path="/event/:id" exact component={Event} />
      <Route component={PageError} />
    </Switch>
  </BrowserRouter>
);

export default Routers;

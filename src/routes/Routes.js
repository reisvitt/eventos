import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./../pages/Home";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import Activity from "./../pages/Activity";
import Event from "./../pages/Event";
import Error from "./../pages/Error";
import CreateEvent from "./../pages/CreateEvent";
import CreateActivity from "../pages/createActivity";
const Routers = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/activity/create/:id" exact component={CreateActivity} />
      <Route path="/activity" exact component={Activity} />
      <Route path="/event" exact component={Event} />
      <Route path="/event/create" exact component={CreateEvent} />

      <Route path="/event/:id" exact component={Event} />
      <Route path="/error" component={Error} />
    </Switch>
  </BrowserRouter>
);

export default Routers;

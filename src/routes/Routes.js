import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './../pages/Home'
import Subscribe from './../pages/Subscribe'
import Login from './../pages/Login'
import Activity from './../pages/Activity'
import Error from './../pages/Error'

const Routers = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/subscribe" exact component={Subscribe} />
      <Route path="/login" exact component={Login} />
      <Route path="/activity" exact component={Activity} />
      <Route path="/error" component={Error} />

    </Switch>

  </BrowserRouter>
)
 
export default Routers
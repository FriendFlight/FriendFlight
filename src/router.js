import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Test from './components/Test/Test'

export default (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={Test} path="/test"/>
  </Switch>)

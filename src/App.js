import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Page/Home";
import Spreasheets from "./Page/Spreasheets";
function App() {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/spreadsheets' component={Spreasheets} />
    </Switch>
  );
}

export default App;

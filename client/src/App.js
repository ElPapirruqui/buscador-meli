import React from "react";

import Home from "./pages/home";
import Items from "./pages/items";
import Detail from "./pages/detail";

import "./App.css";
import "./loading.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/items" component={Items} />
        <Route exact path="/items/:id" component={Detail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import "../styles/App.css";
import { Switch, Route } from "react-router";
import Home from "./Home/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
);
}

export default App;

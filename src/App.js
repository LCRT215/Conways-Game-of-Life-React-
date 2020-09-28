import React from "react";
import "./App.css";
import Copyright from "./components/Copyright";
import Rules from "./components/Rules";
import Game from "./components/Game";
import About from "./components/About";
const App = () => {
  return (
    <div className="app">
      <h1 style={{ color: "#87d4c4", textAlign: "center", fontSize:"36px"}}>
        Conway's Game of Life
      </h1>

      <Game />
      <About />
      <Copyright />
    </div>
  );
};

export default App;

import React, { useState } from "react";
import "../styles/App.css";
import figures from "../data.json";
import Revolver from "./Revolver";

const App = () => {
  const [index, setIndex] = useState(0);
  const currentFigure = figures[index];

  const incrementIndex = () =>
    setIndex((prev) => (prev < figures.length - 1 ? prev + 1 : 0));

  return (
    <div className="App">
      <header>
        <h1>{currentFigure.title}</h1>
      </header>
      <main>
        <div className="content" data-testid="content">
          {currentFigure.text}
        </div>
        <Revolver incrementIndex={incrementIndex} />
      </main>
    </div>
  );
};

export default App;

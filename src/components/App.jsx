import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/App.css";
import Revolver from "./Revolver";
import Content from "./Content";

const App = ({ figures }) => {
  const [index, setIndex] = useState(0);
  const figure = figures[index];

  const incrementIndex = () =>
    setIndex((prev) => (prev < figures.length - 1 ? prev + 1 : 0));

  return (
    <div className="App">
      <header>
        <h1>{figure.title}</h1>
      </header>
      <main>
        <Content figure={figure} />
        <Revolver
          incrementIndex={incrementIndex}
          index={index}
          figures={figures}
        />
      </main>
    </div>
  );
};

App.propTypes = {
  figures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      angle: PropTypes.number,
      text: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default App;

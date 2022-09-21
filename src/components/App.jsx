import React from "react";
import "../styles/App.css";
import Revolver from "./Revolver";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>title</h1>
      </header>
      <main>
        <div className="content" data-testid="content">
          Content
        </div>
        <Revolver />
      </main>
    </div>
  );
};

export default App;

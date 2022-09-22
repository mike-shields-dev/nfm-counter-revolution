import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import figures from "./data.json";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App figures={figures} />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { DiscProvider } from "./context/DiscContext";
import "./styles/index.css";
import data from "./data.json";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DiscProvider>
      <App figures={data.figures} />
    </DiscProvider>
  </React.StrictMode>
);

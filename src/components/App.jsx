import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/App.css";
import Content from "./Content";
import DiscController from "./DiscController";

const App = ({ figures }) => {
  const baseAnimationDurationMs = 1200;
  const appIdleTimerDurationMillis = 5000;
  const [index, setIndex] = useState(0);
  const [isAppIdle, setIsAppIdle] = useState(true);
  const [appIdleTimer, setAppIdleTimer] = useState();

  const incrementIndex = () =>
    setIndex((prev) => (prev < figures.length - 1 ? prev + 1 : 0));

  const startAppIdleTimer = () => {
    setIsAppIdle(false);
    setAppIdleTimer(clearTimeout(appIdleTimer));
  };

  useEffect(() => {
    const doc = document.documentElement;
    doc.style.setProperty(
      "--base-animation-duration",
      `${baseAnimationDurationMs}ms`
    );
  }, []);

  useEffect(() => {
    if (!(isAppIdle || appIdleTimer)) {
      setAppIdleTimer(
        setTimeout(() => {
          setIsAppIdle(true);
          setAppIdleTimer(clearTimeout(appIdleTimer));
        }, appIdleTimerDurationMillis)
      );
    }
    return () => clearTimeout(appIdleTimer);
  }, [isAppIdle, appIdleTimer]);

  return (
    <div className="App">
      <main>
        <DiscController
          incrementIndex={incrementIndex}
          setIndex={setIndex}
          index={index}
          figures={figures}
          baseAnimationDurationMs={baseAnimationDurationMs}
          startAppIdleTimer={startAppIdleTimer}
          isAppIdle={isAppIdle}
        />
        <Content
          figures={figures}
          index={index}
          baseAnimationDurationMs={baseAnimationDurationMs}
          isAppIdle={isAppIdle}
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

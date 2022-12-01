import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Content from "./Content";
import Disc from "./Disc";

const App = ({ figures }) => {
  const appIdleTimerDurationMillis = 5000;
  const [appIdleTimer, setAppIdleTimer] = useState();
  const baseAnimationDurationMillis = 2400;
  const [index, setIndex] = useState(0);
  const [isAppIdle, setIsAppIdle] = useState(false);

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
      `${baseAnimationDurationMillis}ms`
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
        <Disc
          {...{
            baseAnimationDurationMillis,
            figures,
            incrementIndex,
            index,
            isAppIdle,
            startAppIdleTimer,
            setIndex,
          }}
        />
        <Content
          {...{
            figures,
            index,
            baseAnimationDurationMillis,
            isAppIdle,
          }}
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

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Content from "./Content";
import Disc from "./Disc";
import Button from "./Button";
import { DiscContext } from "../context/DiscContext";
import getRotationDeg from "../utils/getRotationDeg";
import data from "../data.json";

const { figures } = data;

const App = () => {
  const { discRef, setIndex } = useContext(DiscContext);
  const [discAnimDuration, setDiscAnimDuration] = useState(0);
  const [discAnimIterations, setDiscAnimIterations] = useState(Infinity);
  const [discAnimStartAngle, setDiscAnimStartAngle] = useState(0);
  const [discAnimEndAngle, setDiscAnimEndAngle] = useState(0);
  const [isClickDisabled, setClickDisabled] = useState(false);
  const idleTimerDuration = 2000;
  const [idleTimer, setIdleTimer] = useState();
  const baseAnimDurationMs = 1200;
  const [isIdle, setIsIdle] = useState(true);
  const maxFigureAngle = figures[figures.length - 1].angle;

  const resetIdleTimer = () => {
    setIsIdle(false);
    setIdleTimer(clearTimeout(idleTimer));
  };

  const enableTouch = () => setClickDisabled(false);

  const handleClick = () => {
    const currDiscAngle = getRotationDeg(discRef.current);
    const startAnimAngle =
      -currDiscAngle >= maxFigureAngle ? currDiscAngle + 360 : currDiscAngle;
    const foundIndex = figures.findIndex((fig) => fig.angle > -startAnimAngle);
    const nextIndex = foundIndex < 0 ? 0 : foundIndex;
    const endAnimAngle = -figures[nextIndex].angle;

    setDiscAnimStartAngle(startAnimAngle);
    setDiscAnimEndAngle(endAnimAngle);
    setDiscAnimDuration(baseAnimDurationMs);
    setDiscAnimIterations(1);
    setIndex(nextIndex);
    setClickDisabled(true);
    resetIdleTimer();
  };

  useEffect(() => {
    const docEl = document.documentElement;
    docEl.style.setProperty(
      "--base-animation-duration",
      `${baseAnimDurationMs}ms`
    );
  }, []);

  useEffect(() => {
    if (isIdle) {
      const currDiscAngle = getRotationDeg(discRef.current);
      setDiscAnimDuration(baseAnimDurationMs * 60);
      setDiscAnimEndAngle(currDiscAngle - 360);
      setDiscAnimStartAngle(currDiscAngle);
      setDiscAnimIterations(Infinity);
    }
  }, [
    baseAnimDurationMs,
    discRef,
    isIdle,
    maxFigureAngle,
    setDiscAnimEndAngle,
    setDiscAnimStartAngle,
  ]);

  useEffect(() => {
    if (!(isIdle || idleTimer)) {
      setIdleTimer(
        setTimeout(() => {
          setIsIdle(true);
          setIdleTimer(clearTimeout(idleTimer));
        }, idleTimerDuration)
      );
    }
    return () => clearTimeout(idleTimer);
  }, [isIdle, idleTimer]);

  useEffect(() => {
    const discAnim = discRef.current.animate(
      [
        { transform: `rotate(${discAnimStartAngle}deg)` },
        { transform: `rotate(${discAnimEndAngle}deg)` },
      ],
      {
        iterations: discAnimIterations,
        duration: discAnimDuration,
        fill: "forwards",
        easing: `${isIdle ? "linear" : "ease"}`,
      }
    );

    discAnim.addEventListener("finish", enableTouch);
    return () => discAnim.removeEventListener("finish", enableTouch);
  }, [
    discAnimStartAngle,
    discAnimEndAngle,
    discAnimDuration,
    discAnimIterations,
    isIdle,
    discRef,
  ]);

  return (
    <div className="App">
      <main>
        <Disc
          {...{
            baseAnimDurationMs,
            figures,
            isIdle,
            isClickDisabled,
            resetIdleTimer,
          }}
        />
        <Content
          {...{
            baseAnimDurationMs,
            figures,
            isIdle,
          }}
        />
      </main>
      <Button {...{ handleClick, isClickDisabled }} />
    </div>
  );
};

App.propTypes = {
  figures: PropTypes.arrayOf(
    PropTypes.shape({
      angle: PropTypes.number,
      id: PropTypes.number,
      text: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
    })
  ).isRequired,
};

export default App;

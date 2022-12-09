import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Content from "./Content";
import Disc from "./Disc";
import Button from "./Button";
import { DiscContext } from "../context/DiscContext";
import getDiscAngle from "../utils/getDiscAngle";
import data from "../data.json";

const { figures } = data;

const App = () => {
  const { discRef, setIndex } = useContext(DiscContext);
  const [discAnimDuration, setDiscAnimDuration] = useState(0);
  const [discAnimIterations, setDiscAnimIterations] = useState(Infinity);
  const [discAnimStartAngle, setDiscAnimStartAngle] = useState(0);
  const [discAnimEndAngle, setDiscAnimEndAngle] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const appIdleTimerDurationMillis = 180000;
  const [appIdleTimer, setAppIdleTimer] = useState();
  const baseAnimationDurationMillis = 1200;
  const [isAppIdle, setIsAppIdle] = useState(true);
  const maxFigureAngle = figures[figures.length - 1].angle;

  const startAppIdleTimer = () => {
    setIsAppIdle(false);
    setAppIdleTimer(clearTimeout(appIdleTimer));
  };

  const handleClick = () => {
    const disc = discRef.current;
    let discAngle = getDiscAngle(disc);
    const diffAngle = -discAngle;
    let nextIndex = figures.findIndex((fig) => fig.angle > diffAngle);
    nextIndex = nextIndex < 0 ? 0 : nextIndex;
    const nextFigureAngle = figures[nextIndex].angle;
    const newDiscAngle = discAngle - (nextFigureAngle - diffAngle);
    if (-discAngle >= maxFigureAngle) {
      discAngle += 360;
    }
    startAppIdleTimer();
    setIsDisabled(true);
    setDiscAnimStartAngle(discAngle);
    setDiscAnimEndAngle(newDiscAngle);
    setIndex(nextIndex);
    setDiscAnimDuration(baseAnimationDurationMillis);
    setDiscAnimIterations(1);
  };

  useEffect(() => {
    const doc = document.documentElement;
    doc.style.setProperty(
      "--base-animation-duration",
      `${baseAnimationDurationMillis}ms`
    );
  }, []);

  useEffect(() => {
    const discAngle = getDiscAngle(discRef.current);
    if (isAppIdle) {
      setDiscAnimStartAngle(discAngle);
      setDiscAnimEndAngle(discAngle - 360);
      setDiscAnimDuration(baseAnimationDurationMillis * 60);
      setDiscAnimIterations(Infinity);
    }
  }, [
    isAppIdle,
    baseAnimationDurationMillis,
    maxFigureAngle,
    discRef,
    setDiscAnimStartAngle,
    setDiscAnimEndAngle,
  ]);

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

  useEffect(() => {
    let animation = null;
    animation = discRef.current.animate(
      [
        { transform: `rotate(${discAnimStartAngle}deg)` },
        { transform: `rotate(${discAnimEndAngle}deg)` },
      ],
      {
        iterations: discAnimIterations,
        duration: discAnimDuration,
        fill: "forwards",
        easing: `${isAppIdle ? "linear" : "ease"}`,
      }
    );
    animation.addEventListener("finish", () => {
      setIsDisabled(false);
    });
    return () =>
      animation.removeEventListener("finish", () => {
        setIsDisabled(false);
      });
  }, [
    discAnimStartAngle,
    discAnimEndAngle,
    discAnimDuration,
    discAnimIterations,
    isAppIdle,
    discRef,
  ]);

  return (
    <div className="App">
      <main>
        <Disc
          {...{
            baseAnimationDurationMillis,
            figures,
            isAppIdle,
            isDisabled,
            startAppIdleTimer,
          }}
        />
        <Content
          {...{
            figures,
            baseAnimationDurationMillis,
            isAppIdle,
          }}
        />
      </main>
      <Button {...{ handleClick, isDisabled }} />
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

import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { IndexContext } from "../../context/IndexContext";
import getDiscAngle from "../../utils/getDiscAngle";
import css from "./styles.module.css";

const Disc = ({
  baseAnimationDurationMillis,
  figures,
  isAppIdle,
  startAppIdleTimer,
}) => {
  const { index, setIndex } = useContext(IndexContext);
  const discRef = useRef();
  const [isDiscDisabled, setDiscDisabled] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [endAngle, setEndAngle] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [animationIterations, setAnimationIterations] = useState(Infinity);
  const maxFigureAngle = figures[figures.length - 1].angle;

  console.log({ index });

  useEffect(() => {
    const discAngle = getDiscAngle(discRef.current);
    if (isAppIdle) {
      setStartAngle(discAngle);
      setEndAngle(discAngle - 360);
      setAnimationDuration(baseAnimationDurationMillis * 60);
      setAnimationIterations(Infinity);
    }
  }, [isAppIdle, baseAnimationDurationMillis, maxFigureAngle]);

  useEffect(() => {
    let animation = null;
    animation = discRef.current.animate(
      [
        { transform: `rotate(${startAngle}deg)` },
        { transform: `rotate(${endAngle}deg)` },
      ],
      {
        iterations: animationIterations,
        duration: animationDuration,
        fill: "forwards",
        easing: `${isAppIdle ? "linear" : "ease"}`,
      }
    );
    animation.addEventListener("finish", () => {
      setDiscDisabled(false);
    });
    return () =>
      animation.removeEventListener("finish", () => {
        setDiscDisabled(false);
      });
  }, [startAngle, endAngle, animationDuration, animationIterations, isAppIdle]);

  const handleClick = (e) => {
    const disc = e.target;
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
    setDiscDisabled(true);
    setStartAngle(discAngle);
    setEndAngle(newDiscAngle);
    setIndex(nextIndex);
    setAnimationDuration(baseAnimationDurationMillis);
    setAnimationIterations(1);
  };

  return (
    <svg
      className={css.disc}
      onClick={(e) => !isDiscDisabled && handleClick(e)}
      ref={discRef}
      viewBox="25 25 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      {figures.map((fig, i) => (
        <image
          className={`${css.disc__mask} ${
            index === i && !isAppIdle ? css.fadeIn : css.fadeOut
          }`}
          href={fig.maskImageFile}
          key={fig.id}
        />
      ))}
    </svg>
  );
};

Disc.propTypes = {
  baseAnimationDurationMillis: PropTypes.number.isRequired,
  figures: PropTypes.arrayOf(
    PropTypes.shape({
      angle: PropTypes.number,
      id: PropTypes.number,
      text: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
    })
  ).isRequired,
  isAppIdle: PropTypes.bool.isRequired,
  startAppIdleTimer: PropTypes.func.isRequired,
};

export default Disc;

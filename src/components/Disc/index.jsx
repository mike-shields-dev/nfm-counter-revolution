import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import getDiscAngle from "../../utils/getDiscAngle";
import css from "./styles.module.css";

const Disc = ({
  baseAnimationDurationMillis,
  figures,
  index,
  isAppIdle,
  // startAppIdleTimer,
  // setIndex,
}) => {
  const discRef = useRef();
  const [isDiscDisabled, setDiscDisabled] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [endAngle, setEndAngle] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [animationIterations, setAnimationIterations] = useState(Infinity);

  useEffect(() => {
    const discAngle = getDiscAngle(discRef.current);
    setStartAngle(discAngle);
    if (isAppIdle) {
      setEndAngle(discAngle - 360);
      setAnimationDuration(baseAnimationDurationMillis * 20);
      setAnimationIterations(Infinity);
    }
  }, [isAppIdle, baseAnimationDurationMillis]);

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
      }
    );
    animation.addEventListener("finish", () => {
      setDiscDisabled(false);
    });
    return () =>
      animation.removeEventListener("finish", () => {
        setDiscDisabled(false);
      });
  }, [startAngle, endAngle, animationDuration, animationIterations]);

  const handleClick = (e) => {
    const disc = e.target;
    const discAngle = getDiscAngle(disc);

    console.log({ discAngle });
    // const diffAngle = 360 - discAngle;

    // let nextIndex = figures.findIndex((fig) => fig.angle > diffAngle);
    // nextIndex = nextIndex < 0 ? 0 : nextIndex;
    // let nextFigureAngle = figures[nextIndex].angle;

    // const newDiscAngle = discAngle - (nextFigureAngle - diffAngle);

    // if (index === figures.length - 1) {
    //   console.log("last index");
    //   nextFigureAngle += 360;
    // }

    // startAppIdleTimer();
    // setDiscDisabled(true);
    // setStartAngle(discAngle);
    // setEndAngle(newDiscAngle);
    // setIndex(nextIndex);
    // setAnimationDuration(baseAnimationDurationMillis);
    // setAnimationIterations(1);

    // console.table({
    //   discAngle,
    //   diffAngle,
    //   nextIndex,
    //   nextFigureAngle,
    //   newDiscAngle,
    //   // rotationAmount,
    // });
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
  index: PropTypes.number.isRequired,
  isAppIdle: PropTypes.bool.isRequired,
  // startAppIdleTimer: PropTypes.func.isRequired,
  // setIndex: PropTypes.func.isRequired,
};

export default Disc;

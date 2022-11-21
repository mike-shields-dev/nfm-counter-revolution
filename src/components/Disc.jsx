import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "../styles/index.css";

const Disc = ({
  figures,
  setIsButtonDisabled,
  index,
  baseAnimationDurationMs,
  isAppIdle,
}) => {
  const discRef = useRef();

  const calcDiscAngle = useCallback((disc) => {
    const discCSSTransformMatrix = getComputedStyle(disc, null).transform;
    const transformMatrixParams = discCSSTransformMatrix
      .slice(7, -1)
      .split(",");
    const [cos, sin] = transformMatrixParams;
    const discAngleDegrees = Math.round(Math.atan2(sin, cos) * (180 / Math.PI));
    return discAngleDegrees;
  }, []);

  useEffect(() => {
    if (isAppIdle) {
      const currentDiscAngle = calcDiscAngle(discRef.current);

      const keyFrames = [
        { transform: `rotate(${currentDiscAngle}deg)` },
        { transform: `rotate(${currentDiscAngle - 360}deg)` },
      ];

      const options = {
        iterations: 100,
        duration: baseAnimationDurationMs * 64,
        fill: "forwards",
      };

      discRef.current.animate(keyFrames, options);
    }
  }, [isAppIdle, calcDiscAngle, baseAnimationDurationMs]);

  useEffect(() => {
    let discAnimation;
    const enableButton = () => setIsButtonDisabled(false);
    if (!isAppIdle) {
      const startAngle = calcDiscAngle(discRef.current);
      const endAngle = figures[index].angle;

      baseAnimationDurationMs({ startAngle });
      baseAnimationDurationMs(figures.map((figure) => figure.angle));

      const keyframes = [
        {
          transform: `rotate(${startAngle}deg)`,
        },
        { transform: `rotate(${endAngle}deg)` },
      ];

      const options = {
        duration: baseAnimationDurationMs,
        iterations: 1,
        easing: "ease",
        fill: "forwards",
      };

      try {
        discAnimation = discRef.current.animate(keyframes, options);
        discAnimation.addEventListener("finish", () => {
          enableButton();
        });
      } catch (err) {
        // This try catch block prevents RTL tests from failing,
        // The Web Animations API ( element.animate() ) is not supported by RTL
        enableButton();
      }
    }

    return () => {
      if (discAnimation) {
        discAnimation.removeEventListener("finish", enableButton);
      }
    };
  }, [
    figures,
    index,
    setIsButtonDisabled,
    baseAnimationDurationMs,
    calcDiscAngle,
    isAppIdle,
  ]);

  return (
    <div className="disc" data-testid="disc" ref={discRef}>
      <img className="disc__layer disc__artwork" src="art.png" alt="" />
      {figures.map((figure, i) => (
        <motion.img
          key={figure.id}
          className={`disc__layer disc__mask ${
            !isAppIdle && i === index ? "mask-fade-in" : "mask-fade-out"
          }`}
          src={figure.mask_file}
          alt=""
        />
      ))}
    </div>
  );
};

Disc.propTypes = {
  figures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      angle: PropTypes.number,
      text: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  setIsButtonDisabled: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  baseAnimationDurationMs: PropTypes.number.isRequired,
  isAppIdle: PropTypes.bool.isRequired,
};

export default Disc;

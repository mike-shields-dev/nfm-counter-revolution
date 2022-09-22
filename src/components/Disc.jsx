import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../styles/index.css";

const Disc = ({ figures, setIsButtonDisabled, index }) => {
  const discRef = useRef();

  useEffect(() => {
    const previousIndex = index - 1 > -1 ? index - 1 : figures.length - 1;
    const prevFigureAngle = figures[previousIndex].angle;
    const nextFigureAngle = figures[index].angle;
    const startAngle = prevFigureAngle;
    const endAngle =
      nextFigureAngle > prevFigureAngle
        ? nextFigureAngle - 360
        : nextFigureAngle;

    const keyframes = [
      { transform: `rotate(${startAngle}deg)` },
      { transform: `rotate(${endAngle}deg)` },
    ];

    const options = {
      duration: 1000,
      iterations: 1,
      easing: "ease",
      fill: "forwards",
    };

    const enableButton = () => setIsButtonDisabled(false);
    let discAnimation;

    try {
      discAnimation = discRef.current.animate(keyframes, options);
      discAnimation.addEventListener("finish", enableButton);
    } catch (err) {
      // This try catch block prevents RTL tests from failing,
      // The Web Animations API ( element.animate() ) is not supported by RTL
      enableButton();
    }

    return () => {
      if (discAnimation) {
        discAnimation.removeEventListener("finish", enableButton);
      }
    };
  }, [figures, index, setIsButtonDisabled]);

  return (
    <div className="disc" data-testid="disc" ref={discRef}>
      Disc
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
};

export default Disc;

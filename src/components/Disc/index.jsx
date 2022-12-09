import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DiscContext } from "../../context/DiscContext";
import css from "./styles.module.css";

const Disc = ({ figures, isAppIdle }) => {
  const { index, discRef } = useContext(DiscContext);

  return (
    <svg
      className={css.disc}
      role="button"
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
  figures: PropTypes.arrayOf(
    PropTypes.shape({
      angle: PropTypes.number,
      id: PropTypes.number,
      text: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
    })
  ).isRequired,
  isAppIdle: PropTypes.bool.isRequired,
};

export default Disc;

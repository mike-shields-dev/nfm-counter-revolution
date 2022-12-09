import React from "react";
import PropTypes from "prop-types";
import css from "./styles.module.css";

const Button = ({ handleClick, isClickDisabled }) => {
  return (
    <div className={css.Button__container}>
      <button
        className={css.Button}
        onClick={() => !isClickDisabled && handleClick()}
        type="button"
        disabled={isClickDisabled}
      >
        {" "}
      </button>
    </div>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isClickDisabled: PropTypes.bool.isRequired,
};

export default Button;

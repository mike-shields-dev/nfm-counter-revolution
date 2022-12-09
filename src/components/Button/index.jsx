import React from "react";
import PropTypes from "prop-types";
import css from "./styles.module.css";

const Button = ({ handleClick, isDisabled }) => {
  return (
    <div className={css.Button__container}>
      <button
        className={css.Button}
        onClick={() => !isDisabled && handleClick()}
        type="button"
        disabled={isDisabled}
      >
        {" "}
      </button>
    </div>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default Button;

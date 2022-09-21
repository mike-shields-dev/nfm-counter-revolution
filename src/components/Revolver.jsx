import React from "react";
import PropTypes from "prop-types";

const Revolver = ({ handleClick }) => {
  return (
    <div className="revolver" data-testid="revolver">
      <button onClick={handleClick} type="button">
        increment index
      </button>
    </div>
  );
};

Revolver.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Revolver;

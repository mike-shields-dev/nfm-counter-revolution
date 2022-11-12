import React, { useState } from "react";
import PropTypes from "prop-types";
import Disc from "./Disc";

const DiscController = ({ incrementIndex, figures, index }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleClick = () => {
    incrementIndex();
    setIsButtonDisabled(true);
  };
  return (
    <div className="revolver" data-testid="revolver">
      <Disc
        figures={figures}
        setIsButtonDisabled={setIsButtonDisabled}
        index={index}
      />
      <button disabled={isButtonDisabled} onClick={handleClick} type="button">
        increment index
      </button>
    </div>
  );
};

DiscController.propTypes = {
  index: PropTypes.number.isRequired,
  figures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      angle: PropTypes.number,
      text: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  incrementIndex: PropTypes.func.isRequired,
};

export default DiscController;

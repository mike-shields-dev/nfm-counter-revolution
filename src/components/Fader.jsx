import React from "react";
import PropTypes from "prop-types";

const Fader = ({ index, children }) => {
    <div></div>
};

Fader.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Fader;

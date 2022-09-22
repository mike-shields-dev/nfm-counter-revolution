import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const Content = ({ figure }) => {
  return (
    <div data-testid="content">
      {figure.text.map((paragraph) => (
        <p key={uuidv4()}>{paragraph}</p>
      ))}
    </div>
  );
};

Content.propTypes = {
  figure: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    angle: PropTypes.number,
    text: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Content;

import React, { useState, createContext, useMemo, useRef } from "react";
import PropTypes from "prop-types";

const DiscContext = createContext(0);

const DiscProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const discRef = useRef();
  const value = useMemo(() => ({ index, setIndex, discRef }), [index]);

  return <DiscContext.Provider value={value}>{children}</DiscContext.Provider>;
};

DiscProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { DiscContext, DiscProvider };

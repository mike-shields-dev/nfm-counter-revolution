import React, { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

const IndexContext = createContext(0);

const IndexProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const value = useMemo(() => ({ index, setIndex }), [index]);

  return (
    <IndexContext.Provider value={value}>{children}</IndexContext.Provider>
  );
};

IndexProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { IndexContext, IndexProvider };

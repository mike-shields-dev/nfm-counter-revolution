import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
// import { v4 as uuidv4 } from "uuid";

const Content = ({ figures, index, baseAnimationDurationMs, isAppIdle }) => {
  const fadeAnim = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: baseAnimationDurationMs / 3000,
      delay: (baseAnimationDurationMs / 1000) * (2 / 3),
    },
    exit: {
      opacity: 0,
      transition: {
        duration: baseAnimationDurationMs / 3000,
      },
    },
  };

  return (
    <div className="content">
      <AnimatePresence>
        {isAppIdle && (
          <motion.div className="content__text" {...fadeAnim}>
            Call to Action
          </motion.div>
        )}
      </AnimatePresence>

      {figures.map((figure, i) => (
        <AnimatePresence key={figure.id}>
          {!isAppIdle && i === index && (
            <motion.div className="content__text" {...fadeAnim}>
              {figure.text}
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};

Content.propTypes = {
  index: PropTypes.number.isRequired,
  figures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      angle: PropTypes.number,
      mask_file: PropTypes.string.isRequired,
      text: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  baseAnimationDurationMs: PropTypes.number.isRequired,
  isAppIdle: PropTypes.bool.isRequired,
};

export default Content;

import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { IndexContext } from "../../context/IndexContext";
import css from "./styles.module.css";

const Content = ({ figures, baseAnimationDurationMillis, isAppIdle }) => {
  const { index } = useContext(IndexContext);

  const fadeAnim = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: baseAnimationDurationMillis / 3000,
      delay: (baseAnimationDurationMillis / 1000) * (2 / 3),
    },
    exit: {
      opacity: 0,
      transition: {
        duration: baseAnimationDurationMillis / 3000,
      },
    },
  };

  return (
    <div className={css.content} data-testid="content">
      <AnimatePresence>
        {isAppIdle && (
          <motion.div className={css.content__text} {...fadeAnim}>
            <p>Touch the artwork for details...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {figures.map((figure, i) => (
        <AnimatePresence key={figure.id}>
          {!isAppIdle && i === index && (
            <motion.div className={css.content__text} {...fadeAnim}>
              {figure.text.map((para) => (
                <p key={uuidv4()}>{para}</p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};

Content.propTypes = {
  baseAnimationDurationMillis: PropTypes.number.isRequired,
  figures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      angle: PropTypes.number,
      maskImageFile: PropTypes.string.isRequired,
      text: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  isAppIdle: PropTypes.bool.isRequired,
};

export default Content;

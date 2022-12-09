import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { DiscContext } from "../../context/DiscContext";
import css from "./styles.module.css";
import data from "../../data.json";

const Content = ({ figures, baseAnimDurationMs, isIdle }) => {
  const { index } = useContext(DiscContext);
  const { intro } = data;

  const fadeAnim = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: baseAnimDurationMs / 3000,
      delay: (baseAnimDurationMs / 1000) * (2 / 3),
    },
    exit: {
      opacity: 0,
      transition: {
        duration: baseAnimDurationMs / 3000,
      },
    },
  };

  return (
    <div className={css.content} data-testid="content">
      <AnimatePresence>
        {isIdle && (
          <motion.div className={css.content__text} {...fadeAnim}>
            <p>{intro}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {figures.map((figure, i) => (
        <AnimatePresence key={figure.id}>
          {!isIdle && i === index && (
            <motion.div className={css.content__text} {...fadeAnim}>
              {figure.text.map((para) => (
                <p key={`${figure.id}${uuidv4()}`}>{para}</p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};

Content.propTypes = {
  baseAnimDurationMs: PropTypes.number.isRequired,
  figures: PropTypes.arrayOf(
    PropTypes.shape({
      angle: PropTypes.number,
      id: PropTypes.number,
      maskImageFile: PropTypes.string.isRequired,
      text: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
    })
  ).isRequired,
  isIdle: PropTypes.bool.isRequired,
};

export default Content;

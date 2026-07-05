import React from 'react';
import { motion } from 'framer-motion';

// Character by character reveal
export const RevealCharacters = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: {
      opacity: 1, y: 0, rotateX: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.span
      style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', perspective: '1000px', gap: '0.25em' }}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={child}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

// Word by word reveal
export const FadeUpWords = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.span
      style={{ display: 'inline-flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

// Character by character reveal
export const RevealCharacters = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  let charCount = 0;

  return (
    <span
      style={{ display: 'inline-flex', flexWrap: 'wrap', overflow: 'hidden', perspective: '1000px' }}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, charIndex) => {
            const currentIdx = charCount++;
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 20, rotateX: 90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  type: 'spring',
                  damping: 12,
                  stiffness: 100,
                  delay: delay + currentIdx * 0.05,
                }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex !== words.length - 1 && (
            <motion.span
              initial={{ opacity: 0, y: 20, rotateX: 90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                type: 'spring',
                damping: 12,
                stiffness: 100,
                delay: delay + (charCount++) * 0.05,
              }}
              style={{ display: 'inline-block' }}
            >
              &nbsp;
            </motion.span>
          )}
        </span>
      ))}
    </span>
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
      style={{ display: 'inline-flex', flexWrap: 'wrap', overflow: 'hidden' }}
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

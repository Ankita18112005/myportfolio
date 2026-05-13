import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500); // Wait a bit before unmounting
          return 100;
        }
        // Ease out logic for progress
        const diff = 100 - prev;
        const inc = Math.max(1, diff * 0.1); 
        return Math.min(100, prev + inc);
      });
    }, 30);

    return () => clearInterval(timer);
  }, [setLoading]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0, 
          y: '-100%',
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
        }}
        className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 noise-bg opacity-[0.05]" />
        
        {/* Animated Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-warm-brown/10 blur-[100px] animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gold-accent/10 blur-[120px] animate-blob animation-delay-2000" />

        <div className="relative z-10 flex flex-col items-center gap-12">
          {/* Logo Reveal */}
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="font-heading text-6xl md:text-8xl tracking-widest text-dark-text relative"
            >
              ANKITA KARAN
              {/* Shimmer effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/80 to-transparent skew-x-[-20deg]"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
              />
            </motion.h1>
          </div>

          {/* Progress Container */}
          <div className="flex flex-col items-center gap-4 w-64 md:w-96">
            <div className="flex justify-between w-full text-sm font-medium tracking-widest text-warm-brown uppercase">
              <span>Loading</span>
              <span>{Math.round(progress)}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-dark-text/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-warm-brown"
                style={{ width: `${progress}%` }}
                layoutId="progressBar"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;

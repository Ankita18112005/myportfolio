import React, { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// ── Letter configs for curved "PORTFOLIO" ───────────────────────────
const allLetters = [
  { char: 'P', rotate: -9, y: 16, scale: 1.05 },
  { char: 'O', rotate: -5, y: 8, scale: 0.93 },
  { char: 'R', rotate: -2, y: 2, scale: 0.97 },
  { char: 'T', rotate: 2, y: -3, scale: 1.1 },
  { char: 'F', rotate: 5, y: -1, scale: 0.94 },
  { char: 'O', rotate: 4, y: 5, scale: 0.92 },
  { char: 'L', rotate: 1, y: 10, scale: 0.98 },
  { char: 'I', rotate: -2, y: 14, scale: 0.85 },
  { char: 'O', rotate: -6, y: 11, scale: 0.94 },
];

// Split: left 4 letters, right 5 letters (character sits in between)
const leftLetters = allLetters.slice(0, 4);   // P O R T
const rightLetters = allLetters.slice(4);      // F O L I O

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 800], [0, 90]);
  const avatarY = useTransform(scrollY, [0, 800], [0, -45]);
  const fgY = useTransform(scrollY, [0, 800], [0, 25]);
  const fadeOut = useTransform(scrollY, [0, 450], [1, 0]);

  // Mouse parallax for avatar
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tiltX = useSpring(rawX, { stiffness: 50, damping: 18 });
  const tiltY = useSpring(rawY, { stiffness: 50, damping: 18 });

  const onMouseMove = useCallback((e) => {
    if (window.innerWidth < 768) return; // Disable parallax on mobile
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set(((e.clientY - r.top - r.height / 2) / r.height) * -6);
    rawY.set(((e.clientX - r.left - r.width / 2) / r.width) * 6);
  }, [rawX, rawY]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const letterAnim = {
    hidden: { opacity: 0, y: 90, rotate: 18, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      y: allLetters[i].y,
      rotate: allLetters[i].rotate,
      scale: 1,
      transition: { delay: 0.5 + i * 0.055, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const fontSize = (s) => `clamp(1.8rem, ${10.5 * s}vw, ${10 * s}rem)`;

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative h-[100dvh] min-h-[600px] md:h-auto md:min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(175deg, #F6F1E9 0%, #EFE6D8 60%, #E8D8C4 100%)' }}
    >
      {/* ═══ BG EFFECTS ═══ */}
      <div className="absolute inset-0 noise-bg opacity-[0.025] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(232,216,196,0.5) 100%)' }} />
      <div className="absolute top-[-12%] right-[-8%] w-[40vw] h-[40vw] bg-gold-accent/[0.06] rounded-full blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-[-8%] left-[-10%] w-[35vw] h-[35vw] bg-warm-brown/[0.05] rounded-full blur-[100px] animate-blob animation-delay-2000 pointer-events-none" />

      {/* Floating decorative circles */}
      <motion.div animate={{ y: [0, -12, 0], x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }} className="absolute top-[14%] left-[7%] w-16 h-16 rounded-full border border-warm-brown/10 pointer-events-none" />
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} className="absolute top-[55%] right-[8%] w-3 h-3 rounded-full bg-gold-accent/20 pointer-events-none" />
      <motion.div animate={{ y: [0, 8, 0], x: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} className="absolute bottom-[22%] left-[12%] w-10 h-10 rounded-full border border-gold-accent/8 pointer-events-none" />

      {/* ═══ MAIN COMPOSITION ═══ */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-6 md:gap-0"
      >
        {/* ── Editorial Row: Letters + Avatar ──────────── */}
        <div className="relative flex items-center justify-center w-full">

          {/* LEFT letters (PORT) — behind avatar via z-index */}
          <motion.div
            style={{ y: textY }}
            className="flex items-baseline select-none z-10"
          >
            {leftLetters.map((l, i) => (
              <motion.span
                key={`l${i}`}
                custom={i}
                variants={letterAnim}
                initial="hidden"
                animate="visible"
                className="font-heading text-dark-text inline-block cursor-default"
                style={{
                  fontSize: fontSize(l.scale),
                  lineHeight: 0.82,
                  fontWeight: 900,
                  transformOrigin: 'bottom center',
                }}
                whileHover={{ y: l.y - 14, scale: 1.08, transition: { duration: 0.25 } }}
              >
                {l.char}
              </motion.span>
            ))}
          </motion.div>

          {/* CENTER: Character avatar — on TOP of text */}
          <motion.div
            style={{ y: avatarY }}
            className="relative z-20 mx-[-2vw] md:mx-[-3vw]"
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: '900px', transformStyle: 'preserve-3d' }}
            >
              <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}>
                {/* Shadow under avatar */}
                <div
                  className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-[50%] h-[16px] rounded-[50%] blur-xl pointer-events-none"
                  style={{ background: 'rgba(26,26,26,0.1)' }}
                />

                {/* Avatar with white sticker outline effect */}
                <motion.img
                  src="/download-removebg-preview.png"
                  alt="Ankita Karan"
                  className="relative z-10 w-[155px] h-[192px] sm:w-[195px] sm:h-[238px] md:w-[340px] md:h-[420px] lg:w-[400px] lg:h-[490px] object-contain"
                  style={{
                    transform: 'translateZ(15px)',
                    filter: [
                      'drop-shadow(0 0 0 white)',
                      'drop-shadow(2px 0 0 rgba(255,255,255,0.9))',
                      'drop-shadow(-2px 0 0 rgba(255,255,255,0.9))',
                      'drop-shadow(0 2px 0 rgba(255,255,255,0.9))',
                      'drop-shadow(0 -2px 0 rgba(255,255,255,0.9))',
                      'drop-shadow(0 16px 30px rgba(26,26,26,0.12))',
                    ].join(' '),
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                />

                {/* Warm glow behind */}
                <div
                  className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[60%] h-[55%] rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(216,164,107,0.07) 0%, transparent 70%)',
                    transform: 'translateZ(-10px)',
                    filter: 'blur(20px)',
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT letters (FOLIO) — behind avatar via z-index */}
          <motion.div
            style={{ y: textY }}
            className="flex items-baseline select-none z-10"
          >
            {rightLetters.map((l, i) => {
              const globalIndex = i + 4;
              return (
                <motion.span
                  key={`r${i}`}
                  custom={globalIndex}
                  variants={letterAnim}
                  initial="hidden"
                  animate="visible"
                  className="font-heading text-dark-text inline-block cursor-default"
                  style={{
                    fontSize: fontSize(l.scale),
                    lineHeight: 0.82,
                    fontWeight: 900,
                    transformOrigin: 'bottom center',
                  }}
                  whileHover={{ y: l.y - 14, scale: 1.08, transition: { duration: 0.25 } }}
                >
                  {l.char}
                </motion.span>
              );
            })}
          </motion.div>
        </div>

        {/* ── Bottom Bar: Name + Role/Buttons ─────────── */}
        <motion.div style={{ y: fgY }} className="relative z-30 w-full max-w-5xl px-0 flex flex-col items-center justify-center md:mt-[-30px]">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-[16px] md:gap-5 w-full">
            {/* Name */}
            <div className="flex flex-col items-center md:items-start gap-0">
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[62px] sm:text-[68px] leading-[0.9] md:text-4xl lg:text-5xl"
                style={{ color: 'var(--color-warm-brown)' }}
              >
                ANKITA
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[62px] sm:text-[68px] leading-[0.9] md:text-4xl lg:text-5xl"
                style={{ color: 'var(--color-warm-brown)' }}
              >
                KARAN
              </motion.h2>
            </div>

            {/* Role + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="flex flex-col items-center md:items-end w-full md:w-auto mt-2 md:mt-0"
            >
              <p className="text-dark-text/80 text-[12px] sm:text-[13px] md:text-sm tracking-[0.2em] uppercase font-extrabold text-center md:text-left">
                Frontend Developer & UI/UX Designer
              </p>
              <div className="flex flex-row w-full justify-center md:justify-end gap-[14px] mt-[24px] md:mt-3">
                <a href="#projects" className="w-[46%] max-w-[150px] px-2 py-[14px] md:py-3 bg-dark-text text-cream rounded-full text-[13px] md:text-sm font-medium tracking-wide hover:bg-warm-brown transition-all duration-300 hover:scale-105 hover-target text-center flex items-center justify-center leading-none shadow-sm">
                  View Projects
                </a>
                <a href="#contact" className="w-[46%] max-w-[150px] px-2 py-[14px] md:py-3 rounded-full text-[13px] md:text-sm font-medium tracking-wide border border-dark-text/20 text-dark-text hover:bg-dark-text hover:text-cream transition-all duration-300 hover:scale-105 hover-target text-center flex items-center justify-center leading-none bg-transparent">
                  Contact
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── '26 Badge (Desktop only to save mobile space) ── */}
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="hidden md:block absolute top-20 right-14 lg:right-20 z-30 font-heading text-4xl md:text-5xl lg:text-6xl pointer-events-none"
        style={{ color: 'var(--color-gold-accent)' }}
      >
        '26
      </motion.span>

      {/* ── Scroll Indicator (Desktop only) ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-40"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-dark-text/35 font-medium">Scroll</span>
        <div className="w-[1px] h-[30px] bg-dark-text/10 overflow-hidden relative">
          <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} className="absolute inset-0 bg-warm-brown" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

// Custom brand icons (removed from lucide-react v1)
const GithubIcon = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ── Skill icons (simple text badges matching the warm theme) ────────
const skills = [
  'React', 'Figma', 'JavaScript', 'Tailwind', 'GitHub', 'Firebase',
];

// ── Hand-drawn doodle SVGs ──────────────────────────────────────────
const StarDoodle = ({ className, style }) => (
  <svg viewBox="0 0 60 60" fill="none" className={className} style={style}>
    <path d="M30 5 L35 22 L52 22 L38 33 L43 50 L30 40 L17 50 L22 33 L8 22 L25 22 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SpiralDoodle = ({ className, style }) => (
  <svg viewBox="0 0 80 80" fill="none" className={className} style={style}>
    <path d="M40 40 C40 35 45 30 50 30 C55 30 60 35 60 40 C60 50 50 58 40 58 C25 58 15 48 15 35 C15 18 28 8 45 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const WaveDoodle = ({ className, style }) => (
  <svg viewBox="0 0 120 30" fill="none" className={className} style={style}>
    <path d="M5 15 Q15 5 25 15 Q35 25 45 15 Q55 5 65 15 Q75 25 85 15 Q95 5 105 15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const ArrowDoodle = ({ className, style }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} style={style}>
    <path d="M10 30 L30 10 M30 10 L30 22 M30 10 L18 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxBg = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 md:py-24 z-10 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #E8D8C4 0%, #D8C4A8 50%, #C9A77A 100%)' }}
    >
      {/* ── Background doodle decorations ──────────────── */}
      <motion.div style={{ y: parallaxBg }} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Scattered hand-drawn shapes */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="absolute top-[5%] right-[8%] text-warm-brown/20 w-16 h-16 md:w-24 md:h-24"
        >
          <SpiralDoodle className="w-full h-full" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute top-[12%] left-[5%] text-warm-brown/25 w-10 h-10 md:w-14 md:h-14"
        >
          <StarDoodle className="w-full h-full" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute bottom-[15%] right-[12%] text-warm-brown/20 w-12 h-12"
        >
          <StarDoodle className="w-full h-full" />
        </motion.div>

        <div className="absolute bottom-[8%] left-[15%] text-warm-brown/15 w-28 md:w-36">
          <WaveDoodle className="w-full h-auto" />
        </div>

        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute top-[40%] right-[3%] text-warm-brown/20 w-8 h-8"
        >
          <ArrowDoodle className="w-full h-full" />
        </motion.div>

        {/* Large faint circles */}
        <div className="absolute top-[-10%] right-[-5%] w-[30vw] h-[30vw] rounded-full border-2 border-warm-brown/8 pointer-events-none" />
        <div className="absolute bottom-[-8%] left-[-3%] w-[25vw] h-[25vw] rounded-full border-2 border-warm-brown/6 pointer-events-none" />
      </motion.div>

      {/* Grain */}
      <div className="absolute inset-0 noise-bg opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* ── Main Content ───────────────────────────────── */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Photo ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >

            {/* Floating star near photo */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute top-[35%] -left-4 md:left-0 lg:-left-6 z-20 text-warm-brown/60 w-8 h-8"
            >
              <StarDoodle className="w-full h-full" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute bottom-[20%] -right-2 md:right-4 lg:-right-4 z-20 text-warm-brown/50 w-10 h-10"
            >
              <StarDoodle className="w-full h-full" />
            </motion.div>

            {/* Photo container */}
            <div className="relative w-[260px] h-[340px] md:w-[300px] md:h-[400px] lg:w-[340px] lg:h-[440px]">
              <motion.img
                src="/download-removebg-preview.png"
                alt="Ankita Karan"
                className="w-full h-full object-contain relative z-10"
                style={{
                  filter: 'grayscale(100%) contrast(1.1) brightness(0.95)',
                  mixBlendMode: 'multiply',
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          {/* ── RIGHT: Content ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >

            {/* Bio paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <p className="text-base md:text-lg text-dark-text/80 leading-relaxed mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Hi, I'm <strong className="text-dark-text font-semibold">Ankita Karan</strong> — a frontend developer and UI/UX enthusiast! I'm currently pursuing B.Tech in Computer Science at JIS College of Engineering with a GPA of 8.7.
              </p>
              <p className="text-base md:text-lg text-dark-text/80 leading-relaxed mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                I'm passionate about both <strong className="text-dark-text font-semibold">digital design</strong> and <strong className="text-dark-text font-semibold">modern web development</strong>. I love building responsive, user-friendly interfaces using React, Tailwind, and Figma.
              </p>
              <p className="text-base md:text-lg text-dark-text/70 leading-relaxed mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                I enjoy CODING, EXPLORING NEW TECH, AND CONNECTING WITH CREATIVE PEOPLE. Feel free to explore my work and reach out — I'd love to connect!
              </p>
            </motion.div>


            {/* Arrow CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-8"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-dark-text/50 font-medium hover:text-warm-brown transition-colors hover-target"
              >
                Explore work
                <span className="w-7 h-7 rounded-full border border-dark-text/15 flex items-center justify-center group-hover:border-warm-brown group-hover:bg-warm-brown/10 transition-all duration-300">
                  <ArrowDoodle className="w-3.5 h-3.5 text-current" />
                </span>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-center"
        style={{ background: 'linear-gradient(to right, transparent, rgba(166,106,63,0.2) 30%, rgba(166,106,63,0.3) 50%, rgba(166,106,63,0.2) 70%, transparent)' }}
      />
    </section>
  );
};

export default About;

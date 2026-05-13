import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

// ── Certificate Data ────────────────────────────────────────────────
const certificates = [
  {
    id: 1,
    title: 'AI-ML Virtual Internship',
    org: 'EduSkills × Google for Developers',
    date: 'Oct – Dec 2025',
    category: 'Internship',
    file: '/certificates/eduskill 1.pdf',
  },
  {
    id: 2,
    title: 'AI-ML Virtual Internship (Phase 2)',
    org: 'EduSkills × Google for Developers',
    date: '2025',
    category: 'Internship',
    file: '/certificates/eduskill 2.pdf',
  },
  {
    id: 3,
    title: 'Data Visualisation: Empowering Business',
    org: 'Tata Group × Forage',
    date: 'January 2026',
    category: 'Certification',
    file: '/certificates/tata forage.pdf',
  },
  {
    id: 4,
    title: 'Android App Development',
    org: 'Euphoria GenX',
    date: 'February 2025',
    category: 'Workshop',
    file: '/certificates/bcttt.pdf',
  },
  {
    id: 5,
    title: 'AI Tools & ChatGPT Workshop',
    org: 'Be10X',
    date: 'May 2026',
    category: 'Workshop',
    file: '/certificates/be10x.pdf',
  },
  {
    id: 6,
    title: 'Internship Common Aptitude Test',
    org: 'iCAT',
    date: 'January 2026',
    category: 'Participation',
    file: '/certificates/participation.pdf',
  },
  {
    id: 7,
    title: 'Cyber Security Training',
    org: 'Ardent Computech Pvt. Ltd.',
    date: 'July 2025',
    category: 'Certification',
    file: '/certificates/ardent bct.pdf',
  },
  {
    id: 8,
    title: 'Programming In Java',
    org: 'NPTEL / Swayam',
    date: '2025',
    category: 'Certification',
    file: '/certificates/Programming In Java (1).pdf',
  },
  {
    id: 9,
    title: 'Principles of Management',
    org: 'NPTEL / Swayam',
    date: '2025',
    category: 'Certification',
    file: '/certificates/Principles of Management (1).pdf',
  },
];

// ── Sparkle ─────────────────────────────────────────────────────────
const Sparkle = ({ top, left, delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-gold-accent/30 pointer-events-none"
    style={{ top, left }}
    animate={{ opacity: [0.15, 0.6, 0.15], scale: [0.8, 1.3, 0.8] }}
    transition={{ repeat: Infinity, duration: 3.5, delay, ease: 'easeInOut' }}
  />
);

// ── Certificate Lightbox Modal ──────────────────────────────────────
const CertModal = ({ cert, onClose }) => (
  <motion.div
    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    <motion.div className="absolute inset-0 bg-dark-text/85 backdrop-blur-lg" onClick={onClose} />

    <motion.div
      className="relative z-10 w-full max-w-4xl flex flex-col items-center"
      initial={{ scale: 0.9, y: 40 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 40 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute -top-14 right-0 w-10 h-10 rounded-full bg-cream/10 border border-cream/20 text-cream flex items-center justify-center hover:bg-cream/20 transition-colors hover-target z-20"
      >
        <X size={18} />
      </button>

      {/* PDF Viewer */}
      <div
        className="w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: '1px solid rgba(216,164,107,0.15)' }}
      >
        <iframe
          src={`${cert.file}#toolbar=0`}
          title={cert.title}
          className="w-full bg-white"
          style={{ height: '75vh' }}
        />
      </div>

      {/* Info below */}
      <div className="text-center mt-6">
        <h3 className="font-heading text-2xl text-cream mb-1">{cert.title}</h3>
        <p className="text-cream/50 text-sm mb-4">{cert.org} · {cert.date}</p>
        <a
          href={cert.file}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cream/20 text-cream/70 text-xs uppercase tracking-wider hover:bg-cream/10 transition-colors hover-target"
        >
          <ExternalLink size={12} /> Open Full
        </a>
      </div>
    </motion.div>
  </motion.div>
);

// ── Stacked Card Carousel ───────────────────────────────────────────
const Certifications = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);
  const [dragDirection, setDragDirection] = useState(0);

  const total = certificates.length;

  const next = () => setActiveIndex((i) => (i + 1) % total);
  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);

  // Map index to position relative to active
  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-cream z-10 overflow-hidden"
    >
      {/* ── Background ─────────────────────────────────────── */}
      <div className="absolute top-[-5%] right-[-8%] w-[35vw] h-[35vw] bg-warm-brown/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-8%] left-[-5%] w-[30vw] h-[30vw] bg-gold-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 noise-bg opacity-[0.02] mix-blend-overlay pointer-events-none" />

      <Sparkle top="12%" left="18%" delay={0} />
      <Sparkle top="28%" left="82%" delay={1.2} />
      <Sparkle top="68%" left="8%" delay={0.5} />
      <Sparkle top="78%" left="72%" delay={2} />
      <Sparkle top="42%" left="92%" delay={1.5} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ── Header ───────────────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-warm-brown text-xs uppercase tracking-[0.4em] mb-5 font-medium"
          >
            Verified Credentials
          </motion.p>

          <div className="overflow-hidden mb-2">
            <motion.h2
              initial={{ y: 80 }}
              animate={isHeadingInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-5xl md:text-7xl text-dark-text"
            >
              CERTIFICATIONS
            </motion.h2>
          </div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[2px] bg-gradient-to-r from-warm-brown to-gold-accent mx-auto rounded-full"
          />
        </div>

        {/* ── Stacked Carousel ─────────────────────────────── */}
        <div className="relative flex items-center justify-center" style={{ height: '420px', perspective: '1200px' }}>
          <AnimatePresence initial={false} custom={dragDirection}>
            {certificates.map((cert, index) => {
              const offset = getOffset(index);
              const absOffset = Math.abs(offset);

              // Only render visible cards (-2 to +2)
              if (absOffset > 2) return null;

              const isCenter = offset === 0;
              const x = offset * 260;
              const z = -absOffset * 80;
              const rotateY = offset * -6;
              const scale = 1 - absOffset * 0.08;
              const opacity = 1 - absOffset * 0.3;

              return (
                <motion.div
                  key={cert.id}
                  className="absolute hover-target"
                  style={{
                    width: '320px',
                    zIndex: 10 - absOffset,
                  }}
                  animate={{
                    x,
                    z,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => isCenter && setSelectedCert(cert)}
                  whileHover={isCenter ? { y: -8, scale: 1.03 } : {}}
                >
                  <div
                    className={`relative p-8 rounded-3xl transition-all duration-500 cursor-pointer ${
                      isCenter ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    style={{
                      background: isCenter
                        ? 'linear-gradient(145deg, rgba(255,255,255,0.75) 0%, rgba(232,216,196,0.4) 100%)'
                        : 'linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(232,216,196,0.2) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: isCenter
                        ? '1px solid rgba(166,106,63,0.25)'
                        : '1px solid rgba(166,106,63,0.08)',
                      boxShadow: isCenter
                        ? '0 30px 80px rgba(166,106,63,0.12), 0 0 0 1px rgba(216,164,107,0.05)'
                        : '0 12px 40px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Category tag */}
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium mb-6"
                      style={{
                        color: 'var(--color-warm-brown)',
                        background: 'rgba(166,106,63,0.08)',
                        border: '1px solid rgba(166,106,63,0.12)',
                      }}
                    >
                      {cert.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-heading text-2xl md:text-3xl text-dark-text leading-snug mb-3">
                      {cert.title}
                    </h3>

                    {/* Organization */}
                    <p className="text-dark-text/50 text-sm font-light mb-1">
                      {cert.org}
                    </p>

                    {/* Date */}
                    <p className="text-dark-text/35 text-xs tracking-wider mb-8">
                      {cert.date}
                    </p>

                    {/* View CTA */}
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-warm-brown text-xs font-medium uppercase tracking-[0.15em] group"
                      >
                        <span>View Certificate</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    )}

                    {/* Decorative corner accent */}
                    <div
                      className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                      style={{
                        borderTop: '2px solid rgba(166,106,63,0.12)',
                        borderRight: '2px solid rgba(166,106,63,0.12)',
                        borderTopRightRadius: '1.5rem',
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Navigation ───────────────────────────────────── */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover-target"
            style={{
              border: '1px solid rgba(166,106,63,0.15)',
              background: 'rgba(255,255,255,0.5)',
            }}
          >
            <ChevronLeft size={18} className="text-dark-text/60" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="hover-target transition-all duration-300"
                style={{
                  width: i === activeIndex ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === activeIndex ? 'var(--color-warm-brown)' : 'rgba(166,106,63,0.2)',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover-target"
            style={{
              border: '1px solid rgba(166,106,63,0.15)',
              background: 'rgba(255,255,255,0.5)',
            }}
          >
            <ChevronRight size={18} className="text-dark-text/60" />
          </button>
        </div>

        {/* Counter */}
        <p className="text-center mt-4 text-dark-text/30 text-xs tracking-wider font-medium">
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </div>

      {/* ── Lightbox ───────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;

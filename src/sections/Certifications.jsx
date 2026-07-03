import React, { useState, useRef, useEffect } from 'react';
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

// ── Sparkle (Removed for minimalist style) ────────────────────────

// ── Certificate Lightbox Modal ──────────────────────────────────────
const CertModal = ({ cert, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
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
        {/* PDF Viewer */}
        <div
          className="w-full rounded-2xl shadow-2xl relative bg-white"
          style={{ border: '1px solid rgba(42,33,28,0.15)' }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white border border-dark-text/10 text-dark-text shadow-xl flex items-center justify-center hover:bg-dark-text hover:text-white transition-colors hover-target z-[60]"
          >
            <X size={20} />
          </button>

          <iframe
            src={`${cert.file}#toolbar=0`}
            title={cert.title}
            className="w-full rounded-2xl"
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
};

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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 40;
    if (info.offset.x > swipeThreshold) {
      prev();
    } else if (info.offset.x < -swipeThreshold) {
      next();
    }
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className={`relative py-[70px] md:py-32 bg-dark-text overflow-hidden px-[20px] md:px-0 ${selectedCert ? 'z-[100]' : 'z-10'}`}
    >
      {/* Huge vertical background text */}
      <div className="absolute font-heading text-[clamp(6rem,15vw,12rem)] leading-none font-normal select-none pointer-events-none whitespace-nowrap hidden lg:block text-cream/[0.03]" style={{ top: '15%', left: '-5%', transform: 'rotate(-90deg)', transformOrigin: 'left top' }}>CREDENTIALS</div>

      {/* ── Background ─────────────────────────────────────── */}
      <div className="absolute top-[-5%] right-[-8%] w-[35vw] h-[35vw] bg-warm-brown/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-8%] left-[-5%] w-[30vw] h-[30vw] bg-gold-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full md:max-w-7xl mx-auto md:px-12">
        {/* ── Header ───────────────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-[40px] md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-inter text-[14px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#b87333] md:text-cream/50 mb-[8px] md:mb-4 font-bold md:font-medium"
          >
            Verified Credentials
          </motion.p>
          <div className="overflow-hidden mb-[16px] md:mb-6">
            <motion.h2
              initial={{ y: 80 }}
              animate={isHeadingInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[30px] md:text-7xl text-cream font-normal tracking-tight leading-tight"
            >
              Certifications
            </motion.h2>
          </div>
          <div className="h-[2px] bg-[#b87333]/40 mx-auto w-[80px] md:hidden" />
        </div>

        {/* ── 3D Carousel (Responsive) ───────────────────── */}
        <div className="relative flex items-center justify-center" style={{ height: isMobile ? '380px' : '420px', perspective: '1200px' }}>
          <AnimatePresence initial={false} custom={dragDirection}>
            {certificates.map((cert, index) => {
              const offset = getOffset(index);
              const absOffset = Math.abs(offset);

              // Only render visible cards (-2 to +2)
              if (absOffset > 2) return null;

              const isCenter = offset === 0;
              
              const x = offset * (isMobile ? 220 : 260);
              const z = -absOffset * (isMobile ? 60 : 80);
              const rotateY = offset * (isMobile ? -4 : -6);
              const scale = 1 - absOffset * (isMobile ? 0.12 : 0.08);
              const opacity = 1 - absOffset * (isMobile ? 0.4 : 0.3);

              return (
                <motion.div
                  key={cert.id}
                  className="absolute hover-target"
                  style={{
                    width: isMobile ? '72vw' : '320px',
                    maxWidth: '320px',
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
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={isCenter ? handleDragEnd : undefined}
                  onClick={() => {
                    if (isCenter) setSelectedCert(cert);
                    else {
                      if (offset > 0) next();
                      if (offset < 0) prev();
                    }
                  }}
                  whileHover={isCenter && !isMobile ? { y: -8, scale: 1.03 } : {}}
                  whileTap={isCenter && isMobile ? { scale: 0.98 } : {}}
                >
                  <div
                    className={`relative p-6 md:p-8 rounded-[24px] md:rounded-3xl transition-all duration-500 flex flex-col justify-center ${
                      isCenter ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    style={{
                      minHeight: isMobile ? '280px' : 'auto',
                      background: isCenter
                        ? '#2D2825'
                        : '#24201E',
                      backdropFilter: 'none',
                      border: isCenter
                        ? '1px solid rgba(255,255,255,0.06)'
                        : '1px solid rgba(255,255,255,0.02)',
                      boxShadow: isCenter
                        ? '0 25px 50px -12px rgba(0,0,0,0.5)'
                        : '0 10px 30px -10px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Category tag */}
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-medium mb-4 md:mb-6 font-inter"
                      style={{
                        color: '#b87333',
                        background: 'rgba(184, 115, 51, 0.1)',
                        border: '1px solid rgba(184, 115, 51, 0.25)',
                      }}
                    >
                      {cert.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-heading text-xl md:text-3xl text-cream font-normal leading-snug mb-2 md:mb-3">
                      {cert.title}
                    </h3>

                    {/* Organization */}
                    <p className="font-inter text-cream/60 text-[10px] md:text-xs font-medium uppercase tracking-widest mb-1">
                      {cert.org}
                    </p>

                    {/* Date */}
                    <p className="font-inter text-gold-accent/80 font-medium tracking-wide text-[10px] md:text-xs mt-2 md:mt-3 mb-6 md:mb-8">
                      {cert.date}
                    </p>

                    {/* View CTA */}
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-warm-brown text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] group"
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
                      className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 pointer-events-none"
                      style={{
                        borderTop: '1px solid rgba(216,164,107,0.2)',
                        borderRight: '1px solid rgba(216,164,107,0.2)',
                        borderTopRightRadius: '1.5rem',
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>



        {/* ── Navigation ────────────────────── */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover-target bg-transparent border border-cream/20 hover:bg-cream hover:text-dark-text text-cream/60"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="hover-target transition-all duration-300"
                style={{
                  width: i === activeIndex ? (isMobile ? 18 : 24) : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === activeIndex ? 'var(--color-warm-brown)' : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover-target bg-transparent border border-cream/20 hover:bg-cream hover:text-dark-text text-cream/60"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Counter */}
        <p className="text-center mt-4 text-cream/30 text-[10px] md:text-xs tracking-wider font-medium">
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

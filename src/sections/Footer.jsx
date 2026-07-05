import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaHeart } from 'react-icons/fa';
import { Mail, Phone, MapPin, Globe, ArrowUp } from 'lucide-react';

// ── Flickering Grid Canvas ──────────────────────────────────────────
const FlickeringGrid = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.15,
  color = 'rgba(166, 106, 63, 1)',
  maxOpacity = 0.2,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const setupCanvas = useCallback(
    (canvas, width, height) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.ceil(width / (squareSize + gridGap));
      const rows = Math.ceil(height / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let gridParams;

    const updateCanvasSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      gridParams = setupCanvas(canvas, w, h);
    };
    updateCanvasSize();

    let lastTime = 0;
    const animate = (time) => {
      if (!isInView) return;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // flicker
      for (let i = 0; i < gridParams.squares.length; i++) {
        if (Math.random() < flickerChance * dt) {
          gridParams.squares[i] = Math.random() * maxOpacity;
        }
      }

      // draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { cols, rows, squares, dpr } = gridParams;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const opacity = squares[i * rows + j];
          ctx.fillStyle = color.replace('1)', `${opacity})`);
          ctx.fillRect(x, y, squareSize * dpr, squareSize * dpr);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    if (isInView) animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, flickerChance, maxOpacity, color, squareSize, gridGap, isInView]);

  return (
    <div ref={containerRef} className={`h-full w-full ${className}`}>
      <canvas ref={canvasRef} className="pointer-events-none w-full h-full" />
    </div>
  );
};

// ── Footer Links ────────────────────────────────────────────────────
const footerLinks = [
  {
    title: 'Navigate',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projects', href: '#projects' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Education', href: '#education' },
      { label: 'Experience', href: '#experience' },
      { label: 'Certifications', href: '#certifications' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

const socialLinks = [
  {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/ankita-karan-440b65347',
    label: 'LinkedIn',
  },
  {
    icon: FaGithub,
    href: 'https://github.com/Ankita18112005',
    label: 'GitHub',
  },
];

// ── Main Footer Component ───────────────────────────────────────────
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-text text-cream overflow-hidden">
      {/* Top Divider Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-warm-brown/50 to-transparent" />

      {/* ── Main Footer Content ───────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-[20px] md:px-12 pt-[40px] pb-[70px] md:pt-20 md:pb-12 hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] md:gap-12 lg:gap-8">
          {/* Column 1 – Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="font-heading text-4xl text-cream mb-1">
              A<span className="text-[var(--color-warm-brown)]">K</span>
            </h3>
            <p className="text-sm text-cream/40 uppercase tracking-[0.3em] mb-5 font-medium">
              Ankita Karan
            </p>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs mb-8">
              Frontend Developer & UI/UX Designer crafting immersive digital experiences with modern UI, animation, and scalable web technologies.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-cream/15 flex items-center justify-center text-cream/50 hover:text-cream hover:border-[var(--color-warm-brown)] hover:bg-[var(--color-warm-brown)]/10 transition-all duration-300 hover-target"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 & 3 – Navigation */}
          {footerLinks.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (groupIndex + 1) }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h4 className="font-heading text-lg text-cream/80 mb-6 tracking-widest">
                {group.title}
              </h4>
              <ul className="space-y-3 flex flex-col items-center md:items-start">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors duration-300 hover-target"
                    >
                      <span className="w-0 h-px bg-[var(--color-warm-brown)] group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Column 4 – Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h4 className="font-heading text-lg text-cream/80 mb-6 tracking-widest">
              Get in Touch
            </h4>
            <ul className="space-y-4 flex flex-col items-center md:items-start">
              <li className="flex items-center justify-center md:justify-start gap-3 text-sm text-cream/50">
                <Mail size={14} className="text-[var(--color-warm-brown)] shrink-0" />
                <a href="mailto:ankitakaranjgm@gmail.com" className="hover:text-cream transition-colors hover-target">
                  ankitakaranjgm@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-sm text-cream/50">
                <Phone size={14} className="text-[var(--color-warm-brown)] shrink-0" />
                <a href="tel:+918250930522" className="hover:text-cream transition-colors hover-target">
                  +91 8250930522
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-sm text-cream/50">
                <MapPin size={14} className="text-[var(--color-warm-brown)] shrink-0" />
                <span>Jhargram, West Bengal</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-sm text-cream/50">
                <Globe size={14} className="text-[var(--color-warm-brown)] shrink-0" />
                <a href="https://parot.dev" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors hover-target">
                  parot.dev
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ═══ MOBILE ═══ */}
      <div className="relative z-10 w-full px-[20px] py-[40px] md:hidden flex flex-col gap-[32px]">
        {/* Brand & Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <h3 className="font-heading text-3xl text-cream mb-2 flex items-center justify-center gap-2">
            A<span className="text-[var(--color-warm-brown)]">K</span> 
            <span className="text-cream/20 font-inter mx-1 font-light">|</span> 
            <span className="text-[14px] text-cream/70 uppercase tracking-[0.2em] font-medium mt-[2px] font-inter">Ankita Karan</span>
          </h3>
          <p className="text-cream/50 text-[12px] leading-relaxed max-w-[280px] mx-auto mb-5 font-inter">
            Frontend Developer & UI/UX Designer crafting immersive digital experiences.
          </p>
          <div className="flex gap-4 justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="w-[36px] h-[36px] rounded-full border border-cream/15 flex items-center justify-center text-cream/50 hover:text-cream hover:border-[var(--color-warm-brown)] hover:bg-[var(--color-warm-brown)]/10 transition-colors"
              >
                <social.icon size={14} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <h4 className="font-heading text-[13px] text-cream/80 mb-4 tracking-widest text-center uppercase">
            Quick Links
          </h4>
          <div className="grid grid-cols-2 gap-x-12 gap-y-[10px] text-center">
            <a href="#home" className="text-[12px] text-cream/50 font-inter hover:text-cream">Home</a>
            <a href="#education" className="text-[12px] text-cream/50 font-inter hover:text-cream">Education</a>
            <a href="#about" className="text-[12px] text-cream/50 font-inter hover:text-cream">About</a>
            <a href="#experience" className="text-[12px] text-cream/50 font-inter hover:text-cream">Experience</a>
            <a href="#skills" className="text-[12px] text-cream/50 font-inter hover:text-cream">Skills</a>
            <a href="#certifications" className="text-[12px] text-cream/50 font-inter hover:text-cream">Certificates</a>
            <a href="#projects" className="text-[12px] text-cream/50 font-inter hover:text-cream">Projects</a>
            <a href="#contact" className="text-[12px] text-cream/50 font-inter hover:text-cream">Contact</a>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-[8px]"
        >
          <a href="mailto:ankitakaranjgm@gmail.com" className="flex items-center gap-[8px] text-[12px] text-cream/50 font-inter hover:text-cream">
            <Mail size={12} className="text-[var(--color-warm-brown)]" />
            <span>ankitakaranjgm@gmail.com</span>
          </a>
          <a href="tel:+918250930522" className="flex items-center gap-[8px] text-[12px] text-cream/50 font-inter hover:text-cream">
            <Phone size={12} className="text-[var(--color-warm-brown)]" />
            <span>+91 8250930522</span>
          </a>
          <div className="flex items-center gap-[8px] text-[12px] text-cream/50 font-inter">
            <MapPin size={12} className="text-[var(--color-warm-brown)]" />
            <span>Jhargram, West Bengal</span>
          </div>
        </motion.div>
      </div>

      {/* ── Flickering Grid + Large Name ─────────────────────── */}
      <div className="relative w-full h-24 sm:h-32 md:h-56 mt-4 md:mt-8">
        {/* Gradient fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-dark-text z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--color-dark-text) 0%, transparent 50%)' }} />

        {/* Flickering canvas grid */}
        <div className="absolute inset-0 mx-4">
          <FlickeringGrid
            squareSize={2}
            gridGap={3}
            color="rgba(166, 106, 63, 1)"
            maxOpacity={0.25}
            flickerChance={0.12}
          />
        </div>

        {/* Large background name */}
        <div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none pb-2 md:pb-4 overflow-hidden w-full">
          <h2 className="font-heading text-[10vw] md:text-[clamp(3rem,12vw,10rem)] text-cream/[0.04] leading-none tracking-widest select-none whitespace-nowrap px-4">
            ANKITA KARAN
          </h2>
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-[20px] md:px-12 py-[20px] md:py-6 flex flex-col md:flex-row items-center justify-between gap-[16px] md:gap-4">
          <p className="text-[10px] md:text-xs text-cream/40 tracking-wider text-center md:text-left leading-relaxed font-inter">
            <span className="md:hidden block">© {currentYear} Ankita Karan • Built with React & Next.js</span>
            <span className="hidden md:inline">
              © {currentYear} Ankita Karan. Crafted with{' '}
              <FaHeart className="inline text-[var(--color-warm-brown)] mx-0.5" size={10} />{' '}
              All rights reserved.
            </span>
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-cream/40 hover:text-cream transition-colors uppercase tracking-widest hover-target"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-cream/15 flex items-center justify-center group-hover:border-[var(--color-warm-brown)] group-hover:bg-[var(--color-warm-brown)]/10 transition-all duration-300">
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

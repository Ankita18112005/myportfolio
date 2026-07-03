import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ── Skill Data ──────────────────────────────────────────────────────
const skills = [
  { name: 'HTML', size: 90 },
  { name: 'CSS', size: 85 },
  { name: 'JavaScript', size: 78 },
  { name: 'React', size: 75 },
  { name: 'Tailwind CSS', size: 82 },
  { name: 'UI/UX Design', size: 88 },
  { name: 'Responsive Design', size: 86 },
  { name: 'Figma', size: 80 },
  { name: 'GitHub', size: 72 },
  { name: 'Java', size: 65 },
  { name: 'Firebase', size: 68 },
  { name: 'Node.js', size: 62 },
  { name: 'MongoDB', size: 60 },
];

// ── Background Particles Canvas ─────────────────────────────────────
const ParticleField = ({ mousePos, isMobile }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const count = isMobile ? 30 : 60;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 164, 107, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connection lines between close particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(166, 106, 63, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

// ── Single Floating Orb ─────────────────────────────────────────────
const SkillOrb = ({ skill, index, total, mousePos, containerRect, isMobile }) => {
  const orbRef = useRef(null);
  const posRef = useRef({
    x: 0,
    y: 0,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    baseX: 0,
    baseY: 0,
  });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const animRef = useRef(null);
  const initialized = useRef(false);

  // Orb visual size based on screen width
  const baseSize = isMobile ? 55 : 80;
  const sizeMultiplier = isMobile ? 25 : 60;
  const orbSize = baseSize + (skill.size / 100) * sizeMultiplier;
  const glowIntensity = skill.size / 100;

  // Initialize position
  useEffect(() => {
    if (!containerRect || containerRect.width === 0) return;
    if (!initialized.current) {
      const padding = orbSize;
      const x = padding + Math.random() * (containerRect.width - padding * 2);
      const y = padding + Math.random() * (containerRect.height - padding * 2);
      posRef.current.x = x;
      posRef.current.y = y;
      posRef.current.baseX = x;
      posRef.current.baseY = y;
      setPos({ x, y });
      initialized.current = true;
    }
  }, [containerRect, orbSize]);

  // Animation loop
  useEffect(() => {
    if (!containerRect || containerRect.width === 0) return;

    const floatAmplitudeX = (isMobile ? 20 : 30) + Math.random() * (isMobile ? 30 : 40);
    const floatAmplitudeY = (isMobile ? 15 : 20) + Math.random() * (isMobile ? 25 : 30);
    const floatSpeedX = 0.0003 + Math.random() * 0.0004;
    const floatSpeedY = 0.0004 + Math.random() * 0.0003;
    const phaseX = Math.random() * Math.PI * 2;
    const phaseY = Math.random() * Math.PI * 2;

    const animate = (time) => {
      const p = posRef.current;
      const w = containerRect.width;
      const h = containerRect.height;

      const floatX = Math.sin(time * floatSpeedX + phaseX) * floatAmplitudeX;
      const floatY = Math.cos(time * floatSpeedY + phaseY) * floatAmplitudeY;
      let targetX = p.baseX + floatX;
      let targetY = p.baseY + floatY;

      if (!isMobile && mousePos.current) {
        const mx = mousePos.current.x;
        const my = mousePos.current.y;
        const dx = targetX - mx;
        const dy = targetY - my;
        const dist = Math.hypot(dx, dy);
        const repelRadius = 150;

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 60;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }
      }

      // Soft boundary clamping
      const padding = orbSize / 2 + 2;
      targetX = Math.max(padding, Math.min(w - padding, targetX));
      targetY = Math.max(padding, Math.min(h - padding, targetY));

      p.x += (targetX - p.x) * (isMobile ? 0.04 : 0.02);
      p.y += (targetY - p.y) * (isMobile ? 0.04 : 0.02);

      setPos({ x: p.x, y: p.y });
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [containerRect, mousePos, orbSize, isMobile]);

  const delay = index * 0.08;

  return (
    <motion.div
      ref={orbRef}
      className="absolute z-10"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        left: pos.x - orbSize / 2,
        top: pos.y - orbSize / 2,
        width: orbSize,
        height: orbSize,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-700"
        style={{
          background: `radial-gradient(circle, rgba(166,106,63,${isHovered ? 0.3 : 0.12}) 0%, transparent 70%)`,
          transform: `scale(${isHovered ? 2.2 : 1.6})`,
          filter: `blur(${isHovered ? 20 : 12}px)`,
        }}
      />

      {/* Rotating ring */}
      <div
        className="absolute inset-[-4px] rounded-full transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0.3,
          background: `conic-gradient(from ${Date.now() * 0.02}deg, transparent 0%, rgba(216,164,107,0.4) 25%, transparent 50%, rgba(166,106,63,0.3) 75%, transparent 100%)`,
          animation: 'spin 8s linear infinite',
        }}
      />

      {/* Glass orb body */}
      <div
        className="relative w-full h-full rounded-full flex items-center justify-center cursor-pointer hover-target transition-all duration-500"
        style={{
          background: isHovered
            ? 'radial-gradient(circle at 35% 35%, rgba(216,164,107,0.25) 0%, rgba(26,26,26,0.85) 60%, rgba(26,26,26,0.95) 100%)'
            : 'radial-gradient(circle at 35% 35%, rgba(216,164,107,0.12) 0%, rgba(26,26,26,0.8) 60%, rgba(26,26,26,0.9) 100%)',
          backdropFilter: 'blur(12px)',
          border: `1px solid rgba(216,164,107,${isHovered ? 0.5 : 0.15})`,
          boxShadow: isHovered
            ? '0 0 30px rgba(166,106,63,0.3), inset 0 1px 1px rgba(255,255,255,0.1)'
            : '0 0 15px rgba(166,106,63,0.1), inset 0 1px 1px rgba(255,255,255,0.05)',
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        {/* Inner highlight */}
        <div
          className="absolute top-[15%] left-[20%] w-[30%] h-[20%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 100%)',
            filter: 'blur(3px)',
          }}
        />

        {/* Skill name */}
        <span
          className="text-cream font-medium text-center leading-tight select-none px-1 relative z-10 transition-all duration-300"
          style={{
            fontSize: orbSize < 75 ? '0.55rem' : '0.7rem',
            textShadow: isHovered
              ? '0 0 12px rgba(216,164,107,0.6)'
              : '0 0 6px rgba(216,164,107,0.2)',
            letterSpacing: '0.05em',
          }}
        >
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

// ── Main Skills Section ─────────────────────────────────────────────
const Skills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [containerRect, setContainerRect] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      setContainerRect({ width: rect.width, height: rect.height });
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Track mouse position relative to container
  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, [isMobile]);

  const displaySkills = isMobile ? skills.slice(0, 7) : skills;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative bg-dark-text z-10 overflow-hidden flex flex-col justify-center ${isMobile ? 'min-h-[75vh] py-8' : 'min-h-screen py-16 md:py-20'}`}
      onMouseMove={handleMouseMove}
    >
      {/* ── Background Layers ──────────────────────────────── */}
      {/* Ambient blobs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[35vw] h-[35vw] bg-warm-brown/8 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] bg-gold-accent/6 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-warm-brown/5 rounded-full blur-[150px]" />
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 noise-bg opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26,26,26,0.6) 100%)',
        }}
      />

      {/* ── Header ────────────────────────────────────────── */}
      <div className={`relative z-20 text-center px-6 ${isMobile ? 'mb-4 mt-4' : 'mb-16'}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[var(--color-warm-brown)] text-xs uppercase tracking-[0.4em] mb-4 font-medium">
            What I Work With
          </p>
          <h2 className={`font-heading text-cream mb-4 ${isMobile ? 'text-4xl' : 'text-5xl md:text-7xl'}`}>
            TECHNICAL <span className="text-warm-brown">ARSENAL</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            className="h-[2px] bg-gold-accent mx-auto mb-6"
          />
          <p className="text-cream/40 text-sm max-w-md mx-auto font-light">
            Hover and explore — each orb represents a tool in my creative toolkit
          </p>
        </motion.div>
      </div>

      {/* ── Orbs Container ────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-2 md:px-6"
        style={{ height: isMobile ? '400px' : 'clamp(450px, 60vh, 700px)' }}
      >
        {/* Particle field */}
        <ParticleField mousePos={mousePos} isMobile={isMobile} />

        {/* Skill Orbs */}
        {containerRect.width > 0 &&
          displaySkills.map((skill, index) => (
            <SkillOrb
              key={skill.name}
              skill={skill}
              index={index}
              total={displaySkills.length}
              mousePos={mousePos}
              containerRect={containerRect}
              isMobile={isMobile}
            />
          ))}
      </div>

      {/* ── Bottom gradient fade ──────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-text to-transparent z-[2] pointer-events-none" />
    </section>
  );
};

export default Skills;

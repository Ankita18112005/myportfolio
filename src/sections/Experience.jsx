import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Code, Palette, FolderGit2, Sparkles, CheckCircle2 } from 'lucide-react';

const journeyNodes = [
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
    angle: -90, // Top (12 o'clock)
    card: {
      category: 'EDUCATION',
      role: 'CSE STUDENT',
      company: 'JIS College of Engineering',
      period: '2023 – 2027',
      description: 'Currently pursuing B.Tech in Computer Science Engineering.\n\nFocused on building strong fundamentals and applying them through real-world projects.',
      focusAreas: [
        'Data Structures & Algorithms',
        'Web Development',
        'UI/UX Design',
        'Problem Solving'
      ]
    }
  },
  {
    id: 'development',
    title: 'Development',
    icon: Code,
    angle: -18, // Right slightly up (2 o'clock)
    card: {
      category: 'DEVELOPMENT',
      role: 'FRONTEND DEV',
      company: 'Self Taught & Projects',
      period: '2023 – Present',
      description: 'Building modern web applications with clean architecture and responsive design.\n\nCrafting pixel-perfect user interfaces.',
      focusAreas: [
        'React & Next.js',
        'Tailwind CSS',
        'Firebase',
        'Responsive Design'
      ]
    }
  },
  {
    id: 'future',
    title: 'Future',
    icon: Sparkles,
    angle: 54, // Bottom Right (5 o'clock)
    card: {
      category: 'FUTURE',
      role: 'BACKEND DEV',
      company: 'Currently Learning',
      period: 'Ongoing',
      description: 'Always improving and learning new technologies to become a complete Full Stack Developer.',
      focusAreas: [
        'Node.js & Express',
        'MongoDB',
        'API Design',
        'System Architecture'
      ]
    }
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: FolderGit2,
    angle: 126, // Bottom Left (7 o'clock)
    card: {
      category: 'PROJECTS',
      role: 'CREATOR',
      company: '15+ Projects Built',
      period: 'Continuous',
      description: 'Building real-world applications with modern technologies to solve real problems.',
      focusAreas: [
        'TimeNest',
        'Valix',
        'MediLink',
        'Parot.dev'
      ]
    }
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    icon: Palette,
    angle: 198, // Left slightly up (10 o'clock)
    card: {
      category: 'UI/UX DESIGN',
      role: 'UI/UX DESIGNER',
      company: 'Parot.dev',
      period: 'Present',
      description: 'Working as a UI/UX Designer at Parot.dev, creating modern designs, prototypes, and responsive user experiences with a focus on aesthetics.',
      focusAreas: [
        'Wireframing',
        'Prototyping',
        'Design Systems',
        'User Research'
      ]
    }
  }
];

const Experience = () => {
  const [activeNodeId, setActiveNodeId] = useState(journeyNodes[0].id);
  const activeNode = journeyNodes.find(n => n.id === activeNodeId) || journeyNodes[0];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="experience" className="pt-20 pb-4 md:pt-32 md:pb-8 relative bg-[#EFE8DB] text-[#332828] overflow-hidden">

      {/* Paper Texture Grain */}
      <div className="noise-bg opacity-[0.04] pointer-events-none absolute inset-0 z-0 mix-blend-multiply"></div>

      {/* Soft Warm Vignette & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(169,113,66,0.04)_100%)] pointer-events-none z-0"></div>

      {/* Radial glow behind center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] bg-[radial-gradient(circle_at_center,rgba(169,113,66,0.09)_0%,transparent_50%)] pointer-events-none rounded-full z-0" />

      {/* Subtle Abstract Lines / Decorations */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20%" cy="30%" r="2.5" fill="#A97142" />
        <circle cx="80%" cy="70%" r="2.5" fill="#A97142" />
        <circle cx="10%" cy="60%" r="1.5" fill="#A97142" />
        <circle cx="90%" cy="25%" r="2" fill="#A97142" />
        {/* Floating particles */}
        <circle cx="25%" cy="80%" r="1" fill="#A97142" opacity="0.6" />
        <circle cx="75%" cy="20%" r="1" fill="#A97142" opacity="0.6" />
      </svg>

      <div className="w-full mx-auto relative z-10 flex flex-col items-center">

        {/* Top: Titles */}
        <div className="w-full flex flex-col items-center text-center z-20 shrink-0 mb-6 md:mb-14 px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-inter text-[10px] md:text-[12px] font-bold tracking-[0.35em] text-[#A97142] uppercase mb-2 md:mb-4"
          >
            MY JOURNEY SO FAR
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="font-playfair text-[36px] md:text-6xl lg:text-[60px] xl:text-[66px] font-bold text-[#2C2222] mb-4 md:mb-6 leading-tight drop-shadow-sm tracking-tight flex flex-col md:block"
          >
            <span>PROFESSIONAL</span>
            <span className="bg-gradient-to-r from-[#B97A45] to-[#8F5C31] text-transparent bg-clip-text md:ml-3">JOURNEY</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 60 }}
            viewport={{ once: true, delay: 0.2 }}
            className="h-[2px] bg-[#A97142]/80 mb-4 md:mb-6 relative"
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#A97142] translate-x-1/2 shadow-[0_0_5px_rgba(169,113,66,0.6)]"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#A97142] -translate-x-1/2"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.3 }}
            className="font-inter text-[15px] md:text-[16px] text-[#332828]/70 leading-relaxed w-[90%] md:max-w-lg font-medium"
          >
            A continuous journey of learning, designing, building, and growing into a full stack developer.
          </motion.p>
        </div>

        {/* Bottom: Layout (Stack on Mobile, Horizontal on Desktop) */}
        <div className="w-full max-w-[1400px] px-0 md:px-12 flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-[60px] lg:gap-[80px] xl:gap-[120px] lg:translate-x-4 xl:translate-x-8 mt-2 md:mt-0">

          {/* Center: Circular Journey */}
          <div className="w-full lg:w-[50%] flex justify-center items-center relative py-12 md:py-0 min-h-[360px] md:min-h-[500px] shrink-0">

            {/* Rotating Orbit Lines */}
            <motion.div
              className="absolute w-[240px] h-[240px] md:w-[440px] md:h-[440px] lg:w-[400px] lg:h-[400px] xl:w-[480px] xl:h-[480px] rounded-full border-[0.5px] border-dashed border-[#A97142]/30 pointer-events-none flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 45, ease: "linear", repeat: Infinity }}
            >
              <div className="absolute top-0 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#F8F5EF] border-[1.5px] md:border-[2px] border-[#A97142] shadow-[0_0_15px_4px_rgba(169,113,66,0.6)] -translate-y-1/2"></div>
              <div className="absolute bottom-0 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#A97142] shadow-[0_0_12px_2px_rgba(169,113,66,0.6)] translate-y-1/2"></div>
              <div className="absolute left-0 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#A97142] shadow-[0_0_12px_2px_rgba(169,113,66,0.6)] -translate-x-1/2"></div>
            </motion.div>

            {/* Travelling Light on active node switch */}
            <motion.div
              className="absolute w-[240px] h-[240px] md:w-[440px] md:h-[440px] lg:w-[400px] lg:h-[400px] xl:w-[480px] xl:h-[480px] rounded-full pointer-events-none"
              animate={{ rotate: activeNode.angle + 90 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#A97142]/40 blur-md"></div>
            </motion.div>

            {/* Glowing Center (Premium Porcelain Disc) - PERFECTLY STILL */}
            <motion.div
              className="absolute w-[110px] h-[110px] md:w-44 md:h-44 rounded-full border border-[#A97142]/30 bg-gradient-to-b from-[#FFFFFF] to-[#F8F5EF] flex flex-col items-center justify-center z-10"
              animate={{
                boxShadow: [
                  "inset 0 10px 20px rgba(255,255,255,1), inset 0 -4px 15px rgba(169,113,66,0.05), 0 15px 30px rgba(0,0,0,0.08), 0 0 40px rgba(169,113,66,0.15)",
                  "inset 0 10px 20px rgba(255,255,255,1), inset 0 -4px 15px rgba(169,113,66,0.05), 0 20px 40px rgba(0,0,0,0.1), 0 0 60px rgba(169,113,66,0.25)",
                  "inset 0 10px 20px rgba(255,255,255,1), inset 0 -4px 15px rgba(169,113,66,0.05), 0 15px 30px rgba(0,0,0,0.08), 0 0 40px rgba(169,113,66,0.15)"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ rotate: 0 }}
            >
              <div className="text-[#2C2222] font-playfair text-[38px] md:text-6xl font-bold mb-0.5 md:mb-1 tracking-tight drop-shadow-sm rotate-0">AK</div>
              <div className="text-[#A97142] font-inter text-[8px] md:text-[10px] tracking-[0.25em] uppercase text-center leading-tight font-bold mt-0 md:mt-1 rotate-0">
                Growing<br />Every Day
              </div>
              <div className="mt-2 md:mt-4 w-10 md:w-14 flex items-center justify-center gap-1.5 opacity-80 rotate-0">
                <div className="w-3 md:w-5 h-[1px] bg-gradient-to-r from-transparent to-[#A97142]"></div>
                <Sparkles size={8} className="text-[#A97142] md:w-[10px] md:h-[10px]" />
                <div className="w-3 md:w-5 h-[1px] bg-gradient-to-l from-transparent to-[#A97142]"></div>
              </div>
            </motion.div>

            {/* Nodes */}
            {journeyNodes.map((node) => {
              const isActive = activeNodeId === node.id;

              // Keep the exact same circular math calculation!
              let radius = isMobile ? 120 : 240;
              if (typeof window !== 'undefined' && !isMobile) {
                if (window.innerWidth < 1024) radius = 220;
                else if (window.innerWidth < 1280) radius = 200;
                else radius = 240;
              }

              const radian = (node.angle * Math.PI) / 180;
              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;

              return (
                <div
                  key={node.id}
                  className="absolute flex items-center justify-center z-20"
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                >
                  <motion.div
                    className="cursor-pointer group relative flex items-center justify-center"
                    onClick={() => setActiveNodeId(node.id)}
                    onHoverStart={() => !isMobile && setActiveNodeId(node.id)}
                    whileHover={!isMobile ? { scale: 1.08, y: -5 } : {}}
                  >
                    {/* Active Node Bronze Halo */}
                    <div className={`absolute -inset-4 md:-inset-6 rounded-full transition-all duration-700 ${isActive ? 'bg-[#C98A52]/25 blur-lg md:blur-xl scale-110' : 'bg-transparent scale-90'}`} />

                    {/* Inner Node Circle with Floating Animation */}
                    <motion.div
                      animate={!isMobile ? { y: [-2, 2, -2] } : {}}
                      transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 } }}
                      className={`
                          relative w-[52px] h-[52px] md:w-16 md:h-16 rounded-full flex items-center justify-center bg-gradient-to-b from-[#D49862] to-[#9E6636] transition-all duration-700
                          border-[1.5px] md:border-[2px] border-[#FFF8F1] border-t-[#FFE4C4] overflow-hidden
                          ${isActive
                          ? 'ring-[3px] md:ring-4 ring-[#A97142]/30 shadow-[0_10px_25px_rgba(169,113,66,0.4),_0_0_30px_rgba(169,113,66,0.35),_inset_0_2px_4px_rgba(255,255,255,0.4)] scale-110'
                          : 'shadow-sm opacity-80 group-hover:opacity-100 group-hover:shadow-md'
                        }
                        `}
                    >
                      {/* Inner Glossy Highlight for Nodes */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 pointer-events-none"></div>
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

                      <node.icon size={isMobile ? 20 : 22} className={`text-white drop-shadow-md relative z-10 transition-all duration-700 ${isActive ? 'scale-110' : ''}`} />
                    </motion.div>

                    {/* Node Title (Bronze Capsule) */}
                    <div className={`absolute -top-9 md:-top-12 whitespace-nowrap px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-gradient-to-r from-[#B97A45] to-[#8F5C31] shadow-[0_8px_16px_rgba(169,113,66,0.35),_inset_0_1px_2px_rgba(255,255,255,0.4)] font-inter text-[8.5px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}`}>
                      {node.title}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Right: Info Card (Mobile placed below, Desktop right) */}
          <div className="w-full px-4 lg:px-0 lg:w-[40%] flex justify-center lg:justify-end z-20 shrink-0 mx-auto">
            <div className="w-full max-w-[340px] md:max-w-[360px] lg:max-w-[380px] xl:max-w-[400px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={isMobile ? { opacity: 0, y: 15 } : { opacity: 0, x: 30, y: 0 }}
                  animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0 }}
                  exit={isMobile ? { opacity: 0, y: -15 } : { opacity: 0, x: -30, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative w-full bg-gradient-to-br from-[#B97A45] via-[#A86B3B] to-[#8F5C31] backdrop-blur-3xl border border-[#FFF8F1]/30 rounded-[24px] p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.2),_0_10px_25px_rgba(169,113,66,0.3),_inset_0_2px_4px_rgba(255,255,255,0.3)] flex flex-col min-h-[280px] md:min-h-[400px] overflow-hidden"
                >
                  {/* Soft Glossy Highlight at top */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-[24px]"></div>
                  <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-[24px]"></div>
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                  {/* Header Row */}
                  <div className="flex items-start gap-4 mb-4 md:mb-5 relative z-10">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center shrink-0 shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)] backdrop-blur-md">
                      <activeNode.icon size={18} className="text-[#FFF8F1] drop-shadow-md md:w-5 md:h-5" />
                    </div>
                    <div className="flex flex-col justify-center pt-0.5">
                      <h4 className="font-inter text-[8px] md:text-[9px] font-bold tracking-[0.35em] text-[#FFF8F1]/80 mb-1 md:mb-1.5 uppercase leading-none">
                        {activeNode.card.category}
                      </h4>
                      <h3 className="font-playfair text-[18px] md:text-[20px] lg:text-[24px] text-[#FFF8F1] font-bold leading-tight mb-1 uppercase tracking-wider drop-shadow-md">
                        {activeNode.card.role}
                      </h3>
                      <p className="font-inter text-[11px] md:text-[12px] text-[#FFF8F1]/90 font-medium drop-shadow-sm leading-snug">
                        {activeNode.card.company}
                      </p>
                      <p className="font-inter text-[10px] md:text-[11px] text-[#FFF8F1]/70 font-medium mt-1 md:mt-1.5 leading-snug">
                        {activeNode.card.period}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Divider */}
                  <div className="flex items-center justify-center gap-2 my-3 md:my-4 relative z-10 opacity-70">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FFF8F1]/40"></div>
                    <Sparkles size={10} className="text-[#FFF8F1] md:w-3 md:h-3" />
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FFF8F1]/40"></div>
                  </div>

                  {/* Description */}
                  <p className="font-inter text-[13px] md:text-[14px] text-[#FFF8F1]/95 leading-[1.65] whitespace-pre-line font-medium relative z-10 mb-4 md:mb-5 drop-shadow-sm">
                    {activeNode.card.description}
                  </p>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FFF8F1]/30 to-transparent my-3 md:my-4 relative z-10"></div>

                  {/* Key Focus Areas */}
                  <div className="relative z-10 mt-1">
                    <h4 className="font-inter text-[8px] md:text-[9px] font-bold tracking-[0.3em] text-[#FFF8F1]/70 mb-2.5 md:mb-3 uppercase">
                      KEY FOCUS AREAS
                    </h4>
                    <div className="flex flex-col gap-2 md:gap-2.5">
                      {activeNode.card.focusAreas.map((area, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 md:gap-3">
                          <CheckCircle2 size={12} className="text-[#FFF8F1] opacity-90 drop-shadow-md md:w-[14px] md:h-[14px]" />
                          <span className="font-inter text-[12px] md:text-[13px] text-[#FFF8F1]/95 font-medium drop-shadow-sm">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;

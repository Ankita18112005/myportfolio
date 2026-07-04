import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'TimeNest',
    tagline: 'Session booking platform with authentication & management.',
    description: 'A comprehensive web application designed to help users manage their time effectively. Features include user authentication, seamless session booking, and a robust Firebase backend for real-time updates.',
    category: 'Full Stack',
    year: '2024',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Firebase'],
    demo: 'https://time-nest-henna.vercel.app',
    github: 'https://github.com/Ankita18112005'
  },
  {
    id: 2,
    title: 'ValiX',
    tagline: 'Startup idea validation platform with community feedback.',
    description: 'A platform connecting founders with real users to validate startup ideas. It features secure authentication, dynamic idea posting, community moderation workflows, and gamified user dashboards.',
    category: 'Full Stack',
    year: '2024',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tech: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
    demo: 'https://valix-gilt.vercel.app',
    github: 'https://github.com/Ankita18112005'
  },
  {
    id: 3,
    title: 'AMusicals',
    tagline: 'Modern portfolio website for a music production team.',
    description: 'A stunning, premium portfolio website designed for a music production team. Built with highly interactive UI, smooth scroll animations, and an immersive user experience tailored for creatives.',
    category: 'UI/UX & Frontend',
    year: '2024',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
    tech: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS'],
    demo: 'https://amusicals.in',
    github: 'https://github.com/Ankita18112005'
  },
  {
    id: 4,
    title: 'Craftsyyy',
    tagline: 'An elegant platform for showcasing unique handmade crafts.',
    description: 'A dedicated platform for artisans to showcase and explore handmade crafts. Features seamless product discovery, intuitive navigation, and a responsive modern design.',
    category: 'Web App',
    year: '2024',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop',
    tech: ['React', 'Next.js', 'Tailwind CSS'],
    demo: 'https://craftsyyy.parot.dev',
    github: 'https://github.com/Ankita18112005'
  },
  {
    id: 5,
    title: 'Ahaarsetu',
    tagline: 'Frontend implementation of a digital farm management platform.',
    description: 'A comprehensive frontend web application for the Ahaarsetu digital farm management platform. Built with an emphasis on transforming high-fidelity designs into a fully functional and optimized web app.',
    category: 'Frontend Web',
    year: '2024',
    status: 'Completed',
    image: '/ahaarsetu.png',
    tech: ['React', 'JavaScript', 'CSS', 'Vite'],
    demo: 'https://ahaarsetu-theta.vercel.app',
    github: 'https://github.com/Ankita18112005'
  }
];

const MobileProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col w-full bg-[#1c1a1a] rounded-[24px] overflow-hidden shadow-xl border border-[rgba(255,255,255,0.05)] transition-transform duration-300"
    >
      <div className="w-full h-[180px] overflow-hidden relative bg-[#111]">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a1a] to-transparent opacity-80" />
      </div>
      <div className="flex flex-col p-[20px]">
        {/* Tech Badges */}
        <div className="flex flex-wrap items-center gap-[6px] mb-[16px]">
          <span className="text-white/70 font-mono text-xs mr-1">{'</>'}</span>
          {project.tech.map((t, i) => (
            <span key={i} className="px-[10px] py-[4px] rounded-full border border-white/20 text-white/80 text-[8px] font-bold uppercase tracking-[0.15em] bg-white/5 whitespace-nowrap">
              {t}
            </span>
          ))}
        </div>
        
        {/* Title & Tagline */}
        <h3 className="font-inter text-[20px] font-bold text-white mb-[4px] leading-tight tracking-wide">{project.title}</h3>
        <p className="font-inter text-[12px] font-bold text-white/70 mb-[16px] tracking-wide">{project.category}</p>
        
        {/* Description */}
        <p className="font-inter text-white/60 text-[12px] leading-relaxed mb-[24px]">
          {project.description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-[16px] mt-auto pt-[16px] border-t border-white/10 w-full">
          <span className="text-white/40 text-[8px] font-bold uppercase tracking-[0.2em] mr-auto">
            Key Contributions
          </span>
          {project.demo && project.demo !== '#' && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-[#A97142] hover:text-[#D8A46B] text-[9px] font-bold uppercase tracking-widest flex items-center transition-colors">
              Demo <ExternalLink size={10} className="ml-1" />
            </a>
          )}
          {project.github && project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-[#A97142] hover:text-[#D8A46B] text-[9px] font-bold uppercase tracking-widest flex items-center transition-colors">
              GitHub <FaGithub size={10} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  // Fade in animation setup
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1.1", "0.5 1"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className="flex flex-col w-full bg-[#1c1a1a] rounded-[24px] overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.05)] transition-transform duration-300 hover:-translate-y-2 group"
    >
      {/* Image Side */}
      <div className="w-full h-[160px] md:h-[200px] overflow-hidden relative bg-[#111]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a1a] to-transparent opacity-80" />
      </div>

      {/* Content Side */}
      <div className="flex flex-col p-5 md:p-6 flex-1">

        {/* Tech Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-white/70 font-mono text-sm mr-1">{'</>'}</span>
          {project.tech.map((techItem, i) => (
            <span key={i} className="px-3 py-1 rounded-full border border-white/20 text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] bg-white/5 whitespace-nowrap">
              {techItem}
            </span>
          ))}
        </div>

        {/* Title & Tagline */}
        <h3 className="font-inter text-2xl md:text-3xl font-bold text-white mb-1 leading-tight tracking-wide">
          {project.title}
        </h3>
        <p className="font-inter text-sm font-bold text-white/70 mb-3 tracking-wide">
          {project.category}
        </p>

        {/* Description */}
        <p className="font-inter text-white/60 text-[13px] md:text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 mt-auto pt-4 border-t border-white/10">
          <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mr-auto">
            Key Contributions
          </span>
          {project.demo && project.demo !== '#' && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-[#A97142] hover:text-[#D8A46B] text-[10px] font-bold uppercase tracking-widest flex items-center transition-colors">
              Demo <ExternalLink size={12} className="ml-1.5" />
            </a>
          )}
          {project.github && project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-[#A97142] hover:text-[#D8A46B] text-[10px] font-bold uppercase tracking-widest flex items-center transition-colors">
              GitHub <FaGithub size={12} className="ml-1.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="pt-16 pb-16 md:py-20 relative bg-cream z-20 overflow-hidden">

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10 hidden md:block">

        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-inter text-sm uppercase tracking-[0.2em] text-[#8B0000] mb-4 font-bold"
          >
            MY WORK
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="font-playfair text-5xl md:text-7xl text-[#332828] font-bold mb-6 leading-tight"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.2 }}
            className="font-inter text-lg text-[#332828]/80 leading-relaxed"
          >
            Here are some of the projects I've built using modern web technologies. Each project focuses on solving real-world problems with clean design and great user experience.
          </motion.p>
        </div>

        {/* Project Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <a href="https://github.com/Ankita18112005" target="_blank" rel="noreferrer" className="px-8 py-3 border border-[#A97142] text-[#A97142] rounded-full font-medium tracking-wide hover:bg-[#A97142] hover:text-[#171412] transition-colors">
            View All Projects
          </a>
        </motion.div>

      </div>

      {/* ═══ MOBILE ═══ */}
      <div className="w-full mx-auto px-[20px] py-[30px] relative z-10 md:hidden">
        <div className="mb-[40px] text-center">
          <p className="font-inter text-[14px] uppercase tracking-[0.2em] text-[#8B0000] mb-[8px] font-bold">
            MY WORK
          </p>
          <h2 className="font-playfair text-[30px] text-[#332828] font-bold mb-[16px] leading-tight">
            Featured Projects
          </h2>
          <div className="h-[2px] bg-[#8B0000]/20 mx-auto w-[80px] mb-[24px]" />
          <p className="font-inter text-[14px] text-[#332828]/80 leading-[1.6]">
            Here are some of the projects I've built using modern web technologies. Each project focuses on solving real-world problems with clean design and great user experience.
          </p>
        </div>

        <div className="flex flex-col w-full gap-[32px]">
          {projects.map((project, index) => (
            <MobileProjectCard key={`mob-proj-${project.id}`} project={project} />
          ))}
        </div>

        <div className="flex justify-center mt-[40px] w-full">
          <a href="https://github.com/Ankita18112005" target="_blank" rel="noreferrer" className="w-full py-[16px] border border-[#A97142] text-[#A97142] rounded-full text-center text-[14px] font-medium tracking-wide hover:bg-[#A97142] hover:text-[#171412] transition-colors flex items-center justify-center">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

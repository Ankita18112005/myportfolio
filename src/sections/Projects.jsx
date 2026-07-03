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

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  // Fade in animation setup
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1.1", "0.5 1"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  // Determine layout direction (alternate every row)
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className="project-card-container w-full p-4 md:p-6 mb-12 lg:mb-16 flex flex-col lg:flex-row gap-6 lg:gap-8"
    >
      {/* Image Side */}
      <div className={`w-full lg:w-1/2 h-[250px] md:h-[350px] lg:h-auto min-h-[300px] project-img-wrapper ${!isEven ? 'lg:order-2' : ''}`}>
        <img
          src={project.image}
          alt={project.title}
          className="project-img"
          loading="lazy"
        />
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-4 lg:py-10 px-2 lg:px-8">

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4 text-xs font-inter font-bold tracking-widest text-[#8B0000] uppercase">
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-[#8B0000]/30"></span>
          <span>{project.year}</span>
          <span className="w-1 h-1 rounded-full bg-[#8B0000]/30"></span>
          <span className={project.status === 'Ongoing' ? 'text-orange-600' : 'text-[#8B0000]/70'}>
            {project.status}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-playfair text-3xl md:text-4xl font-bold text-[#332828] mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="font-inter text-lg md:text-xl font-medium text-[#8B0000] mb-6">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="font-inter text-[#332828]/80 leading-relaxed mb-8 max-w-[90%]">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tech.map((techItem, i) => (
            <span key={i} className="tech-pill font-inter">
              {techItem}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-auto">
          {project.demo !== '#' && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn-project-primary">
              Live Demo <ExternalLink size={16} />
            </a>
          )}
        </div>

      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-16 md:py-20 relative bg-cream z-20 overflow-hidden">

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">

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

        {/* Project Cards Vertical Layout */}
        <div className="flex flex-col w-full">
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
          <a href="https://github.com/Ankita18112005" target="_blank" rel="noreferrer" className="btn-project-secondary px-8">
            View All Projects
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;

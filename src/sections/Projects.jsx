import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Website UI/UX Design',
    description: 'Designed complete UI for a responsive website using Figma, with wireframes, reusable components, and a cohesive color palette focused on usability and clean visual hierarchy.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1200&auto=format&fit=crop',
    tech: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
    features: [
      'Designed complete UI for a responsive website',
      'Created wireframes, reusable components, and color palette',
      'Focused on usability, consistency, and clean visual hierarchy',
      'Delivered high-fidelity mockups ready for development',
    ],
    demo: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'Frontend Web Development',
    description: 'Developed responsive web pages using HTML and CSS with cross-browser compatibility, clean structured layouts, and modern design principles.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop',
    tech: ['HTML', 'CSS', 'Responsive Design', 'JavaScript'],
    features: [
      'Developed responsive web pages using HTML and CSS',
      'Ensured cross-browser compatibility across devices',
      'Created clean and structured layouts',
      'Applied modern design principles and best practices',
    ],
    demo: '#',
    github: 'https://github.com/Ankita18112005'
  }
];

const ProjectCard = ({ project, index, onOpen }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.2 1"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ y, opacity }}
      className="relative group w-full cursor-pointer hover-target"
      onClick={() => onOpen(project)}
    >
      <div className="absolute inset-0 bg-gold-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative glass p-6 md:p-8 rounded-3xl overflow-hidden h-[400px] md:h-[500px] flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex gap-2 mb-4 flex-wrap">
            {project.tech.slice(0, 3).map((t, i) => (
              <span key={i} className="text-xs font-medium px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-cream border border-white/20">
                {t}
              </span>
            ))}
          </div>
          
          <h3 className="font-heading text-4xl text-cream mb-2 group-hover:text-[var(--color-gold-accent)] transition-colors">
            {project.title}
          </h3>
          
          <p className="text-cream/70 text-sm md:text-base max-w-md line-clamp-2 mb-6">
            {project.description}
          </p>

          <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <button className="flex items-center gap-2 text-sm font-medium text-cream hover:text-[var(--color-gold-accent)] transition-colors">
              <ExternalLink size={16} /> View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={onClose} />
        
        <motion.div 
          layoutId={`project-${project.id}`}
          className="relative w-full max-w-6xl max-h-[90vh] bg-cream rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Left: Image */}
          <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-cream">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl text-dark-text mb-4"
            >
              {project.title}
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-2 mb-8 flex-wrap"
            >
              {project.tech.map((t, i) => (
                <span key={i} className="text-sm font-medium px-4 py-1.5 bg-warm-brown/10 rounded-full text-warm-brown border border-warm-brown/20">
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-dark-text/80 text-lg mb-8 leading-relaxed"
            >
              {project.description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <h4 className="font-heading text-2xl text-dark-text mb-4">Key Features</h4>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-dark-text/70">
                    <span className="text-warm-brown mt-1">✦</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 flex-wrap"
            >
              <a href={project.demo} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-4 bg-dark-text text-cream rounded-full font-medium hover:bg-warm-brown transition-colors">
                <ExternalLink size={20} /> Live Preview
              </a>
              <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-4 border border-dark-text text-dark-text rounded-full font-medium hover:bg-dark-text hover:text-cream transition-colors">
                <FaGithub size={20} /> Source Code
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-32 relative bg-dark-text text-cream z-20">
      <div className="absolute inset-0 noise-bg opacity-5 mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-cream mb-4"
          >
            SELECTED <span className="text-warm-brown">WORKS</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-[2px] bg-gold-accent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <div key={project.id} className={index % 2 !== 0 ? 'md:mt-32' : ''}>
              <ProjectCard project={project} index={index} onOpen={setSelectedProject} />
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;

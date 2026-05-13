import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'CSE Student',
    company: 'JIS College of Engineering',
    period: '2023 - Present',
    description: 'Pursuing B.Tech in Computer Science with a GPA of 8.7. Actively building frontend and UI/UX skills through coursework, self-study, and hands-on projects.',
  },
  {
    role: 'UI/UX Designer',
    company: 'Academic Project — Figma',
    period: '2024 - 2025',
    description: 'Designed complete UI for a responsive website including wireframes, reusable components, and a cohesive color palette. Focused on usability, consistency, and clean visual hierarchy.',
  },
  {
    role: 'Frontend Developer',
    company: 'Academic Project — Web Development',
    period: '2024',
    description: 'Developed responsive web pages using HTML and CSS. Ensured cross-browser compatibility and created clean, structured layouts with modern design principles.',
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-32 relative bg-cream z-10 overflow-hidden">
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gold-accent/10 rounded-full blur-[100px]" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl text-dark-text mb-4"
          >
            PROFESSIONAL <br/>
            <span className="text-warm-brown">JOURNEY</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-[2px] bg-gold-accent"
          />
        </div>

        <div className="relative border-l-2 border-dark-text/10 pl-8 md:pl-12 space-y-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative group hover-target"
            >
              {/* Timeline Node */}
              <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-cream border-4 border-warm-brown group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(166,106,63,0.5)]" />
              
              <div className="glass p-8 md:p-10 rounded-3xl border-white/50 group-hover:border-warm-brown/30 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <div>
                    <h3 className="font-heading text-3xl text-dark-text">{exp.role}</h3>
                    <h4 className="text-warm-brown font-medium tracking-wide">{exp.company}</h4>
                  </div>
                  <span className="px-4 py-2 bg-dark-text/5 rounded-full text-sm font-medium tracking-widest text-dark-text/70 uppercase w-fit">
                    {exp.period}
                  </span>
                </div>
                
                <p className="text-dark-text/70 leading-relaxed max-w-2xl relative z-10">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

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
    company: 'parot.dev',
    period: 'Present',
    description: 'Collaborating with a team of 6 friends to design the user interface and experience for parot.dev. Focused on creating an intuitive, modern, and user-centric platform.',
  },
  {
    role: 'Web Developer',
    company: 'Academic Project — Web Development',
    period: '2024',
    description: 'Developed responsive web pages using HTML and CSS. Ensured cross-browser compatibility and created clean, structured layouts with modern design principles.',
  }
];

const Experience = () => {
  return (
    <section id="experience" className="pt-16 pb-0 md:py-20 relative bg-cream z-10 overflow-hidden">
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gold-accent/10 rounded-full blur-[100px]" />

      {/* ═══ DESKTOP ═══ */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 hidden md:block">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl text-dark-text mb-4"
          >
            PROFESSIONAL <br />
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
                </div>

                <p className="text-dark-text/70 leading-relaxed max-w-2xl relative z-10">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ MOBILE ═══ */}
      <div className="w-full mx-auto px-[20px] py-[30px] relative z-10 md:hidden">
        <div className="mb-[40px] text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-[30px] leading-[1.2] text-dark-text mb-[16px]"
          >
            PROFESSIONAL <br />
            <span className="text-warm-brown">JOURNEY</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-[2px] bg-gold-accent mx-auto"
          />
        </div>

        <div className="relative border-l-2 border-dark-text/20 ml-[10px] pl-[20px] space-y-[20px]">
          {experiences.map((exp, index) => (
            <motion.div
              key={`mob-exp-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative w-full"
            >
              {/* Timeline Node */}
              <div className="absolute -left-[29px] top-4 w-4 h-4 rounded-full bg-cream border-2 border-warm-brown shadow-sm" />

              <div className="glass p-[16px] rounded-[16px] border-white/50 w-full relative overflow-hidden shadow-sm">
                <h3 className="font-heading text-[20px] text-dark-text leading-tight mb-[4px]">{exp.role}</h3>
                <h4 className="text-warm-brown font-medium tracking-wide text-[14px] mb-[12px]">{exp.company}</h4>
                <p className="text-dark-text/70 text-[14px] leading-relaxed relative z-10">
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

import React from 'react';
import { motion } from 'framer-motion';

const education = [
  {
    degree: 'B.Tech Computer Science',
    institution: 'JIS College of Engineering, Kalyani, Nadia',
    period: '2023 - 2027',
    detail: 'GPA: 8.7',
  },
  {
    degree: 'Higher Secondary (XII)',
    institution: 'RBM Govt. Girls\' School, Jhargram',
    period: '2021 - 2023',
  }
];

const Education = () => {
  return (
    <section id="education" className="py-32 relative bg-dark-text z-10 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-warm-brown/10 rounded-full blur-[100px]" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl text-cream mb-4"
          >
            ACADEMIC <br/>
            <span className="text-gold-accent">BACKGROUND</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-[2px] bg-warm-brown mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative group hover-target perspective-[1000px]"
            >
              <div className="glass p-8 md:p-10 rounded-3xl bg-white/5 border-white/10 group-hover:border-gold-accent/40 transition-colors h-full flex flex-col items-center justify-center relative overflow-hidden group-hover:-translate-y-4 group-hover:rotate-x-6 duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-gold-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <span className="px-4 py-1.5 bg-warm-brown/20 rounded-full text-xs font-medium tracking-widest text-warm-brown uppercase mb-6 inline-block">
                    {edu.period}
                  </span>
                  <h3 className="font-heading text-3xl text-cream mb-3">{edu.degree}</h3>
                  <h4 className="text-cream/60 font-medium tracking-wide uppercase text-sm">{edu.institution}</h4>
                  {edu.detail && (
                    <p className="text-gold-accent font-medium tracking-wide text-sm mt-3">{edu.detail}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

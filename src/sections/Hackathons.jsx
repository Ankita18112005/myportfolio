import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';

const CARDS_DATA = [
  {
    id: 1,
    pdfUrl: '/hackathons/hack4bengal.pdf',
    title: 'Hack4Bengal 4.0',
    organizer: 'Code Surgeons',
    year: '2025'
  },
  {
    id: 2,
    pdfUrl: '/hackathons/status_code_2.pdf',
    title: 'Status Code 2',
    organizer: 'Vultr',
    year: '2024'
  }
];

const Hackathons = () => {
  return (
    <section id="hackathons" className="pt-16 pb-12 md:py-20 relative bg-[#F8F5EF] z-20 overflow-hidden border-t border-[#A97142]/10">
      
      {/* Decorative Background Elements */}
      <div className="noise-bg opacity-[0.04] pointer-events-none absolute inset-0 z-0 mix-blend-multiply"></div>
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#A97142]/[0.03] rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        
        {/* Left Side: Header & Text */}
        <div className="w-full lg:w-[45%] flex flex-col items-start text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-inter text-[10px] md:text-[12px] font-bold tracking-[0.35em] text-[#A97142] uppercase mb-3"
          >
            COMPETITIONS & EVENTS
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="font-playfair text-[32px] md:text-5xl lg:text-5xl text-[#332828] font-bold mb-4 leading-tight drop-shadow-sm tracking-tight"
          >
            Hackathons
          </motion.h2>
          
          <motion.div 
             initial={{ opacity: 0, width: 0 }}
             whileInView={{ opacity: 1, width: 40 }}
             viewport={{ once: true, delay: 0.2 }}
             className="h-[2px] bg-[#A97142]/80 mb-5 relative"
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#A97142] translate-x-1/2"></div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.3 }}
            className="font-inter text-[15px] md:text-base text-[#332828]/70 leading-relaxed font-medium"
          >
            Participating in hackathons is my way of pushing boundaries, building innovative solutions under pressure, and collaborating with brilliant minds.
          </motion.p>
        </div>

        {/* Right Side: Two Overlapping Cards */}
        <div className="w-full lg:w-[55%] flex items-center justify-center relative h-[220px] md:h-[280px] lg:h-[300px] mt-2 lg:mt-0">
          
          {/* Card 1 */}
          <motion.a 
            href={CARDS_DATA[0].pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -30, y: 20, rotate: -6 }}
            whileInView={{ opacity: 1, x: -20, y: 10, rotate: -6 }}
            viewport={{ once: true, delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.05, rotate: -3, zIndex: 30 }}
            transition={{ duration: 0.4 }}
            className="absolute w-[240px] md:w-[280px] p-6 bg-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-[#A97142]/10 flex flex-col group z-10 lg:-translate-x-12"
          >
            <div className="w-10 h-10 rounded-full bg-[#F8F5EF] flex items-center justify-center text-[#A97142] mb-4 group-hover:scale-110 transition-transform">
              <Trophy size={18} />
            </div>
            <h4 className="font-playfair text-xl font-bold text-[#332828] leading-tight mb-2">{CARDS_DATA[0].title}</h4>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-inter text-xs text-[#A97142] font-semibold tracking-wider uppercase">{CARDS_DATA[0].organizer} • {CARDS_DATA[0].year}</span>
              <ExternalLink size={14} className="text-[#332828]/30 group-hover:text-[#A97142] transition-colors" />
            </div>
          </motion.a>

          {/* Card 2 */}
          <motion.a 
            href={CARDS_DATA[1].pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 30, y: -10, rotate: 4 }}
            whileInView={{ opacity: 1, x: 20, y: -15, rotate: 4 }}
            viewport={{ once: true, delay: 0.3 }}
            whileHover={{ y: -30, scale: 1.05, rotate: 2, zIndex: 30 }}
            transition={{ duration: 0.4 }}
            className="absolute w-[240px] md:w-[280px] p-6 bg-gradient-to-br from-[#2C2222] to-[#3A2D2D] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-white/5 flex flex-col group z-20 lg:translate-x-12"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#E8D8C4] mb-4 group-hover:scale-110 transition-transform">
              <Trophy size={18} />
            </div>
            <h4 className="font-playfair text-xl font-bold text-white leading-tight mb-2">{CARDS_DATA[1].title}</h4>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-inter text-xs text-[#E8D8C4]/70 font-semibold tracking-wider uppercase">{CARDS_DATA[1].organizer} • {CARDS_DATA[1].year}</span>
              <ExternalLink size={14} className="text-[#E8D8C4]/40 group-hover:text-[#E8D8C4] transition-colors" />
            </div>
          </motion.a>

        </div>
        
      </div>
      
    </section>
  );
};

export default Hackathons;

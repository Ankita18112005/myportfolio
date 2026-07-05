import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, ExternalLink, Briefcase, Code2, GraduationCap } from 'lucide-react';
import { RevealCharacters, FadeUpWords } from '../components/AnimatedText';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full lg:min-h-screen bg-cream overflow-hidden flex items-start lg:items-center z-10 pt-[40px] pb-[80px] lg:py-0"
    >
      {/* Huge vertical ABOUT background */}
      <div className="bg-about-vertical font-playfair hidden lg:block">ABOUT</div>

      {/* Decorative center divider */}
      <div className="divider-line hidden lg:block"></div>

      {/* Tiny geometric elements to match reference */}
      <div className="absolute top-[35%] left-[48%] w-2 h-2 border border-dark-red/40 rounded-full hidden lg:block -translate-x-1/2"></div>
      <div className="absolute top-[40%] left-[48%] text-dark-red/40 text-[10px] hidden lg:block -translate-x-1/2">+</div>
      <div className="absolute top-[60%] left-[48%] w-3 h-3 border border-dark-red/40 rounded-full hidden lg:block -translate-x-1/2"></div>

      <div className="max-w-[1200px] w-full mx-auto px-[20px] md:px-12 lg:pl-32 relative z-10 flex flex-col lg:flex-row h-full">

        {/* LEFT SECTION (48% Width to make image larger) */}
        <motion.div
          className="w-full lg:w-[48%] relative flex items-start mt-0 lg:mt-16 justify-center lg:justify-end lg:pr-8"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Photo container aligned with name */}
          <div className="portrait-container">
            <img
              src="/portfolio photo.jpeg"
              alt="Ankita Karan"
              className="portrait-img"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* RIGHT SECTION (52% Width) */}
        <motion.div
          className="w-full lg:w-[52%] flex flex-col items-center lg:items-start justify-start lg:pt-16 relative z-20 mt-4 lg:mt-0"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* Top: Hello & Name */}
          <motion.div variants={fadeUp} className="mb-4 lg:mb-6 text-center lg:text-left">
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-dark-red mb-2 font-bold">
              HELLO, I'M
            </p>
            <h2 className="font-playfair text-[56px] md:text-6xl lg:text-[5.5rem] text-dark-red font-bold leading-[0.9] tracking-tighter">
              <RevealCharacters text="ANKITA" />
              <br className="hidden lg:block" />
              <RevealCharacters text="KARAN" delay={0.2} />
            </h2>
          </motion.div>

          {/* Titles */}
          <motion.div variants={fadeUp} className="flex flex-col gap-1 mb-5 lg:mb-8 text-center lg:text-left">
            <h3 className="font-playfair text-xl md:text-2xl text-dark-red font-bold uppercase tracking-wide">
              WEB DEVELOPER
            </h3>
            <h3 className="font-playfair text-lg md:text-xl text-dark-brown/60 italic">
              (UI/UX DESIGNER)
            </h3>
            <h3 className="font-playfair text-lg md:text-xl text-dark-brown/60 italic uppercase tracking-wide">
              ASPIRING FULL STACK DEVELOPER
            </h3>
          </motion.div>

          {/* Paragraph */}
          <motion.div variants={fadeUp} className="mb-[48px] max-w-[90%] md:max-w-[500px] mx-auto lg:mx-0 text-center lg:text-left">
            <p className="font-inter text-sm text-dark-brown/80 leading-[2] md:leading-[1.8]">
              I'm Ankita Karan, a Computer Science Engineering student passionate about designing beautiful digital experiences. I specialize in creating modern user interfaces using React, Next.js, Tailwind CSS and Figma. Currently I'm expanding my skills into backend development while building real-world full stack applications. I love combining creativity with technology to craft products that are fast, elegant and user-friendly.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row w-full justify-center lg:justify-start gap-4 mb-[48px] lg:mb-10">
            <a href="/Ankita_Karan_Resume.pdf" target="_blank" rel="noreferrer" className="btn-filled w-full sm:w-auto justify-center text-center">
              <Download size={16} className="inline mr-2" />
              DOWNLOAD RESUME
            </a>
          </motion.div>

        </motion.div>
      </div>


    </section>
  );
};

export default About;

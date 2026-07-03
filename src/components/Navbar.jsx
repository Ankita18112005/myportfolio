import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, GraduationCap, Code2, Briefcase, FolderGit2, Award, Mail, ChevronRight } from 'lucide-react';
import { FaLinkedin, FaGithub, FaFileAlt } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Projects', href: '#projects', icon: FolderGit2 },
  { name: 'Certs', href: '#certifications', icon: Award },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`font-heading text-3xl md:text-4xl font-bold tracking-wider z-50 relative transition-colors duration-300 ${mobileMenuOpen ? 'text-cream md:text-dark-text' : 'text-dark-text'}`}
          >
            A<span className="text-[var(--color-warm-brown)]">K</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`hidden md:flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-500 ${isScrolled ? 'glass' : 'bg-transparent'
              }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm uppercase tracking-widest font-medium transition-colors hover-target relative group ${activeSection === link.href.replace('#', '') ? 'text-[var(--color-warm-brown)]' : 'text-dark-text hover:text-[var(--color-gold-accent)]'
                  }`}
              >
                {link.name}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[var(--color-warm-brown)]"
                  />
                )}
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[var(--color-gold-accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </motion.nav>

          {/* Let's connect button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block"
          >
            <a href="#contact" className="px-6 py-3 rounded-full border border-[var(--color-warm-brown)] text-[var(--color-warm-brown)] hover:bg-[var(--color-warm-brown)] hover:text-white transition-all duration-300 font-medium tracking-wide uppercase text-sm hover-target">
              Let's Talk
            </a>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-[60]">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${mobileMenuOpen ? 'text-cream' : 'text-dark-text'} p-2 focus:outline-none transition-colors duration-300`}
            >
              {mobileMenuOpen ? '' : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-[12px] z-50 md:hidden"
            />
            
            {/* Glassmorphism Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-fit max-h-[100dvh] w-[85%] max-w-[340px] bg-[rgba(28,25,23,0.92)] backdrop-blur-xl z-[60] md:hidden rounded-l-[32px] shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <motion.button
                   whileHover={{ rotate: 90 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={() => setMobileMenuOpen(false)}
                   className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-cream/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                   <X size={20} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col gap-2 custom-scrollbar">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.04) }}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex items-center justify-between p-4 rounded-[20px] transition-all duration-300 ${isActive ? 'bg-white/10 text-white' : 'text-cream/70 hover:bg-white/5 hover:text-cream'}`}
                    >
                      <div className="flex items-center gap-5">
                        <link.icon size={22} className={isActive ? 'text-[var(--color-warm-brown)]' : 'text-cream/40 group-hover:text-[var(--color-warm-brown)] transition-colors'} />
                        <span className="font-heading text-[24px] tracking-wider font-medium">{link.name}</span>
                      </div>
                      <ChevronRight size={20} className={`transition-transform duration-300 ${isActive ? 'translate-x-1 text-[var(--color-warm-brown)]' : 'text-cream/20 group-hover:translate-x-1 group-hover:text-[var(--color-warm-brown)]'}`} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

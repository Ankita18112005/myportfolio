import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const CARDS_DATA = [
  {
    id: 1,
    pdfUrl: '/hackathons/hack4bengal.pdf',
    title: 'Code Surgeons',
    organizer: 'Hack4Bengal 4.0',
    year: '2025'
  },
  {
    id: 2,
    pdfUrl: '/hackathons/status_code_2.pdf',
    title: 'Status Code 2',
    organizer: 'Vultr',
    year: '2024'
  },
  // Duplicate first one to ensure we have exactly 3 for the layout
  {
    id: 3,
    pdfUrl: '/hackathons/hack4bengal.pdf',
    title: 'Code Surgeons',
    organizer: 'Hack4Bengal 4.0',
    year: '2025'
  }
];

// Layout definitions for the 3 slots (Left, Center, Right)
const desktopLayout = [
  { x: -140, y: 15, rotate: -8, scale: 0.9, zIndex: 10 },
  { x: 0,    y: 0,  rotate: 0,  scale: 1.05, zIndex: 30 },
  { x: 140,  y: 15, rotate: 8,  scale: 0.9, zIndex: 20 },
];

const tabletLayout = [
  { x: -90, y: 10, rotate: -8, scale: 0.85, zIndex: 10 },
  { x: 0,   y: 0,  rotate: 0,  scale: 1, zIndex: 30 },
  { x: 90,  y: 10, rotate: 8,  scale: 0.85, zIndex: 20 },
];

const HackathonCarousel = ({ onOpenModal }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [cards, setCards] = useState(CARDS_DATA);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cycle the cards array (move last item to front or vice versa)
  const shiftCards = (direction) => {
    setCards((prev) => {
      const newCards = [...prev];
      if (direction === 'right') {
        const last = newCards.pop();
        newCards.unshift(last);
      } else {
        const first = newCards.shift();
        newCards.push(first);
      }
      return newCards;
    });
  };

  const handleMobileNav = (direction) => {
    if (direction === 'right') {
      setMobileIndex((prev) => (prev + 1) % cards.length);
    } else {
      setMobileIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
  };

  const currentLayout = isTablet ? tabletLayout : desktopLayout;

  if (isMobile) {
    const activeCard = cards[mobileIndex];
    return (
      <div className="relative w-full flex flex-col items-center mt-4 h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-[85vw] max-w-[320px] aspect-[4/3] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] overflow-hidden border-4 border-white flex flex-col cursor-pointer group"
            onClick={() => onOpenModal(activeCard)}
          >
            {/* Thumbnail */}
            <div className="flex-1 w-full relative bg-[#F8F5EF] overflow-hidden pointer-events-none">
              <iframe
                src={`${activeCard.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-none object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
            
            {/* Info Footer */}
            <div className="px-5 py-4 bg-white flex flex-col">
              <h4 className="font-playfair text-lg font-bold text-[#332828] leading-tight">{activeCard.title}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="font-inter text-xs text-[#A97142] font-semibold tracking-wide uppercase">{activeCard.organizer} • {activeCard.year}</span>
                <ExternalLink size={14} className="text-[#332828]/40 group-hover:text-[#A97142] transition-colors" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-6 mt-8">
          <button 
            onClick={() => handleMobileNav('left')}
            className="w-12 h-12 rounded-full border border-[#A97142]/30 flex items-center justify-center text-[#A97142] bg-white shadow-sm hover:bg-[#A97142] hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {cards.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === mobileIndex ? 'bg-[#A97142] w-4' : 'bg-[#A97142]/30'}`} />
            ))}
          </div>
          <button 
            onClick={() => handleMobileNav('right')}
            className="w-12 h-12 rounded-full border border-[#A97142]/30 flex items-center justify-center text-[#A97142] bg-white shadow-sm hover:bg-[#A97142] hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center mt-10 perspective-[1200px]">
      {cards.map((card, index) => {
        const layout = currentLayout[index];
        const isCenter = index === 1;

        return (
          <motion.div
            key={card.id}
            layout // Enable layout animations when reordering
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: layout.y, scale: layout.scale }}
            viewport={{ once: true }}
            animate={{ 
              x: layout.x, 
              y: layout.y, 
              rotate: layout.rotate, 
              scale: layout.scale,
              zIndex: layout.zIndex,
              boxShadow: isCenter ? '0 30px 60px rgba(0,0,0,0.15)' : '0 15px 35px rgba(0,0,0,0.08)'
            }}
            whileHover={{ 
              y: layout.y - 15, 
              scale: layout.scale * 1.04, 
              rotate: layout.rotate * 0.5, 
              boxShadow: '0 40px 80px rgba(0,0,0,0.2)' 
            }}
            transition={{ type: "spring", stiffness: 260, damping: 25, mass: 1 }}
            className={`absolute w-[340px] md:w-[420px] aspect-[4/3] bg-white rounded-2xl md:rounded-3xl border-8 border-white flex flex-col cursor-pointer group overflow-hidden`}
            onClick={() => {
              if (isCenter) {
                onOpenModal(card);
              } else {
                // If clicking side card, shift it to center
                shiftCards(index === 0 ? 'right' : 'left');
              }
            }}
          >
            {/* Thumbnail */}
            <div className="flex-1 w-full relative bg-[#F8F5EF] overflow-hidden pointer-events-none">
              <iframe
                src={`${card.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-none object-cover pointer-events-none"
              />
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/20 pointer-events-none"></div>
            </div>
            
            {/* Info Footer */}
            <div className="px-6 py-5 bg-white flex flex-col">
              <h4 className="font-playfair text-xl md:text-2xl font-bold text-[#332828] leading-tight">{card.title}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="font-inter text-xs md:text-sm text-[#A97142] font-semibold tracking-widest uppercase">{card.organizer} • {card.year}</span>
                <span className="font-inter text-[10px] font-bold uppercase tracking-widest text-[#332828]/30 group-hover:text-[#A97142] transition-colors flex items-center">
                  View <ExternalLink size={12} className="ml-1" />
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HackathonCarousel;

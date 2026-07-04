import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CertificateModal = ({ isOpen, onClose, certificate }) => {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && certificate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          
          {/* Blurred Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[80vh] md:h-[85vh] bg-[#F8F5EF] rounded-2xl md:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
          >
            {/* Header / Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#2C2222] text-cream z-10 border-b border-white/10 shrink-0">
              <div className="flex flex-col">
                <h3 className="font-playfair text-xl md:text-2xl font-bold tracking-wide">{certificate.title}</h3>
                <p className="font-inter text-xs md:text-sm text-cream/70 uppercase tracking-widest mt-1">
                  {certificate.organizer} • {certificate.year}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all text-white/90"
              >
                <X size={20} />
              </button>
            </div>

            {/* Document Viewer */}
            <div className="flex-1 w-full relative bg-black/5">
              {certificate.pdfUrl.endsWith('.pdf') ? (
                <iframe
                  src={`${certificate.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title={certificate.title}
                  className="absolute inset-0 w-full h-full border-none"
                />
              ) : (
                <img
                  src={certificate.pdfUrl}
                  alt={certificate.title}
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;

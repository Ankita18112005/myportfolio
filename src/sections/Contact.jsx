import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-32 relative bg-cream z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-warm-brown/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl text-dark-text mb-4"
          >
            LET'S <span className="text-warm-brown">CONNECT</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-[2px] bg-gold-accent mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-heading text-4xl text-dark-text mb-6">Get in touch</h3>
            <p className="text-lg text-dark-text/70 mb-12 max-w-md font-light">
              I'm always open to discussing internship opportunities, UI/UX design projects, or frontend development collaborations. Let's create something amazing together.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group hover-target">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-warm-brown shadow-lg group-hover:bg-warm-brown group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-dark-text/50 font-medium mb-1">Email</p>
                  <p className="text-lg text-dark-text font-medium">ankitakaranj@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group hover-target">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-warm-brown shadow-lg group-hover:bg-warm-brown group-hover:text-white transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-dark-text/50 font-medium mb-1">Phone</p>
                  <p className="text-lg text-dark-text font-medium">+91 8250930522</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group hover-target">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-warm-brown shadow-lg group-hover:bg-warm-brown group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-dark-text/50 font-medium mb-1">Location</p>
                  <p className="text-lg text-dark-text font-medium">Jhargram, West Bengal</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-12">
              <a href="https://www.linkedin.com/in/ankita-karan-440b65347" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-dark-text text-cream flex items-center justify-center hover:bg-warm-brown transition-colors hover-target">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com/Ankita18112005" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border-2 border-dark-text text-dark-text flex items-center justify-center hover:bg-dark-text hover:text-cream transition-colors hover-target">
                <FaGithub size={20} />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[40px] flex flex-col gap-8">
              <div className="relative z-0 group">
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="block py-4 px-0 w-full text-lg text-dark-text bg-transparent border-0 border-b-2 border-dark-text/20 appearance-none focus:outline-none focus:ring-0 focus:border-warm-brown peer" placeholder=" " 
                />
                <label className="peer-focus:font-medium absolute text-lg text-dark-text/50 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-warm-brown peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                  Your Name
                </label>
              </div>

              <div className="relative z-0 group">
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="block py-4 px-0 w-full text-lg text-dark-text bg-transparent border-0 border-b-2 border-dark-text/20 appearance-none focus:outline-none focus:ring-0 focus:border-warm-brown peer" placeholder=" " 
                />
                <label className="peer-focus:font-medium absolute text-lg text-dark-text/50 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-warm-brown peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                  Email Address
                </label>
              </div>

              <div className="relative z-0 group">
                <textarea 
                  name="message" 
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  className="block py-4 px-0 w-full text-lg text-dark-text bg-transparent border-0 border-b-2 border-dark-text/20 appearance-none focus:outline-none focus:ring-0 focus:border-warm-brown peer resize-none custom-scrollbar" placeholder=" " 
                />
                <label className="peer-focus:font-medium absolute text-lg text-dark-text/50 duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-warm-brown peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                  Message
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-dark-text text-cream rounded-full font-medium tracking-widest uppercase text-sm hover:bg-warm-brown transition-colors hover-target mt-4"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const butterflyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !butterflyRef.current) return;
    
    // Floating animation for the butterfly decorations
    gsap.to(butterflyRef.current.children, {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotate: "random(-15, 15)",
      duration: "random(2, 5)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
    });
    
    // Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!butterflyRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) * 0.01;
      const moveY = (clientY - innerHeight / 2) * 0.01;
      
      Array.from(butterflyRef.current.children).forEach((butterfly, i) => {
        const depth = 1 + (i * 0.2);
        gsap.to(butterfly, {
          x: moveX * depth,
          y: moveY * depth,
          duration: 1,
          ease: "power1.out",
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const inputVariants = {
    initial: { 
      y: 20, 
      opacity: 0 
    },
    animate: (custom: number) => ({ 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1 * custom,
      }
    }),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animation for form submission
    if (formRef.current) {
      gsap.to(formRef.current, {
        y: -10,
        duration: 0.2,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      });
      
      // Reset form fields after animation
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.reset();
        }
      }, 500);
    }
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-bg z-0" />
      
      {/* Floating decorative elements */}
      <div 
        ref={butterflyRef} 
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute top-[10%] left-[15%] w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm border border-white/30" />
        <div className="absolute top-[20%] right-[20%] w-12 h-12 bg-purple/20 rounded-full backdrop-blur-sm border border-purple/30" />
        <div className="absolute bottom-[30%] left-[25%] w-10 h-10 bg-pink/20 rounded-full backdrop-blur-sm border border-pink/30" />
        <div className="absolute bottom-[15%] right-[25%] w-16 h-16 bg-blue/20 rounded-full backdrop-blur-sm border border-blue/30" />
        <div className="absolute top-[40%] left-[40%] w-6 h-6 bg-white/10 rounded-full backdrop-blur-sm border border-white/30" />
        <div className="absolute bottom-[50%] right-[10%] w-20 h-20 bg-purple/10 rounded-full backdrop-blur-sm border border-purple/20" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Get in Touch
            </motion.h2>
            
            <motion.div 
              className="h-1 bg-gradient-to-r from-purple to-pink w-0 max-w-xs mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "100%", transition: { duration: 1, delay: 0.4 } }}
              viewport={{ once: true, margin: "-100px" }}
            />
            
            <motion.p 
              className="mt-6 text-lg text-white/80 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Have a project in mind? Let's create something amazing together.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.8 } }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Contact Info */}
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-purple/20 p-3 rounded-full text-purple">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Phone</h4>
                    <p className="text-white/70">+91 93521 88532</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-pink/20 p-3 rounded-full text-pink">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email</h4>
                    <p className="text-white/70">ztrend.dakshkumawat@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-blue/20 p-3 rounded-full text-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Location</h4>
                    <p className="text-white/70">123 Design Street, Creativity City</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-white font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {['twitter', 'instagram', 'facebook', 'dribbble'].map((social, i) => (
                    <motion.a 
                      key={social}
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20"
                      whileHover={{ 
                        scale: 1.2, 
                        backgroundColor: social === 'twitter' ? 'rgb(29, 161, 242, 0.2)' :
                                       social === 'instagram' ? 'rgb(225, 48, 108, 0.2)' :
                                       social === 'facebook' ? 'rgb(59, 89, 152, 0.2)' : 'rgb(234, 76, 137, 0.2)',
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        transition: { delay: 0.5 + (i * 0.1) } 
                      }}
                    >
                      <span className="sr-only">{social}</span>
                      {/* Icon placeholder */}
                      <div className="w-5 h-5 rounded-full bg-white/50" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={1}
                >
                  <label className="block text-white/80 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/50"
                    required
                  />
                </motion.div>
                
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={2}
                >
                  <label className="block text-white/80 mb-2">Your Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/50"
                    required
                  />
                </motion.div>
                
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={3}
                >
                  <label className="block text-white/80 mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/50"
                  />
                </motion.div>
                
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={4}
                >
                  <label className="block text-white/80 mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/50"
                    required
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  className="px-8 py-4 bg-purple hover:bg-purple-dark text-white rounded-full elastic-btn gradient-border w-full"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  variants={inputVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={5}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

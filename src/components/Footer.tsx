
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!footerRef.current || !waveRef.current) return;
    
    // Animate wave effect
    gsap.to(waveRef.current, {
      backgroundPositionX: '100%',
      duration: 15,
      ease: 'linear',
      repeat: -1,
    });
    
    // Floating animation for the dots
    const dots = footerRef.current.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      gsap.to(dot, {
        y: `${Math.sin(i) * 15}px`,
        duration: 2 + (i * 0.2),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1,
      });
    });
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-blue-dark pt-20 pb-10 overflow-hidden">
      {/* Animated wave */}
      <div 
        ref={waveRef}
        className="absolute top-0 left-0 right-0 h-20 z-10"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z\' fill=\'%230f172a\'%3E%3C/path%3E%3C/svg%3E")',
          backgroundSize: '1200px 100%',
          transform: 'rotate(180deg)',
        }}
      />
      
      {/* Floating dots decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="dot absolute top-[20%] left-[10%] w-4 h-4 rounded-full bg-purple/40" />
        <div className="dot absolute top-[35%] right-[15%] w-3 h-3 rounded-full bg-pink/40" />
        <div className="dot absolute bottom-[30%] left-[20%] w-5 h-5 rounded-full bg-blue/40" />
        <div className="dot absolute bottom-[25%] right-[25%] w-4 h-4 rounded-full bg-purple/40" />
        <div className="dot absolute top-[40%] left-[30%] w-2 h-2 rounded-full bg-pink/40" />
        <div className="dot absolute bottom-[45%] right-[40%] w-3 h-3 rounded-full bg-purple/40" />
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <motion.a 
              href="#" 
              className="text-2xl font-bold gradient-text inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Ztrend
            </motion.a>
            <p className="text-white/70 mb-6">
              Creating beautiful digital experiences with cutting-edge design and animation.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'instagram', 'facebook', 'dribbble'].map((social, i) => (
                <motion.a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 border border-white/10"
                  whileHover={{ 
                    scale: 1.2, 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">{social}</span>
                  {/* Icon placeholder */}
                  <div className="w-5 h-5 rounded-full bg-white/50" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Navigation</h3>
            <ul className="space-y-3">
              {['Home', 'Features', 'Showcase', 'Contact'].map((item) => (
                <motion.li key={item}>
                  <motion.a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-white/70 hover:text-white fancy-link"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {['Web Design', 'UI/UX Design', 'Branding', 'Development'].map((item) => (
                <motion.li key={item}>
                  <motion.a 
                    href="#" 
                    className="text-white/70 hover:text-white fancy-link"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-white/70">
                <div className="w-5 h-5 mr-3 rounded-full bg-white/20 flex-shrink-0" />
                <span>123 Design Street, Creativity City</span>
              </li>
              <li className="flex items-center text-white/70">
                <div className="w-5 h-5 mr-3 rounded-full bg-white/20 flex-shrink-0" />
                <span>hello@aesthetic.com</span>
              </li>
              <li className="flex items-center text-white/70">
                <div className="w-5 h-5 mr-3 rounded-full bg-white/20 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Aesthetic. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.a 
              href="#" 
              className="text-white/60 text-sm hover:text-white"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/60 text-sm hover:text-white"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/60 text-sm hover:text-white"
              whileHover={{ y: -2 }}
            >
              Cookies
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

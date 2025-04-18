
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const ScrollIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!indicatorRef.current) return;
    
    // Animation for the mouse wheel
    gsap.to(indicatorRef.current.querySelector('.scroll-wheel'), {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
    
    // Fade out scroll indicator when scrolling
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        gsap.to(indicatorRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(indicatorRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      ref={indicatorRef}
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
    >
      <div className="flex flex-col items-center">
        <motion.p 
          className="text-white/70 text-sm mb-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll Down
        </motion.p>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
          <div className="scroll-wheel w-1.5 h-1.5 rounded-full bg-white mt-1"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;

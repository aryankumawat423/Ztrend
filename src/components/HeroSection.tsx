
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedBackground from './AnimatedBackground';
import TextAnimation from './TextAnimation';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Text animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Floating circles animation
    const circles = circlesRef.current?.querySelectorAll('.circle') || [];
    circles.forEach((circle, index) => {
      gsap.to(circle, {
        y: `${Math.sin(index) * 30}px`,
        x: `${Math.cos(index) * 30}px`,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!circlesRef.current) return;

      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

      circles.forEach((circle, index) => {
        const depth = 1 + (index * 0.1);
        gsap.to(circle, {
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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.1 * i,
        duration: 0.7,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    })
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden flex items-center justify-center gradient-bg">
      {/* Advanced animated background */}
      <AnimatedBackground color="purple" density="high" speed="slow" />
      
      {/* Animated background circles */}
      <div ref={circlesRef} className="absolute inset-0 z-0">
        <div className="circle absolute top-1/4 left-[20%] w-32 h-32 rounded-full bg-purple/10 glass-card" />
        <div className="circle absolute top-1/5 right-[25%] w-40 h-40 rounded-full bg-pink/10 glass-card" />
        <div className="circle absolute bottom-1/4 left-[15%] w-48 h-48 rounded-full bg-blue/10 glass-card" />
        <div className="circle absolute bottom-1/3 right-[10%] w-52 h-52 rounded-full bg-purple/10 glass-card" />
        <div className="circle absolute top-[10%] left-[40%] w-24 h-24 rounded-full bg-blue/10 glass-card" />
        <div className="circle absolute bottom-[15%] left-[45%] w-36 h-36 rounded-full bg-pink/10 glass-card" />
      </div>

      <div className="container mx-auto px-4 py-16 z-10 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <div ref={textRef}>
            <TextAnimation 
              text="Crafting Digital Experiences"
              variant="gradient"
              animation="staggered"
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              delay={0.2}
            />
          </div>

          <motion.p 
            className="text-lg md:text-xl lg:text-2xl mb-10 text-white/90 max-w-2xl mx-auto"
            custom={2}
            variants={fadeInUpVariants}
          >
            Bringing your ideas to life with stunning design, smooth animations, and cutting-edge technology.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeInUpVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button 
              className="px-8 py-4 bg-purple hover:bg-purple-dark text-white rounded-full elastic-btn gradient-border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button 
              className="px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 text-white rounded-full elastic-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

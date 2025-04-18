import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const showcaseItems = [
  {
    id: 1,
    title: "Digital Experience",
    description: "Creating immersive digital journeys that captivate audiences.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Web Design",
  },
  {
    id: 2,
    title: "Brand Identity",
    description: "Crafting memorable brand experiences that resonate with your audience.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Branding",
  },
  {
    id: 3,
    title: "Mobile Interfaces",
    description: "Designing intuitive and beautiful mobile experiences.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "UI/UX",
  },
  {
    id: 4,
    title: "Interactive Websites",
    description: "Building engaging websites with cutting-edge technologies.",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Development",
  },
];

const ShowcaseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const startAutoPlay = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 5000);
  };
  
  const stopAutoPlay = () => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  
  const handleNext = () => {
    stopAutoPlay();
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
    startAutoPlay();
  };
  
  const handlePrev = () => {
    stopAutoPlay();
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
    startAutoPlay();
  };
  
  const handleDotClick = (index: number) => {
    stopAutoPlay();
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    startAutoPlay();
  };
  
  useEffect(() => {
    startAutoPlay();
    
    return () => {
      stopAutoPlay();
    };
  }, []);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const section = sectionRef.current;
      if (!section) return;
      
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = scrollY + window.innerHeight;
      
      if (scrollPosition > sectionTop && scrollY < sectionTop + sectionHeight) {
        const parallaxElements = section.querySelectorAll('.parallax-item');
        parallaxElements.forEach((el, i) => {
          const speed = 1 - i * 0.2;
          const yPos = (scrollPosition - sectionTop) * speed * 0.15;
          gsap.to(el, {
            y: yPos,
            duration: 0.6,
            ease: "power1.out",
          });
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  return (
    <section 
      id="showcase" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-blue-dark"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="parallax-item absolute top-[10%] left-[20%] w-80 h-80 rounded-full bg-purple/30 blur-2xl" />
        <div className="parallax-item absolute bottom-[20%] right-[15%] w-96 h-96 rounded-full bg-pink/30 blur-2xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Our Showcase
          </motion.h2>
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-pink to-purple w-0 max-w-xs mx-auto"
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
            Explore our portfolio of stunning projects and creative solutions.
          </motion.p>
        </div>
        
        <div className="relative h-[600px] overflow-hidden glass-card rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-dark/90 z-10" />
          
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${showcaseItems[activeIndex].imageUrl})` }}
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
            <div className="max-w-2xl">
              <motion.span 
                className="inline-block px-3 py-1 rounded-full bg-purple/20 text-purple-light text-sm mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                key={`category-${activeIndex}`}
              >
                {showcaseItems[activeIndex].category}
              </motion.span>
              
              <motion.h3 
                className="text-2xl md:text-4xl font-bold text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                key={`title-${activeIndex}`}
              >
                {showcaseItems[activeIndex].title}
              </motion.h3>
              
              <motion.p 
                className="text-white/80 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                key={`desc-${activeIndex}`}
              >
                {showcaseItems[activeIndex].description}
              </motion.p>
              
              <motion.button
                className="px-6 py-3 bg-purple hover:bg-purple-dark text-white rounded-full elastic-btn gradient-border"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                key={`button-${activeIndex}`}
              >
                View Project
              </motion.button>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="absolute top-1/2 left-4 right-4 flex justify-between z-20 -translate-y-1/2">
            <motion.button
              className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20"
              onClick={handlePrev}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20"
              onClick={handleNext}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
          
          {/* Dot indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            {showcaseItems.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => handleDotClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.1 * index, duration: 0.5 } 
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;

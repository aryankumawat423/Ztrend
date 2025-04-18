
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const features = [
  {
    title: "Beautiful Design",
    description: "Create stunning interfaces with our cutting-edge design elements and aesthetic visuals.",
    icon: "✨",
    color: "purple",
  },
  {
    title: "Smooth Animations",
    description: "Engage users with buttery-smooth animations and transitions that bring your site to life.",
    icon: "🌊",
    color: "pink",
  },
  {
    title: "Responsive Layout",
    description: "Build layouts that adapt perfectly to any device, from desktop to mobile.",
    icon: "📱",
    color: "blue",
  },
  {
    title: "Performance Focused",
    description: "Optimized for speed with efficient code and optimized resources for lightning-fast experiences.",
    icon: "⚡",
    color: "purple",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!cardRef.current || !isInView) return;
    
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        delay: index * 0.15,
        ease: "power3.out" 
      }
    );
  }, [isInView, index]);
  
  return (
    <div 
      ref={cardRef} 
      className={`glass-card p-8 interactive-card opacity-0`}
    >
      <div className={`text-4xl mb-4 bg-${feature.color}/10 w-16 h-16 flex items-center justify-center rounded-full`}>
        {feature.icon}
      </div>
      <h3 className={`text-xl font-bold mb-3 text-${feature.color}`}>
        {feature.title}
      </h3>
      <p className="text-white/80">
        {feature.description}
      </p>
    </div>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Parallax scroll effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionPos = sectionRef.current?.offsetTop || 0;
      const distance = scrollPosition - sectionPos;
      
      if (distance > -500 && distance < 500) {
        const elements = sectionRef.current?.querySelectorAll('.parallax-element');
        elements?.forEach((el, i) => {
          const speed = 1 - i * 0.1;
          gsap.to(el, {
            y: distance * speed * 0.1,
            duration: 0.5,
            ease: "power1.out"
          });
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { 
        duration: 1.2,
        ease: "easeInOut",
        delay: 0.4
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 px-4 relative overflow-hidden bg-blue-dark/90"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="parallax-element absolute top-0 right-0 w-64 h-64 rounded-full bg-purple/30" />
        <div className="parallax-element absolute bottom-0 left-0 w-80 h-80 rounded-full bg-pink/30" />
        <div className="parallax-element absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-blue/30" />
      </div>
      
      <div className="container mx-auto z-10 relative">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={titleVariants}
          >
            Stunning Features
          </motion.h2>
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-purple to-pink w-0 max-w-xs mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={lineVariants}
          />
          
          <motion.p 
            className="mt-6 text-lg text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Our platform combines beautiful aesthetics with powerful functionality to create websites that stand out.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

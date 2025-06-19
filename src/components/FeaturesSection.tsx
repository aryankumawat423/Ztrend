import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import AnimatedBackground from './AnimatedBackground';

const features = [
  {
    title: "Brand Marketing",
    description: "We make brands unforgettable — from the first impression to every interaction.",
    icon: "✨",
    color: "purple",
  },
  {
    title: "Branding (Visual Identity and  Positioning)",
    description: "We don’t design logos, we build identities that speak before you do.",
    icon: "🌊",
    color: "pink",
  },
  {
    title: "Social Media Marketing",
    description: "We turn scrolls into stops, likes into leads, and content into conversions.",
    icon: "📱",
    color: "blue",
  },
  {
    title: "Performance Strategic Marketing",
    description: "We run campaigns that don’t just look good they sell harder and scale faster.",
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
  const circlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;

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
    const handleMouseMove = (e) => {
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

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
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
      className="relative min-h-screen overflow-hidden flex items-center justify-center gradient-bg py-24 px-4"
    >
      <AnimatedBackground color="purple" density="high" speed="slow" />
      
      <div ref={circlesRef} className="absolute inset-0 z-0">
        <div className="circle absolute top-1/4 left-[20%] w-32 h-32 rounded-full bg-purple/10 glass-card" />
        <div className="circle absolute top-1/5 right-[25%] w-40 h-40 rounded-full bg-pink/10 glass-card" />
        <div className="circle absolute bottom-1/4 left-[15%] w-48 h-48 rounded-full bg-blue/10 glass-card" />
        <div className="circle absolute bottom-1/3 right-[10%] w-52 h-52 rounded-full bg-purple/10 glass-card" />
        <div className="circle absolute top-[10%] left-[40%] w-24 h-24 rounded-full bg-blue/10 glass-card" />
        <div className="circle absolute bottom-[15%] left-[45%] w-36 h-36 rounded-full bg-pink/10 glass-card" />
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
            Here’s What We Do
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
            Our platform combines from branding to lead generation and mixes strategy with beautiful aesthetics to create websites that stand out.
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
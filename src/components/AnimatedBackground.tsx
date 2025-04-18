
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedBackgroundProps {
  color?: 'purple' | 'pink' | 'blue';
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
}

const AnimatedBackground = ({ 
  color = 'purple', 
  density = 'medium',
  speed = 'medium' 
}: AnimatedBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing dots
    containerRef.current.innerHTML = '';
    
    // Determine parameters based on props
    const colors = {
      purple: ['rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.1)'],
      pink: ['rgba(217, 70, 239, 0.2)', 'rgba(217, 70, 239, 0.1)'],
      blue: ['rgba(14, 165, 233, 0.2)', 'rgba(14, 165, 233, 0.1)'],
    };
    
    const densityValues = {
      low: 15,
      medium: 30,
      high: 50,
    };
    
    const speedValues = {
      slow: 30,
      medium: 20,
      fast: 10,
    };
    
    const selectedColors = colors[color];
    const dotsCount = densityValues[density];
    const animationSpeed = speedValues[speed];
    
    // Create dots
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('div');
      
      // Random properties
      const size = Math.random() * 100 + 50; // Size between 50-150px
      const colorIndex = Math.floor(Math.random() * selectedColors.length);
      const delay = Math.random() * 5;
      
      // Style the dot
      dot.className = 'absolute rounded-full blur-xl';
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor = selectedColors[colorIndex];
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      
      // Add dot to container
      containerRef.current.appendChild(dot);
      
      // Animate each dot
      gsap.to(dot, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        duration: animationSpeed + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay,
      });
      
      // Also animate size to create pulsating effect
      gsap.to(dot, {
        width: `${size * (0.8 + Math.random() * 0.5)}px`,
        height: `${size * (0.8 + Math.random() * 0.5)}px`,
        duration: 4 + Math.random() * 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay,
      });
    }
  }, [color, density, speed]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 z-0"
    />
  );
};

export default AnimatedBackground;

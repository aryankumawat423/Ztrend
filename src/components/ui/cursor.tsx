
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const isClickable = 
        hoveredElement?.tagName === 'BUTTON' || 
        hoveredElement?.tagName === 'A' || 
        hoveredElement?.closest('button') !== null || 
        hoveredElement?.closest('a') !== null ||
        window.getComputedStyle(hoveredElement || document.body).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mousemove', updateCursorType);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mousemove', updateCursorType);
    };
  }, [position.x, position.y]);
  
  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-purple/80 z-50 pointer-events-none mix-blend-difference"
        animate={{ 
          x: position.x - 10, 
          y: position.y - 10,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', mass: 0.1, stiffness: 800, damping: 30 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 z-40 pointer-events-none"
        animate={{ 
          x: position.x - 20, 
          y: position.y - 20,
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{ type: 'spring', mass: 0.6, stiffness: 200, damping: 20 }}
      />
    </>
  );
};

export default Cursor;

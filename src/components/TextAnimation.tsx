import { motion } from 'framer-motion';

interface TextAnimationProps {
  text: string;
  variant?: 'gradient' | 'regular' | 'outline';
  animation?: 'fadeIn' | 'staggered' | 'typewriter';
  className?: string;
  delay?: number;
}

const TextAnimation = ({
  text,
  variant = 'regular',
  animation = 'fadeIn',
  className = '',
  delay = 0,
}: TextAnimationProps) => {
  // Get the right CSS classes based on variant
  const variantClasses = {
    gradient: 'bg-gradient-to-r from-purple via-pink to-blue bg-clip-text text-transparent',
    regular: 'text-white',
    outline: 'text-transparent bg-clip-text border-white/30 border-2 p-2',
  };
  
  const classNames = `${variantClasses[variant]} ${className}`;
  
  if (animation === 'staggered') {
    return (
      <div className={classNames}>
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: delay + (index * 0.05),
              ease: [0.6, 0.05, 0.01, 0.9]
            }}
            className="inline-block hover:scale-110 transition-transform duration-200"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    );
  }
  
  if (animation === 'typewriter') {
    return (
      <div className={`${classNames} relative`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: 0.05 * text.length, 
            delay,
            ease: 'linear' 
          }}
          className="whitespace-nowrap overflow-hidden"
        >
          {text}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity,
            repeatDelay: 0.2,
            delay: delay + (0.05 * text.length) 
          }}
          className="absolute top-0 right-0 h-full w-[3px] bg-current"
        />
      </div>
    );
  }
  
  // Enhanced fadeIn animation
  return (
    <motion.div
      className={classNames}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.6, 0.05, 0.01, 0.9]
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {text}
    </motion.div>
  );
};

export default TextAnimation;

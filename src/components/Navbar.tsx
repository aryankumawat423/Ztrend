import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { title: 'Home', href: '#home' },
  { title: 'Features', href: '#features' },
  { title: 'Showcase', href: '#showcase' },
  { title: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9] 
      } 
    },
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      }
    },
    open: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    },
  };

  const menuItemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 },
  };

  return (
    <motion.nav 
     className={`fixed top-0 left-0 right-0 z-50 px-6 py-0 ${
        isScrolled ? 'glass-card' : 'bg-transparent'
      } transition-all duration-300`}
      initial="initial"
      animate="animate"
      variants={navbarVariants}
    >
<div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 h-full">
  {/* Logo */}
  <div className="flex justify-center items-center">
    <motion.a 
      href="#" 
      className="text-2xl font-bold gradient-text"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src="/Ztrendlogo 1.png" alt="Ztrend Logo" className="h-24 w-auto inline-block" />
    </motion.a>
  </div>

       {/* Nav Items and Buttons */}
  <div className="hidden md:flex items-center space-x-8">
    {navItems.map((item, i) => (
      <motion.a
        key={item.title}
        href={item.href}
        className="fancy-link text-white hover:text-purple-light transition-colors"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          transition: { delay: 0.1 * i, duration: 0.5 } 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {item.title}
      </motion.a>
    ))}

    <motion.button
      className="px-5 py-2 bg-purple hover:bg-purple-dark text-white elastic-btn gradient-border"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Get Started
    </motion.button>
  </div>

  {/* Hamburger Menu */}
  <motion.button
    className="md:hidden text-white flex flex-col space-y-1.5 p-2"
    onClick={toggleMobileMenu}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.span 
      className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
    />
    <motion.span 
      className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
    />
    <motion.span 
      className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
    />
  </motion.button>
</div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
  className={`fixed top-0 left-0 right-0 z-50 h-16 px-6 ${
    isScrolled ? 'glass-card backdrop-blur-md bg-black/20' : 'bg-transparent'
  } transition-all duration-300`}
  initial="initial"
  animate="animate"
  variants={navbarVariants}
>

            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  className="text-white hover:text-purple-light"
                  variants={menuItemVariants}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </motion.a>
              ))}
              <motion.button
                className="px-5 py-2 bg-purple hover:bg-purple-dark text-white elastic-btn gradient-border mt-4"
                variants={menuItemVariants}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

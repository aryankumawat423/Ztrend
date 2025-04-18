
import { useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    // Initialize scroll animations
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      // Fade in each section as it comes into view
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      
      // Parallax effect for background elements
      const parallaxElements = section.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element) => {
        gsap.fromTo(
          element,
          { y: 0 },
          {
            y: -80,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
      
      // Staggered animations for list items and grid items
      const listItems = section.querySelectorAll('.stagger-item');
      if (listItems.length) {
        gsap.fromTo(
          listItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'bottom 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
    
    // Create scrolling animations for different elements
    ScrollTrigger.batch('.fade-in-up', {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.5,
        });
      },
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;

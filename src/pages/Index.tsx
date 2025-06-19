import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/ui/cursor";
import SmoothScroll from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Custom cursor
    document.body.classList.add("custom-cursor");
    
    // Preloader animation
    const tl = gsap.timeline();
    tl.to(".preloader-text", {
      duration: 1.5,
      opacity: 1,
      y: 0,
      ease: "power4.out",
      stagger: 0.2,
    })
      .to(".preloader", {
        duration: 1,
        opacity: 0,
        display: "none",
        ease: "power2.inOut",
        delay: 0.5,
      })
      .from(
        ".fadeIn",
        {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.5"
      );
    
    return () => {
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      {/* Load Poppins font from Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap"
        rel="stylesheet"
      />
      <SmoothScroll>
        {/* Preloader */}
        <div className="preloader fixed inset-0 bg-blue-dark flex items-center justify-center z-50">
          <div className="text-center">
            <div className="flex items-center justify-center">
              {Array.from("Ztrend").map((letter, index) => (
                <motion.span
                  key={index}
                  className="preloader-text text-4xl md:text-6xl font-bold text-white opacity-0 inline-block mx-1 font-poppins"
                  initial={{ opacity: 0, y: 50 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        <Cursor />
        <Navbar />
        <main className="relative overflow-hidden">
          <div id="home">
            <HeroSection />
          </div>
          
          <div id="features">
            <FeaturesSection />
          </div>
          
          <div id="showcase">
            <ShowcaseSection />
          </div>
          
          <div id="contact">
            <ContactSection />
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </>
  );
};

export default Index; 
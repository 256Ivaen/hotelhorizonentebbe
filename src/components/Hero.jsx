import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const slides = [
    {
      image: assets.hero_img1,
      title: "Experience Luxury & Comfort",
      subtitle:
        "A world-class hotel offering elegance, personalized service, and an unforgettable stay in a serene setting.",
    },
    {
      image: assets.hero_img2,
      title: "Signature Dining Redefined",
      subtitle:
        "Savor gourmet cuisine crafted by top chefs, paired with an elegant ambiance for a truly exceptional dining experience.",
    },
    {
      image: assets.hero_img3,
      title: "Deluxe Room, Ultimate Relaxation",
      subtitle:
        "Unwind in a spacious, beautifully designed room with plush bedding, modern amenities, and breathtaking views.",
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleNavigation = (path) => {
    // In your actual code you would use navigate from react-router-dom
    console.log(`Navigating to: ${path}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images with Motion */}
      {slides.map((slide, index) => (
        <AnimatePresence key={index} initial={false} mode="wait">
          {currentIndex === index && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
              
              <motion.img
                src={slide.image}
                alt={`Hotel scene ${index + 1}`}
                className="w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "easeOut" }}
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-8 lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-white"
                >
                  {/* Brand Name */}
                  <motion.div 
                    className="overflow-hidden mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="inline-block text-xs tracking-widest font-light bg-[#b97a38]/20 backdrop-blur-sm px-4 py-2 border-l-2 border-[#b97a38]">
                      HOTEL HORIZON
                    </span>
                  </motion.div>
                  
                  {/* Main Title */}
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {slides[currentIndex].title.split(' ').map((word, i, arr) => (
                      <React.Fragment key={i}>
                        {i === arr.length - 1 ? (
                          <span className="text-[#b97a38] font-medium">{word}</span>
                        ) : (
                          <span>{word} </span>
                        )}
                      </React.Fragment>
                    ))}
                  </motion.h1>
                  
                  {/* Decorative Line */}
                  <motion.div 
                    className="w-24 h-0.5 bg-white/30 mb-6 relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    <motion.div 
                      className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                    />
                  </motion.div>
                  
                  {/* Subtitle */}
                  <motion.p 
                    className="text-xs md:text-sm font-light text-white/90 mb-8 max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    {slides[currentIndex].subtitle}
                  </motion.p>
                  
                  {/* CTA Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleNavigation("/rooms")}
                      className="px-8 py-4 bg-[#b97a38] text-white hover:bg-[#b97a38]/90 transition-all shadow-lg shadow-[#b97a38]/20 font-medium tracking-wide text-xs"
                    >
                      EXPLORE ROOMS
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleNavigation("/dining")}
                      className="px-8 py-4 border border-white/50 backdrop-blur-sm bg-white/10 text-white hover:bg-white/20 transition-all font-medium tracking-wide text-xs"
                    >
                      DINING EXPERIENCE
                    </motion.button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-12 md:bottom-16 left-0 right-0 z-20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex justify-start items-center gap-3">
            {slides.map((_, index) => (
              <motion.button
                key={`nav-${index}`}
                onClick={() => setCurrentIndex(index)}
                className={`group relative h-2 transition-all duration-300 flex items-center ${
                  currentIndex === index ? "w-16" : "w-10"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span 
                  className={`h-0.5 w-full transition-all duration-300 ${
                    currentIndex === index ? "bg-[#b97a38]" : "bg-white/40"
                  }`} 
                />
                {currentIndex === index && (
                  <motion.span 
                    className="absolute -right-1 w-2 h-2 rounded-full bg-[#b97a38]"
                    layoutId="slideIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Side Navigation Counter */}
      <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col gap-6">
          {slides.map((_, index) => (
            <button
              key={`counter-${index}`}
              onClick={() => setCurrentIndex(index)}
              className="group flex items-center gap-3"
            >
              <span className={`text-xs font-light transition-all ${
                currentIndex === index 
                  ? "text-[#b97a38]" 
                  : "text-white/50 group-hover:text-white/80"
              }`}>
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className={`h-px transition-all ${
                currentIndex === index 
                  ? "w-12 bg-[#b97a38]" 
                  : "w-6 bg-white/50 group-hover:bg-white/80 group-hover:w-8"
              }`} />
            </button>
          ))}
        </div>
      </div>
      
      {/* Vertical Hotel Name */}
      <div className="hidden lg:flex flex-col items-center absolute left-8 top-1/2 -translate-y-1/2 z-20">
        {/* Line before text */}
        <div className="w-px h-8 bg-white/30"></div>
        
        {/* Vertical text */}
        <div className="flex flex-col items-center justify-center my-4 text-white/60 text-xs tracking-widest">
          <span>H</span>
          <span>O</span>
          <span>T</span>
          <span>E</span>
          <span>L</span>
          <div className="w-px h-4 bg-white/30 my-4"></div>
          <span>H</span>
          <span>O</span>
          <span>R</span>
          <span>I</span>
          <span>Z</span>
          <span>O</span>
          <span>N</span>
        </div>
        
        {/* Line after text */}
        <div className="w-px h-8 bg-white/30"></div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/70 text-xs tracking-wider mb-2">SCROLL</span>
        <motion.div 
          className="w-px h-8 bg-white/50"
          animate={{ 
            height: [8, 32, 8],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
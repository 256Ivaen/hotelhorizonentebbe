import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

// Title Component
const Title = ({ text, accent }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <h2 className="text-3xl md:text-4xl font-light text-gray-900">
        <span>{text}</span>{" "}
        <span className="text-[#b97a38] font-medium">{accent}</span>
      </h2>
      <div className="flex items-center gap-2 mt-3">
        <div className="h-px w-12 bg-[#b97a38]/20"></div>
        <div className="h-px w-20 bg-[#b97a38]"></div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto advance images
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev === 0 ? 1 : 0));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  // Image details
  const foodImages = [
    {
      src: assets.exploreDinner_1,
      description: "Cheesy, savory, crispy, flavorful, delicious.",
      title: "Artisan Pizza"
    },
    {
      src: assets.exploreDinner_2,
      description: "Juicy, tender, savory, rich, hearty.",
      title: "Premium Steak"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-lg"
          >
            <div className="mb-4">
              <motion.span 
                className="text-xs text-[#b97a38] tracking-widest font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                SIGNATURE RESTAURANT
              </motion.span>
            </div>
            
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Discover Our <span className="text-[#b97a38] font-medium">Signature Restaurant</span>
            </motion.h1>
            
            <motion.div
              className="w-16 h-1 bg-[#b97a38]/20 relative mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-y-0 left-0 w-8 bg-[#b97a38]"></div>
            </motion.div>
            
            <motion.p
              className="text-xs text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Indulge in a culinary journey at Hotel Horizon's award-winning restaurant, where our masterful chefs transform locally-sourced ingredients into exquisite dishes that captivate the senses. Experience elegant dining in a sophisticated atmosphere with impeccable service that elevates every moment.
            </motion.p>
            
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => handleNavigation("/dining")}
                className="px-8 py-3 border border-[#b97a38] text-[#b97a38] text-xs font-medium tracking-wider hover:bg-[#b97a38] hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                EXPLORE DINING
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </motion.div> */}
          </motion.div>
          
          {/* Images Section - Desktop */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {foodImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg h-80"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <div className="h-full">
                  <motion.img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-white text-lg font-medium mb-2">{image.title}</h3>
                    <p className="text-white/90 text-xs">{image.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Images Section - Mobile */}
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-lg h-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.img
                    src={foodImages[currentImageIndex].src}
                    alt={foodImages[currentImageIndex].title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 5 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-white text-lg font-medium mb-2">{foodImages[currentImageIndex].title}</h3>
                    <p className="text-white/90 text-xs">{foodImages[currentImageIndex].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Dots */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {foodImages.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-2 rounded-full ${
                      currentImageIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
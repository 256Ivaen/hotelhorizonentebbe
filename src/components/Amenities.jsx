import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

// Title Component
const Title = ({ text1, text2 }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-light text-gray-900">
        <span>{text1}</span>{" "}
        <span className="text-[#b97a38] font-medium">{text2}</span>
      </h2>
      <div className="flex items-center justify-center mt-3">
        <div className="h-px w-12 bg-[#b97a38]/20"></div>
        <div className="h-px w-20 bg-[#b97a38] mx-2"></div>
        <div className="h-px w-12 bg-[#b97a38]/20"></div>
      </div>
    </div>
  );
};

// Get icon for amenity - moved outside of component to fix reference error
const getAmenityIcon = (iconName) => {
  switch(iconName) {
    case "swimming":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
        </svg>
      );
    case "spa":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      );
    case "dining":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1 .53 0L12.5 3.5l.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0L18.5 3.5l.265-.39a.375.375 0 0 1 .53 0c.108.108.108.285 0 .393l-.265.392.265.391c.108.108.108.285 0 .393a.375.375 0 0 1-.53 0L18.5 4.5l-.265.39a.375.375 0 0 1-.53 0c-.108-.108-.108-.285 0-.393l.265-.391-.265-.392a.375.375 0 0 1 0-.393Zm-12 .5a.375.375 0 1 1 .53 0L6.5 3.5l.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0l.265.39.265-.39a.375.375 0 1 1 .53 0L12.5 3.5l.265-.39a.375.375 0 0 1 .53 0c.108.108.108.285 0 .393l-.265.392.265.391c.108.108.108.285 0 .393a.375.375 0 0 1-.53 0L12.5 4.5l-.265.39a.375.375 0 0 1-.53 0c-.108-.108-.108-.285 0-.393l.265-.391-.265-.392a.375.375 0 0 1 0-.393Z" />
        </svg>
      );
    case "fitness":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case "beach":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      );
    case "business":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>
      );
    case "concierge":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
        </svg>
      );
    case "yacht":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        </svg>
      );
  }
};

// Regular Amenity Item (Second Row)
const AmenityItem = ({ amenity, onLearnMore }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative h-48 rounded-md overflow-hidden shadow-md"
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.img
        src={amenity.image}
        alt={amenity.name}
        className="w-full h-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-[#b97a38]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            {getAmenityIcon(amenity.icon)}
          </div>
          <h3 className="text-white text-base font-medium">{amenity.name}</h3>
        </div>
        
        <p className="text-white/80 text-xs mb-3 line-clamp-2">{amenity.description}</p>
        
        <motion.button
          className="px-3 py-1.5 bg-[#b97a38] text-white text-xs flex items-center gap-1.5"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onLearnMore}
        >
          LEARN MORE
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Featured Amenity Item (First Row)
const FeaturedAmenityItem = ({ amenity, onLearnMore }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative rounded-md overflow-hidden shadow-md h-80 md:h-96"
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.img
        src={amenity.image}
        alt={amenity.name}
        className="w-full h-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#b97a38]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            {getAmenityIcon(amenity.icon)}
          </div>
          <h3 className="text-white text-2xl font-medium">{amenity.name}</h3>
        </div>
        
        <p className="text-white/90 text-xs mb-4 max-w-lg">{amenity.description}</p>
        
        <motion.button
          className="px-5 py-2 bg-[#b97a38] text-white text-xs font-medium inline-flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onLearnMore}
        >
          LEARN MORE
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Amenities Component
const Amenities = ({ showAll = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Sample amenity data
  const amenityItems = [
    {
      id: 1,
      name: "Out Door Pool",
      description: "Relax in our serene outdoor infinity pool overlooking Entebbe - Kampala Express Way",
      fullDescription:
        "Take a dip in Hotel Horizo Entebbe’s beautifully designed out door pool. Whether you're enjoying a morning swim or a sunset cocktail, this tranquil setting is perfect for relaxation and rejuvenation.",
      image: assets.pool,
      icon: "swimming"
    },
    {
      id: 2,
      name: "Out Door Dining",
      description: "Enjoy fresh, locally-inspired cuisine with a view",
      fullDescription:
        "Dine alfresco under the stars with gentle natural breeze . Our chefs blend Ugandan ingredients with global techniques to serve up unforgettable dishes—from freshly grilled tilapia to tropical fruit desserts—all complemented by curated wine and cocktail pairings.",
      image: assets.sigrestaurant,
      icon: "dining"
    },
    {
      id: 3,
      name: "Fitness Studio",
      description: "Modern gym facilities with a view of nature",
      fullDescription:
        "Stay active in our fully equipped fitness studio featuring modern cardio machines, free weights, and functional training zones. With large windows offering views of lush gardens, it's a refreshing space for your morning workouts or evening routines.",
      image: assets.gym,
      icon: "fitness"
    },
    {
      id: 4,
      name: "Business Lounge",
      description: "Private workspaces with full business amenities",
      fullDescription:
        "Whether you're working remotely or hosting meetings, our Business Lounge offers a professional yet comfortable environment. Equipped with high-speed Wi-Fi, printing services, and private meeting areas, it's perfect for staying connected and productive while traveling.",
      image: assets.conference_hall,
      icon: "business"
    },
    {
      id: 5,
      name: "Indoor Lounge Bar",
      description: "Chic indoor bar with handcrafted cocktails and live music",
      fullDescription:
        "Unwind in our stylish indoor bar featuring a curated selection of wines, spirits, and signature cocktails. With cozy seating, ambient lighting, and occasional live music performances, it's the perfect setting for evening relaxation or socializing with guests.",
      image: assets.bar,
      icon: "bar"
    }
  ];
  
  
  const displayedAmenities = showAll
    ? amenityItems
    : amenityItems.slice(0, 6);
  
  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Navigation handlers
  const handleNext = () => {
    const maxIndex = displayedAmenities.length - (isMobile ? 1 : 4);
    if (currentIndex < maxIndex) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };
  
  // Modal handlers
  const openModal = (amenity) => {
    setSelectedAmenity(amenity);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'auto';
  };
  
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative bg-white">
      <div className="text-center pb-8">
        <Title text1={"HOTEL"} text2={"AMENITIES"} />
        <p className="w-3/4 m-auto text-xs text-gray-600 max-w-[600px]">
          Enjoy our world-class facilities and services
        </p>
      </div>
      
      <div className="relative">
        {/* Featured Amenity (First Row) */}
        <div className="mb-6">
          <FeaturedAmenityItem amenity={displayedAmenities[0]} onLearnMore={() => openModal(displayedAmenities[0])} />
        </div>
        
        {/* Navigation Arrows for Second Row */}
        <div className="flex justify-end gap-2 mb-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center border ${
              currentIndex === 0 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-[#b97a38] text-[#b97a38] hover:bg-[#b97a38] hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={currentIndex >= displayedAmenities.length - (isMobile ? 1 : 4) - 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center border ${
              currentIndex >= displayedAmenities.length - (isMobile ? 1 : 4) - 1
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-[#b97a38] text-[#b97a38] hover:bg-[#b97a38] hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </motion.button>
        </div>
        
        {/* Horizontal Scrolling Amenities (Second Row) */}
        <div className="overflow-hidden">
          <motion.div
            ref={carouselRef}
            className="flex gap-4"
            animate={{ x: `-${currentIndex * (isMobile ? 100 : 25)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {displayedAmenities.slice(1).map((amenity, index) => (
              <motion.div
                key={amenity.id}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <AmenityItem amenity={amenity} onLearnMore={() => openModal(amenity)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Modal for Amenity Details */}
      <AnimatePresence>
        {isModalOpen && selectedAmenity && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop with blur */}
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            
            {/* Modal Content */}
            <motion.div
              className="bg-white rounded-lg w-full max-w-2xl relative z-10 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Modal Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={selectedAmenity.image} 
                  alt={selectedAmenity.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 bg-[#b97a38]/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      {getAmenityIcon(selectedAmenity.icon)}
                    </div>
                    <h3 className="text-2xl font-medium">{selectedAmenity.name}</h3>
                  </div>
                </div>
              </div>
              
              {/* Modal Body */}
              <div className="p-6">
                <p className="text-gray-700 text-xs mb-6">{selectedAmenity.fullDescription}</p>
                
                <div className="flex justify-end">
                  <motion.button
                    className="px-5 py-2 bg-[#b97a38] text-white text-xs font-semibold rounded-sm"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={closeModal}
                  >
                    CLOSE
                  </motion.button>
                </div>
              </div>
              
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-white"
                whileHover={{ scale: 1.1, backgroundColor: "#b97a38" }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Amenities;
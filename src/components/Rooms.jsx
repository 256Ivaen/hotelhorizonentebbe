import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

// Refined Title Component with Brand Color
const Title = ({ text1, text2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col items-center justify-center mb-6"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
        <span>{text1}</span>{" "}
        <span className="text-[#b97a38] font-medium">{text2}</span>
      </h2>
      <div className="flex items-center gap-2 mt-4">
        <div className="h-px w-8 bg-[#b97a38]/30"></div>
        <div className="h-px w-16 bg-[#b97a38]"></div>
        <div className="h-px w-8 bg-[#b97a38]/30"></div>
      </div>
    </motion.div>
  );
};

const Rooms = ({ showAll = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const slidesContainerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const displayedRooms = showAll
    ? assets.roomItem
    : assets.roomItem.slice(0, 8);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate slides per view based on screen size
  const getSlidesPerView = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };
  
  const slidesPerView = getSlidesPerView();
  const totalSlides = displayedRooms.length;
  const maxIndex = Math.max(0, totalSlides - slidesPerView);
  
  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        setDirection('left');
        setCurrentIndex(0);
      } else {
        setDirection('right');
        setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, maxIndex]);
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection('left');
      setCurrentIndex(prev => prev - 1);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setDirection('right');
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  // Touch controls for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      handleNext();
    }
    
    if (touchStart - touchEnd < -75) {
      // Swipe right
      handlePrev();
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative bg-white"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#b97a38]/20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#b97a38]/20"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center pb-12">
          <Title text1={"ROOMS &"} text2={"SUITES"} />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-3/4 m-auto text-xs text-gray-600 max-w-[600px]"
          >
            Choose from our selection of luxurious accommodations designed for your ultimate comfort and relaxation
          </motion.p>
        </div>
        
        {/* Rooms Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-[#b97a38] ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-[#b97a38] ${
                currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </motion.button>
          </div>
          
          {/* Carousel Track */}
          <div 
            ref={slidesContainerRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div 
              className="flex"
              initial={false}
              animate={{ x: -currentIndex * (100 / slidesPerView) + '%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {displayedRooms.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <EnhancedRoomItem
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    beds={item.beds}
                    size={item.size}
                    guests={item.guests}
                    bathrooms={item.bathrooms}
                    choice={item.choice}
                    cardInfo={item.cardInfo}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? 'w-8 bg-[#b97a38]' : 'w-2 bg-gray-300'
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 'right' : 'left');
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
        
        {/* View All Rooms Button */}
        {!showAll && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link to="/rooms">
              <motion.div
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-[#b97a38] text-[#b97a38] font-medium tracking-wide text-xs hover:bg-[#b97a38] hover:text-white transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(185, 122, 56, 0.2)" }}
                whileTap={{ scale: 0.97 }}
              >
                VIEW ALL ROOMS
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Enhanced RoomItem component with Framer Motion
const EnhancedRoomItem = ({
  id,
  image,
  name,
  price,
  description,
  cardInfo,
  beds,
  size,
  guests,
  bathrooms,
  choice,
}) => {
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleShare = async () => {
    const shareData = {
      title: name,
      text: `Check out this room: ${name}`,
      url: `${window.location.origin}/room/${id}`,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };
  
  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };
  
  return (
    <motion.div 
      className="rounded-lg overflow-hidden shadow-lg h-full bg-white"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-[280px]">
        <motion.img
          src={image[1]}
          alt={name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.7 : 0.4 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Room Type Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-[#b97a38]/90 text-white text-xs font-medium px-3 py-1.5 backdrop-blur-sm">
            {choice || "PREMIUM"}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            onClick={handleShare}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b97a38]">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </motion.button>
          
          <motion.button
            onClick={handleLike}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={liked ? "text-red-500" : "text-[#b97a38]"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </motion.button>
        </div>
        
        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm text-[#b97a38] px-3 py-2 font-semibold rounded">
            <span className="text-xs text-gray-600 block">From</span>
            <span className="text-lg">{price}</span>
            <span className="text-xs font-normal text-gray-600"> / night</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-medium text-gray-900 mb-1.5">{name}</h3>
          <p className="text-xs text-gray-600 line-clamp-2">{cardInfo}</p>
        </div>
        
        {/* Room Features */}
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b97a38]">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <p className="text-xs text-gray-700">Up to {guests} guests</p>
          </div>
          
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b97a38]">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
            <p className="text-xs text-gray-700">{beds} bed{beds !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b97a38]">
              <path d="M9 22V12h6v10M2 22h20M3 9l9-7 9 7v13H3V9z"></path>
            </svg>
            <p className="text-xs text-gray-700">{size} m²</p>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <Link
            to={`/room/${id}`}
            className="px-4 py-3 text-[#b97a38] border border-[#b97a38] text-xs font-medium text-center transition-all hover:bg-[#b97a38]/5"
          >
            VIEW DETAILS
          </Link>
          
          <Link
            to="/reserve"
            state={{
              id,
              image,
              name,
              price,
              cardInfo,
              description,
              beds,
              size,
              guests,
              bathrooms,
              choice,
            }}
            className="px-4 py-3 bg-[#b97a38] text-white text-xs font-medium text-center transition-all hover:bg-[#b97a38]/90"
          >
            BOOK NOW
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Rooms;
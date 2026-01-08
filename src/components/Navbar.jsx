import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true); 
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleNavigation = (path) => {
    setMenuOpen(false);
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  // Navigation items with their respective icons
  const navItems = [
    { 
      name: "HOME", 
      path: "/", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: "ROOMS",
      path: "/rooms",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    // {
    //   name: "DINING",
    //   path: "/dining",
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2.5M15 11h4.5a2 2 0 012 2v1a2 2 0 01-2 2h-5.5M3 16V8a1 1 0 011-1h14a1 1 0 011 1v.5M9.5 12h5" />
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8V7m0 1v1m0-1h1m-1 0H8m2 6l1-5h-1l-1 5h1zm4-5h-2l1 5h1l-1-5z" />
    //     </svg>
    //   )
    // },
    {
      name: "EVENTS",
      path: "/events",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: "BLOG", 
      path: "/blog",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24">
          {/* Logo - Larger Size */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigation("/")}
            className="cursor-pointer"
          >
            <img
              src={assets.logo}
              className={`h-14 w-auto transition-all duration-300 object-contain ${
                scrolled || !isHomePage
                  ? ""
                  : isHomePage ? "filter brightness-0 invert" : ""
              }`}
              alt="Hotel Horizon Logo"
            />
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                onHoverStart={() => {
                  setHoveredItem(item.name);
                }}
                onHoverEnd={() => {
                  setHoveredItem(null);
                }}
              >
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`py-2 text-xs font-medium tracking-widest transition-all duration-300 ${
                    location.pathname === item.path
                      ? scrolled || !isHomePage
                        ? "text-[#b97a38]"
                        : "text-white"
                      : scrolled || !isHomePage
                      ? "text-gray-800 hover:text-[#b97a38]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
                
                {/* Animated underline */}
                {(location.pathname === item.path || hoveredItem === item.name) && (
                  <motion.div
                    layoutId={`underline-${scrolled ? "scrolled" : "top"}`}
                    className={`h-px absolute -bottom-1 left-0 right-0 ${
                      scrolled || !isHomePage ? "bg-[#b97a38]" : "bg-white"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Reserve Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation("/reserve")}
            className={`hidden md:flex items-center px-6 py-2.5 text-xs font-medium tracking-wider transition-all duration-300 ${
              scrolled || !isHomePage
                ? "bg-[#b97a38] text-white shadow-md hover:bg-[#b97a38]/90"
                : "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            RESERVE NOW
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center"
          >
            <div className="w-8 h-6 relative flex flex-col justify-between">
              <motion.span 
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 10 : 0 }}
                className={`w-full h-0.5 transform transition-all duration-300 ${
                  scrolled || !isHomePage ? "bg-gray-800" : "bg-white"
                }`}
              />
              <motion.span 
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className={`w-full h-0.5 opacity-100 transition-opacity duration-300 ${
                  scrolled || !isHomePage ? "bg-gray-800" : "bg-white"
                }`}
              />
              <motion.span 
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -10 : 0 }}
                className={`w-full h-0.5 transform transition-all duration-300 ${
                  scrolled || !isHomePage ? "bg-gray-800" : "bg-white"
                }`}
              />
            </div>
          </motion.button>
        </div>
        
        {/* Thin Line Separator - Visible on Scroll or Non-Home Pages */}
        {(scrolled || !isHomePage) && (
          <div className="h-px bg-gray-200/70 w-full" />
        )}
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-24 bg-white md:hidden overflow-auto"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`py-4 text-left text-sm font-medium tracking-wider border-b border-gray-100 flex justify-between items-center ${
                    location.pathname === item.path
                      ? "text-[#b97a38] border-[#b97a38]"
                      : "text-gray-700"
                  }`}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  <span>{item.name}</span>

                  {location.pathname === item.path && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#b97a38]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </motion.button>
              ))}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigation("/reserve")}
                className="mt-4 bg-[#b97a38] text-white py-4 flex items-center justify-center gap-2 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="text-xs font-medium tracking-wider">RESERVE NOW</span>
              </motion.button>
              
              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-[#b97a38] tracking-wider mb-3">CONTACT US</p>
                <p className="text-sm font-medium">+256 740 505050</p>
                <p className="text-xs text-gray-500 mt-1">info@hotelhorizon.com</p>
              </div>
              
              {/* Social Media Links with Proper Icons */}
              <div className="flex justify-center gap-4 pt-4">
                {/* Facebook */}
                <motion.a
                  href="#facebook"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 320 512">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                </motion.a>
                
                {/* Instagram */}
                <motion.a
                  href="#instagram"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gradient-to-tr from-[#FD5949] to-[#D6249F] hover:text-white transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                  </svg>
                </motion.a>
                
                {/* Twitter/X */}
                <motion.a
                  href="#twitter"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for content below fixed navbar */}
      {!isHomePage && <div className="h-24"></div>}
    </>
  );
};

export default Navbar;
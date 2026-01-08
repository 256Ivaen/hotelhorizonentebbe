import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const Footer = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Quick Links with proper routing
  const quickLinks = [
    { name: "Rooms & Suites", path: "/rooms" },
    { name: "Dining Experience", path: "/dining" },
    { name: "Events & Meetings", path: "/events" },
    { name: "Special Offers", path: "/offers" },
    { name: "Gallery", path: "/gallery" }
  ];
  
  // Services with proper routing
  const services = [
    { name: "Concierge Assistance", path: "/services/concierge" },
    { name: "Spa & Wellness", path: "/services/spa" },
    { name: "Airport Transfers", path: "/services/transfers" },
    { name: "Business Center", path: "/services/business" },
    { name: "Exclusive Experiences", path: "/services/experiences" }
  ];
  
  // Social media links with proper SVG icons
  const socialLinks = [
    { 
      name: "Facebook",
      url: "https://www.facebook.com", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 320 512" className="text-white">
          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
        </svg>
      )
    },
    { 
      name: "Instagram",
      url: "https://www.instagram.com", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512" className="text-white">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
        </svg>
      )
    },
    { 
      name: "Twitter",
      url: "https://www.twitter.com", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512" className="text-white">
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
        </svg>
      )
    },
    { 
      name: "YouTube",
      url: "https://www.youtube.com", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 576 512" className="text-white">
          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
        </svg>
      )
    },
    { 
      name: "TikTok",
      url: "https://www.tiktok.com", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512" className="text-white">
          <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-[#0a0a0a] to-[#141217] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-md">
              <h3 className="text-xl font-light tracking-wide mb-3">Stay Updated</h3>
              <p className="text-white/70 text-sm">
                Subscribe to our newsletter for exclusive offers, travel inspiration, and updates on special promotions.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#b97a38] min-w-[250px]"
                />
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#b97a38] text-white px-5 py-3 text-sm font-medium hover:bg-[#b97a38]/90 transition-all"
                >
                  SUBSCRIBE
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Hotel Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <img
              src={assets.logo}
              className="mb-6 h-16 filter invert brightness-0"
              alt="Hotel Horizon Logo"
            />
            <p className="text-white/70 text-sm max-w-md mb-6">
              Experience unparalleled luxury and comfort at Hotel Horizon. Nestled in a prime location, our hotel offers elegant accommodations, exceptional dining, and personalized service for an unforgettable stay.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="text-[#b97a38] mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white/90">Plot 11-13 Portal Lane, Entebbe, Uganda</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-[#b97a38] mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white/90">+256 740 505050</p>
                  <p className="text-sm text-white/90">Reservations: +256 740 505051</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-[#b97a38]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white/90">info@hotelhorizonug.com</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-medium mb-6 flex items-center">
              <span className="block w-5 h-px bg-[#b97a38] mr-2"></span>
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#b97a38] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Services */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-medium mb-6 flex items-center">
              <span className="block w-5 h-px bg-[#b97a38] mr-2"></span>
              OUR SERVICES
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#b97a38] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-4 flex items-center text-white/90">
                <span className="block w-3 h-px bg-[#b97a38] mr-2"></span>
                FOLLOW US
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#b97a38] flex items-center justify-center transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-xs">
              &copy; {new Date().getFullYear()} Hotel Horizon. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
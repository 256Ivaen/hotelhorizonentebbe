import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Heart,
  ArrowRight,
  Star,
  Calendar,
  Users,
  BedDouble,
  Bath,
  MapPin,
  MessageSquare,
} from "lucide-react";
import Rooms from "../components/Rooms";
import Title from "../components/Title";
import { Helmet } from "react-helmet";
import { jsonLdScriptProps } from "react-schemaorg";
import { Hotel, Product, AggregateRating, Offer } from "schema-dts";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [nextRoom, setNextRoom] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // Auto rotate images for roomData
  useEffect(() => {
    if (!roomData) return;

    const intervalId = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % roomData.image.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(intervalId);
  }, [roomData]);

  useEffect(() => {
    const fetchRoomData = () => {
      setLoading(true);
      const currentIndex = assets.roomItem.findIndex(
        (item) => item.id === roomId
      );
      if (currentIndex !== -1) {
        const room = assets.roomItem[currentIndex];
        setRoomData(room);
        setActiveImage(room.image[0]);
        // Find the next room for recommendations
        const nextIndex = (currentIndex + 1) % assets.roomItem.length;
        setNextRoom(assets.roomItem[nextIndex]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchRoomData();
    window.scrollTo(0, 0);
  }, [roomId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFaqToggle = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: roomData.name,
          text: `Check out this amazing ${roomData.name} at our hotel!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
        // Fallback for browsers that don't support the Web Share API
        copyToClipboard(window.location.href);
        alert("Link copied to clipboard!");
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const copyToClipboard = (text) => {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  const handleBookNow = () => {
    navigate("/reserve", {
      state: {
        id: roomData.id,
        image: roomData.image,
        name: roomData.name,
        price: roomData.price,
        description: roomData.description,
        beds: roomData.beds,
        size: roomData.size,
        guests: roomData.guests,
        bathrooms: roomData.bathrooms,
        choice: roomData.choice,
      },
    });
  };

  const handleContactUs = () => {
    const phoneNumber = "256740505050"; // Replace with your actual WhatsApp number

    // Get time-based greeting
    const hours = new Date().getHours();
    let greeting;

    if (hours >= 5 && hours < 12) {
      greeting = "Good Morning";
    } else if (hours >= 12 && hours < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

    // Format the pre-message with room info if available
    const message = roomData
      ? `${greeting}. I would like to get to know more about your ${roomData.name} accommodation.`
      : `${greeting}. I would like to get to know more about your accommodation.`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with pre-filled message
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const imageVariants = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Room FAQs
  const faqs = [
    {
      question: `What amenities are included in the ${roomData?.name || "room"}?`,
      answer: `The ${roomData?.name || "room"} comes with premium amenities including free high-speed Wi-Fi, breakfast service, luxury bedding, climate control, flat-screen TV, mini bar, and 24-hour room service.`
    },
    {
      question: "What is the check-in and check-out time?",
      answer: "Check-in starts at 4:00 PM and check-out is by 11:00 AM. Early check-in and late check-out are subject to availability."
    },
    {
      question: "Is breakfast included in the room rate?",
      answer: "Yes, a complimentary breakfast buffet is included with your stay, featuring both local and international cuisine options."
    },
    {
      question: `How many guests can stay in the ${roomData?.name || "room"}?`,
      answer: `The ${roomData?.name || "room"} can comfortably accommodate up to ${roomData?.guests || 2} guests with ${roomData?.beds || "king-size"} beds.`
    }
  ];

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 border-t-4 border-b-4 border-[#b97a38] rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!roomData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2 variants={fadeIn} className="text-2xl font-bold mb-4 text-gray-800">
            Room Not Found
          </motion.h2>
          <motion.p variants={fadeIn} className="text-gray-600 mb-8">
            Sorry, we couldn't find the room you're looking for.
          </motion.p>
          <motion.button
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-[#b97a38] text-white px-6 py-2 rounded-lg hover:bg-[#b97a38]/90 transition-all shadow-md"
            aria-label="Return to home page"
          >
            Return to Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const metaDescription = `Experience luxury in our ${roomData.name}. ${roomData.choice} with ${roomData.beds} beds for up to ${roomData.guests} guests. Book now for the best rates!`;
  const canonicalUrl = window.location.origin + window.location.pathname;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: roomData.name,
    image: roomData.image,
    description: roomData.description.replace(/<[^>]*>?/gm, ""), // Strip HTML tags for schema
    sku: roomData.id,
    brand: {
      "@type": "Brand",
      name: "Hotel Horizon", // Update with your hotel name
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD", // Replace with your currency
      price: roomData.price.replace(/[^\d.]/g, ""), // Extract only numbers from price
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "87", // Replace with actual review count
    },
  };

  // Additional Schema for Hotel Room
  const hotelRoomSchema = {
    "@context": "https://schema.org",
    "@type": "HotelRoom", 
    "name": roomData.name,
    "description": roomData.description.replace(/<[^>]*>?/gm, ""),
    "numberOfRooms": 1,
    "occupancy": {
      "@type": "QuantitativeValue",
      "maxValue": roomData.guests
    },
    "amenityFeature": roomData.facilities?.map(facility => ({
      "@type": "LocationFeatureSpecification",
      "name": facility.name,
      "value": true
    })),
    "containedInPlace": {
      "@type": "Hotel",
      "name": "Hotel Horizon",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "42 Katalima Rd",
        "addressLocality": "Kampala",
        "addressRegion": "Central Region",
        "postalCode": "",
        "addressCountry": "UG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "0.3237317",
        "longitude": "32.5937156"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${roomData.name} | Hotel Horizon - Experience Luxury`}</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content={`hotel room, ${roomData.name}, luxury accommodation, ${roomData.choice}, hotel booking, hotel horizon, kampala`}
        />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content={`${roomData.name} | Hotel Horizon - Experience Luxury`}
        />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={roomData.image[0]} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hotel Horizon" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${roomData.name} | Hotel Horizon - Experience Luxury`}
        />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={roomData.image[0]} />
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(hotelRoomSchema)}
        </script>
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section - Height set to 50vh */}
        <div className="relative h-[50vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={roomData.image[activeImageIndex]}
              src={roomData.image[activeImageIndex]}
              className="w-full h-full object-cover"
              alt={`${roomData.name} - view ${activeImageIndex + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              loading="eager" // Load this image immediately as it's above the fold
            />
          </AnimatePresence>
          
          {/* Multiple overlays matching the Hero styling */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Brand Name - matching Hero style */}
                <motion.div 
                  className="overflow-hidden mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-block text-xs tracking-widest font-light bg-[#b97a38]/20 backdrop-blur-sm px-4 py-2 border-l-2 border-[#b97a38] text-white">
                    HOTEL HORIZON
                  </span>
                </motion.div>
              
                <div className="flex items-center space-x-2 mb-2">
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#b97a38] text-white text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {roomData.choice}
                  </motion.span>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center text-yellow-400 text-xs"
                  >
                    <Star size={16} fill="currentColor" className="mb-0.5" />
                    <span className="text-white ml-1">4.9</span>
                  </motion.div>
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-white text-3xl md:text-5xl font-light mb-4"
                >
                  {roomData.name.split(' ').map((word, i, arr) => (
                    <React.Fragment key={i}>
                      {i === arr.length - 1 ? (
                        <span className="text-[#b97a38] font-medium">{word}</span>
                      ) : (
                        <span>{word} </span>
                      )}
                    </React.Fragment>
                  ))}
                </motion.h1>
                
                {/* Decorative Line - matching Hero style */}
                <motion.div 
                  className="w-24 h-0.5 bg-white/30 mb-6 relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center text-white/80"
                >
                  <MapPin size={16} className="mr-1" />
                  <span className="text-xs">42 Katalima Rd, Kampala, Uganda</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="w-full md:w-2/3"
            >
              {/* Room Image Gallery */}
              <motion.div 
                variants={fadeIn}
                className="relative aspect-video overflow-hidden mb-6 rounded-xl shadow-md"
              >
                {roomData.image.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt={`${roomData.name} - View ${index + 1}`}
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
                      index === activeImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ))}

                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setActiveImageIndex(
                        (prev) =>
                          (prev - 1 + roomData.image.length) %
                          roomData.image.length
                      )
                    }
                    className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md transition-all"
                    aria-label="Previous image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-[#b97a38]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setActiveImageIndex(
                        (prev) => (prev + 1) % roomData.image.length
                      )
                    }
                    className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md transition-all"
                    aria-label="Next image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-[#b97a38]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs">
                  {activeImageIndex + 1} / {roomData.image.length}
                </div>
              </motion.div>

              {/* Room Overview */}
              <motion.div 
                variants={fadeIn}
                className="bg-white rounded-xl shadow-sm p-6 mb-8"
              >
                <h2 className="text-2xl font-light mb-4">
                  {roomData.name.split(' ').map((word, i, arr) => (
                    <React.Fragment key={i}>
                      {i === arr.length - 1 ? (
                        <span className="text-[#b97a38] font-medium">{word}</span>
                      ) : (
                        <span>{word} </span>
                      )}
                    </React.Fragment>
                  ))}
                </h2>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6"
                >
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <BedDouble size={20} className="text-[#b97a38]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">BEDS</p>
                      <p className="font-medium">{roomData.beds}</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Users size={20} className="text-[#b97a38]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">GUESTS</p>
                      <p className="font-medium">{roomData.guests}</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <Bath size={20} className="text-[#b97a38]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">BATHROOMS</p>
                      <p className="font-medium">{roomData.bathrooms}</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <Calendar size={20} className="text-[#b97a38]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">SIZE</p>
                      <p className="font-medium">{roomData.size}</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Tabs */}
                <div className="border-b mb-6">
                  <div className="flex space-x-8">
                    <motion.button
                      whileHover={{ y: -2 }}
                      onClick={() => handleTabClick("description")}
                      className={`pb-3 ${
                        activeTab === "description"
                          ? "border-b-2 border-[#b97a38] text-[#b97a38] font-medium text-xs"
                          : "text-gray-500 hover:text-gray-800 text-xs"
                      } transition-colors`}
                      aria-selected={activeTab === "description"}
                      role="tab"
                    >
                      Description
                    </motion.button>
                    <motion.button
                      whileHover={{ y: -2 }}
                      onClick={() => handleTabClick("features")}
                      className={`pb-3 ${
                        activeTab === "features"
                          ? "border-b-2 border-[#b97a38] text-[#b97a38] font-medium text-xs"
                          : "text-gray-500 hover:text-gray-800 text-xs"
                      } transition-colors`}
                      aria-selected={activeTab === "features"}
                      role="tab"
                    >
                      Room Features
                    </motion.button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="prose max-w-none mb-6">
                  <AnimatePresence mode="wait">
                    {activeTab === "description" && (
                      <motion.div
                        key="description"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-700 leading-relaxed text-xs"
                        dangerouslySetInnerHTML={{ __html: roomData.description }}
                      />
                    )}

                    {activeTab === "features" && (
                      <motion.div
                        key="features"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-lg font-light mb-4">
                            Room <span className="text-[#b97a38] font-medium">Amenities</span>
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                            {roomData.facilities?.map((facility, index) => (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ 
                                  opacity: 1,
                                  y: 0,
                                  transition: { delay: index * 0.05 }
                                }}
                                whileHover={{ 
                                  backgroundColor: "rgba(185, 122, 56, 0.1)",
                                  x: 5
                                }}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                                key={index}
                              >
                                <div className="flex gap-1">
                                  {Array.isArray(facility.icon) ? (
                                    facility.icon.map((icon, i) => (
                                      <img
                                        key={i}
                                        src={icon}
                                        alt={facility.name}
                                        className="h-5 w-5"
                                        loading="lazy"
                                      />
                                    ))
                                  ) : (
                                    <img
                                      src={facility.icon}
                                      alt={facility.name}
                                      className="h-5 w-5"
                                      loading="lazy"
                                    />
                                  )}
                                </div>
                                <span className="text-xs">{facility.name}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-light mb-4">
                            Additional <span className="text-[#b97a38] font-medium">Services</span>
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                            {roomData.extraFacilities?.map(
                              (extraFacility, index) => (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ 
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: index * 0.05 + 0.2 }
                                  }}
                                  whileHover={{ 
                                    backgroundColor: "rgba(185, 122, 56, 0.1)",
                                    x: 5
                                  }}
                                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                                  key={index}
                                >
                                  <img
                                    src={extraFacility.icon}
                                    alt={extraFacility.name}
                                    className="h-3 w-3"
                                    loading="lazy"
                                  />
                                  <span className="text-xs">
                                    {extraFacility.name}
                                  </span>
                                </motion.div>
                              )
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Hotel Features */}
              <motion.div 
                variants={fadeIn}
                className="bg-white rounded-xl shadow-sm p-6 mb-8"
              >
                <h3 className="text-lg font-light mb-4">
                  Hotel <span className="text-[#b97a38] font-medium">Features</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Hotel amenities with animations */}
                  {[
                    { icon: assets.wifi_icon, name: "Free Wi-Fi" },
                    { icon: assets.shuttle_icon, name: "Airport Shuttle" },
                    { icon: assets.nosmoking_icon, name: "Non-smoking Rooms" },
                    { icon: assets.restaurant_icon, name: "Restaurant" },
                    { icon: assets.swimming_icon, name: "Outdoor Pool" },
                    { icon: assets.fitness_icon, name: "Fitness Centre" },
                    { icon: assets.disabled_icon, name: "Accessible Facilities" },
                    { icon: assets.packing_icon, name: "Free Parking" },
                    { icon: assets.bar_icon, name: "Bar" },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.05 } 
                      }}
                      whileHover={{ 
                        scale: 1.03,
                        backgroundColor: "rgba(185, 122, 56, 0.1)"
                      }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-all"
                    >
                      <img
                        src={feature.icon}
                        className="w-5 h-5"
                        alt={feature.name}
                        loading="lazy"
                      />
                      <span className="text-xs">{feature.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* FAQ Section - Improved design */}
              <motion.div 
                variants={fadeIn}
                className="bg-white rounded-xl shadow-sm p-6 mb-8"
              >
                <div className="flex flex-col md:flex-row mb-6">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="text-sm">
                      <Title text2={"FAQS"} />
                    </div>
                    <h3 className="text-xl font-light">
                      Common <span className="text-[#b97a38] font-medium">Questions</span>
                    </h3>
                    <p className="text-xs text-gray-600 mt-2">
                      Everything you need to know about your stay
                    </p>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-8">
                    <div className="space-y-2">
                      {faqs.map((faq, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: 1,
                            y: 0,
                            transition: { delay: index * 0.1 }
                          }}
                          className="border-b pb-2"
                        >
                          <div
                            onClick={() => handleFaqToggle(index)}
                            className={`flex items-center justify-between text-sm cursor-pointer transition-colors duration-300 py-3 ${
                              activeFaqIndex === index ? "text-[#b97a38]" : "text-gray-700"
                            }`}
                          >
                            <h3 className="font-medium">{faq.question}</h3>
                            <motion.div
                              animate={{ 
                                rotate: activeFaqIndex === index ? 90 : 0
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <img
                                src={assets.arrowDown}
                                alt="Toggle Icon"
                                className="w-5 h-5"
                              />
                            </motion.div>
                          </div>
                          
                          <AnimatePresence>
                            {activeFaqIndex === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: "auto", 
                                  opacity: 1,
                                  transition: { duration: 0.3 }
                                }}
                                exit={{ 
                                  height: 0, 
                                  opacity: 0,
                                  transition: { duration: 0.2 }
                                }}
                                className="overflow-hidden"
                              >
                                <p className="text-xs text-gray-600 pb-3">{faq.answer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Location with Google Maps */}
              <motion.div 
                variants={fadeIn}
                className="bg-white rounded-xl shadow-sm p-6 mb-8"
              >
                <h3 className="text-lg font-light mb-4">
                  Our <span className="text-[#b97a38] font-medium">Location</span>
                </h3>
                
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.816055553818!2d32.467560679173836!3d0.06104849977939551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177d87305c6cc673%3A0x36e19bf43ac22fb7!2sHotel%20Horizon%20Entebbe!5e0!3m2!1sen!2sug!4v1746543686317!5m2!1sen!2sug" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hotel Horizon Location"
                    className="w-full h-full"
                  ></iframe>


                </div>
                
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin size={18} className="text-[#b97a38]" />
                  <p className="text-sm font-medium">Plot 11 - 13 Portal Lane Entebbe</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium mb-1">From Airport</h4>
                    <p className="text-xs text-gray-600">10 min drive from Entebbe International Airport</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium mb-1">City Center</h4>
                    <p className="text-xs text-gray-600">50 min drive to Kampala City Center</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium mb-1">Attractions</h4>
                    <p className="text-xs text-gray-600">Close to shopping Mall, dining and cultural sites</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full md:w-1/3"
            >
              <div className="sticky top-32">
                {/* Booking Card */}
                <motion.div 
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-3xl font-bold text-[#b97a38]">
                        {roomData.price}
                      </span>
                      <span className="text-gray-500">/night</span>
                    </div>
                    <div className="flex items-center text-yellow-400">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + (index * 0.1) }}
                        >
                          <Star size={16} fill="currentColor" />
                        </motion.div>
                      ))}
                      <span className="ml-1 text-gray-700 text-sm">5.0</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleBookNow}
                    className="w-full text-xs font-semibold bg-[#b97a38] hover:bg-[#b97a38]/90 text-white py-3 rounded-lg font-medium transition-all mb-4 flex items-center justify-center shadow-md hover:shadow-lg"
                    aria-label="Book this room now"
                  >
                    Book Now
                    <ArrowRight size={18} className="ml-2" />
                  </motion.button>

                  <div className="space-y-4">
                    {[
                      { icon: assets.wifi_icon, name: "Free WiFi", status: "Included" },
                      { icon: assets.breakfast_icon, name: "Breakfast", status: "Included" },
                      { icon: assets.packing_icon, name: "Parking", status: "Free" }
                    ].map((feature, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 0.8 + (index * 0.1) } 
                        }}
                        className="flex items-center justify-between pb-2 border-b border-gray-100"
                      >
                        <div className="flex items-center">
                          <img
                            src={feature.icon}
                            className="w-4 h-4 mr-2"
                            alt={feature.name}
                            loading="lazy"
                          />
                          <span className="text-xs">{feature.name}</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium">
                          {feature.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Need Help Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-blue-50 rounded-xl p-6"
                >
                  <h3 className="font-semibold mb-3">Need Help?</h3>
                  <p className="text-xs text-gray-700 mb-4">
                    Our customer service team is available 24/7 to assist you
                    with your booking.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#b97a38", color: "white" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleContactUs}
                    className="w-full bg-white text-xs font-semibold text-[#b97a38] border border-[#b97a38] py-2 rounded-lg font-medium hover:bg-[#b97a38] hover:text-white transition-colors flex items-center justify-center"
                    aria-label="Contact us via WhatsApp"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Contact Us
                  </motion.button>
                </motion.div>

                {/* Social Share and Save */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="flex justify-between mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#b97a38", color: "white" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="flex items-center justify-center w-1/2 mr-2 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-[#b97a38] hover:text-white transition-all text-xs"
                  >
                    <Share2 size={16} className="mr-2" />
                    Share
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: isFavorite ? "#b97a38" : "#ef4444", color: "white" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex items-center justify-center w-1/2 ml-2 py-2 rounded-lg transition-all text-xs ${
                      isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart
                      size={16}
                      className="mr-2"
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                    {isFavorite ? "Saved" : "Save"}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Next room recommendation */}
        {nextRoom && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white py-2 mt-5"
          >
            <div className="container mx-auto px-4">
              <h3 className="text-xl font-light mb-6">
                You May Also <span className="text-[#b97a38] font-medium">Like</span>
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-6 py-4">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  src={nextRoom.image[0]}
                  alt={nextRoom.name}
                  className="w-full md:w-1/3 h-64 object-cover rounded-xl shadow-md"
                />
                <div className="w-full md:w-2/3">
                  <span className="inline-block text-xs bg-[#b97a38]/10 text-[#b97a38] px-3 py-1 rounded-full mb-2">
                    {nextRoom.choice}
                  </span>
                  <h4 className="text-xl font-medium mb-2">{nextRoom.name}</h4>
                  <div className="flex items-center text-yellow-400 mb-4">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                    <span className="ml-1 text-gray-700 text-sm">5.0</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <BedDouble size={16} className="text-[#b97a38]" />
                      <span className="text-xs">{nextRoom.beds} Beds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-[#b97a38]" />
                      <span className="text-xs">Up to {nextRoom.guests} Guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath size={16} className="text-[#b97a38]" />
                      <span className="text-xs">{nextRoom.bathrooms} Bathroom</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/room/${nextRoom.id}`)}
                    className="flex items-center text-[#b97a38] font-medium text-sm"
                  >
                    View Details
                    <ArrowRight size={16} className="ml-2" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Similar Rooms Section */}
        <section aria-label="Similar rooms you might like">
          <Rooms />
        </section>
      </div>
    </>
  );
};

export default Room;
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const PageRooms = ({
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
  facilities = [],
  isReversed = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${name} | Luxury Accommodation`,
        text: `Explore our beautiful ${name} - ${description.substring(0, 100)}...`,
        url: `${window.location.origin}/room/${id}`,
      });
    } catch (err) {
      navigator.clipboard.writeText(`${window.location.origin}/room/${id}`);
      alert("Link copied to clipboard!");
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
  };

  const images = Array.isArray(image) ? image : [image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 w-full max-w-6xl mx-auto mb-16`}
      itemScope
      itemType="https://schema.org/HotelRoom"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Gallery Section */}
      <div className="lg:w-1/2 relative overflow-hidden rounded-xl aspect-[4/3] shadow-lg hover:shadow-xl transition-all duration-300">
        <motion.div
          className="w-full h-full relative"
          animate={{ 
            scale: hovered ? 1.03 : 1,
            transition: { duration: 0.5 }
          }}
        >
          <img
            itemProp="image"
            className="w-full h-full object-cover transition-opacity duration-500"
            src={images[currentImageIndex]}
            alt={`${name} room accommodation`}
            loading="lazy"
          />
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                    className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Badges */}
          {choice && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm"
            >
              <span className="text-xs font-medium text-[#b97a38]">{choice}</span>
            </motion.div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              aria-label="Share this room"
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-sm backdrop-blur-sm transition-all"
            >
              <Share2 size={18} className="text-gray-700" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              aria-label={liked ? "Remove from favorites" : "Add to favorites"}
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-sm backdrop-blur-sm transition-all"
            >
              <Heart
                size={18}
                className={`transition-colors ${liked ? "fill-red-500 text-red-500" : "text-gray-700"}`}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Details Section */}
      <div className="lg:w-1/2 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3" itemProp="name">
            {name}
          </h2>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  size={14}
                  className={`${i < 4 ? 'fill-[#b97a38] text-[#b97a38]' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">Luxury Suite</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <motion.div 
              whileHover={{ y: -2 }}
              className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
            >
              <div className="bg-[#b97a38]/10 p-2 rounded-lg">
                <BedDouble size={16} className="text-[#b97a38]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">BEDS</p>
                <p className="font-medium text-sm">{beds}</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -2 }}
              className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
            >
              <div className="bg-[#b97a38]/10 p-2 rounded-lg">
                <Users size={16} className="text-[#b97a38]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">GUESTS</p>
                <p className="font-medium text-sm">{guests}</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -2 }}
              className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
            >
              <div className="bg-[#b97a38]/10 p-2 rounded-lg">
                <Bath size={16} className="text-[#b97a38]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">BATH</p>
                <p className="font-medium text-sm">{bathrooms}</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -2 }}
              className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
            >
              <div className="bg-[#b97a38]/10 p-2 rounded-lg">
                <MapPin size={16} className="text-[#b97a38]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">SIZE</p>
                <p className="font-medium text-sm">{size}</p>
              </div>
            </motion.div>
          </div>
          
          <div className="mb-6">
            <p 
              className="text-gray-600 line-clamp-2 mb-4 text-sm leading-relaxed" 
              itemProp="description"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
            <Link 
              to={`/room/${id}`} 
              className="inline-flex items-center group text-[#b97a38] hover:text-[#9d6630] text-sm font-medium transition-colors"
            >
              View full details
              <ArrowRight 
                size={16} 
                className="ml-1 group-hover:translate-x-1 transition-transform" 
              />
            </Link>
          </div>
          
          {/* Amenities */}
          {facilities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Featured Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {facilities.slice(0, 4).map((facility, index) => (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 px-3 py-2 rounded-full"
                    key={index}
                  >
                    {Array.isArray(facility.icon) ? (
                      facility.icon[0] && (
                        <img
                          src={facility.icon[0]}
                          alt=""
                          className="h-4 w-4"
                          loading="lazy"
                        />
                      )
                    ) : (
                      <img
                        src={facility.icon}
                        alt=""
                        className="h-4 w-4"
                        loading="lazy"
                      />
                    )}
                    <span>{facility.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Price and Booking */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t pt-4">
            <div className="mb-4 sm:mb-0">
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-2xl font-bold text-gray-900" itemProp="priceRange">
                {price}
                <meta itemProp="priceCurrency" content="USD" />
              </p>
              <p className="text-xs text-gray-500">per night, plus taxes</p>
            </div>
            
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
              className="bg-[#b97a38] hover:bg-[#9d6630] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default PageRooms;
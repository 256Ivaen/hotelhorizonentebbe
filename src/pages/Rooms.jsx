import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import PageRooms from "../components/PageRooms";
import Subscribe from "../components/Subscribe";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  Share2,
  Heart,
  BedDouble,
  Users,
  Bath,
  MapPin
} from "lucide-react";

const Rooms = ({ showAll = true }) => {
  // State for filters and animation
  const [displayedRooms, setDisplayedRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const [filtersApplied, setFiltersApplied] = useState({
    price: { min: 0, max: 10000 },
    beds: null,
    guests: null,
    searchTerm: ""
  });
  const [sortOption, setSortOption] = useState("featured");
  const roomsPerPage = 5;

  // Initial setup and filtering
  useEffect(() => {
    let filteredRooms = showAll ? assets.roomItem : assets.roomItem.slice(0, 8);
    
    // Apply text search
    if (filtersApplied.searchTerm) {
      const term = filtersApplied.searchTerm.toLowerCase();
      filteredRooms = filteredRooms.filter(room => 
        room.name.toLowerCase().includes(term) || 
        room.description.toLowerCase().includes(term)
      );
    }
    
    // Apply price filter
    filteredRooms = filteredRooms.filter(room => {
      const roomPrice = typeof room.price === 'string' 
        ? parseInt(room.price.replace(/[^0-9]/g, '')) 
        : room.price;
      
      return roomPrice >= filtersApplied.price.min && 
             roomPrice <= filtersApplied.price.max;
    });
    
    // Apply beds filter
    if (filtersApplied.beds) {
      filteredRooms = filteredRooms.filter(room => room.beds >= filtersApplied.beds);
    }
    
    // Apply guests filter
    if (filtersApplied.guests) {
      filteredRooms = filteredRooms.filter(room => room.guests >= filtersApplied.guests);
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        filteredRooms.sort((a, b) => {
          const priceA = typeof a.price === 'string' 
            ? parseInt(a.price.replace(/[^0-9]/g, '')) 
            : a.price;
          const priceB = typeof b.price === 'string' 
            ? parseInt(b.price.replace(/[^0-9]/g, '')) 
            : b.price;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        filteredRooms.sort((a, b) => {
          const priceA = typeof a.price === 'string' 
            ? parseInt(a.price.replace(/[^0-9]/g, '')) 
            : a.price;
          const priceB = typeof b.price === 'string' 
            ? parseInt(b.price.replace(/[^0-9]/g, '')) 
            : b.price;
          return priceB - priceA;
        });
        break;
      case "featured":
      default:
        // Featured rooms (ones with 'choice' property) come first
        filteredRooms.sort((a, b) => {
          if (a.choice && !b.choice) return -1;
          if (!a.choice && b.choice) return 1;
          return 0;
        });
    }
    
    setDisplayedRooms(filteredRooms);
    setCurrentPage(1); // Reset to first page when filters change
  }, [showAll, filtersApplied, sortOption]);

  // Get current page rooms
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = displayedRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(displayedRooms.length / roomsPerPage);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    if (type === 'price') {
      setFiltersApplied({
        ...filtersApplied,
        price: value
      });
    } else {
      setFiltersApplied({
        ...filtersApplied,
        [type]: value
      });
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFiltersApplied({
      price: { min: 0, max: 10000 },
      beds: null,
      guests: null,
      searchTerm: ""
    });
    setSortOption("featured");
  };

  // Custom Room Component
  const EnhancedRoomCard = ({ room, index }) => {
    const [liked, setLiked] = useState(false);
    const isReversed = index % 2 !== 0;

    const handleShare = async () => {
      try {
        await navigator.share({
          title: `${room.name} | Hotel Horizon`,
          text: `Explore our beautiful ${room.name} - ${room.description.substring(0, 100)}...`,
          url: `${window.location.origin}/room/${room.id}`,
        });
      } catch (err) {
        navigator.clipboard.writeText(`${window.location.origin}/room/${room.id}`);
        alert("Link copied to clipboard!");
      }
    };

    const handleLike = (e) => {
      e.preventDefault();
      setLiked(!liked);
    };

    return (
      <article 
        className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 w-full mx-auto mb-16`}
        onMouseEnter={() => setActiveRoom(room.id)}
        onMouseLeave={() => setActiveRoom(null)}
        itemScope
        itemType="https://schema.org/HotelRoom"
      >
        {/* Image Section */}
        <div className="lg:w-1/2 relative overflow-hidden rounded-xl aspect-[4/3] shadow-md">
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 ${activeRoom === room.id ? 'opacity-100' : 'opacity-0'}`}
          />
          
          <img
            itemProp="image"
            className="w-full h-full object-cover"
            src={Array.isArray(room.image) ? room.image[1] : room.image}
            alt={`${room.name} room accommodation`}
            loading="lazy"
          />
          
          {room.choice && (
            <div className="absolute top-4 left-4 bg-[#b97a38]/90 text-white backdrop-blur-sm px-3 py-1 rounded-full shadow-sm z-20">
              <span className="text-xs tracking-wider">{room.choice}</span>
            </div>
          )}
          
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <button
              onClick={handleShare}
              aria-label="Share this room"
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white"
            >
              <Share2 size={18} className="text-gray-700" />
            </button>

            <button
              onClick={handleLike}
              aria-label={liked ? "Remove from favorites" : "Add to favorites"}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white"
            >
              <Heart
                size={18}
                className={liked ? "fill-red-500 text-red-500" : "text-gray-700"}
              />
            </button>
          </div>
          
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent h-1/3 z-10 ${activeRoom === room.id ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              <div>
                <div className={activeRoom === room.id ? 'block' : 'hidden'}>
                  <span className="text-xs text-white/80">Discover</span>
                </div>
                <div className={activeRoom === room.id ? 'block' : 'hidden'}>
                  <Link 
                    to={`/room/${room.id}`}
                    className="flex items-center gap-2 text-white font-medium"
                  >
                    <span>View Room Details</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              
              <div className={activeRoom === room.id ? 'block' : 'hidden'}>
                <Link
                  to="/reserve"
                  state={{
                    id: room.id,
                    image: room.image,
                    name: room.name,
                    price: room.price,
                    cardInfo: room.cardInfo,
                    description: room.description,
                    beds: room.beds,
                    size: room.size,
                    guests: room.guests,
                    bathrooms: room.bathrooms,
                    choice: room.choice,
                  }}
                  className="bg-[#b97a38] hover:bg-[#b97a38]/90 text-white px-4 py-2 rounded-lg text-xs font-medium shadow-sm"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px bg-[#b97a38]/30 flex-1"></div>
            <span className="text-xs tracking-widest text-gray-500 uppercase">
              HOTEL HORIZON
            </span>
            <div className="h-px bg-[#b97a38]/30 flex-1"></div>
          </div>
          
          <h2 
            className="text-2xl md:text-3xl font-light text-gray-900 mb-3" 
            itemProp="name"
          >
            {room.name.split(' ').map((word, i, arr) => (
              <React.Fragment key={i}>
                {i === arr.length - 1 ? (
                  <span className="text-[#b97a38] font-medium">{word}</span>
                ) : (
                  <span>{word} </span>
                )}
              </React.Fragment>
            ))}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#b97a38]/10 p-3 rounded-lg">
                <BedDouble size={15} className="text-[#b97a38]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">BEDS</p>
                <p className="font-medium text-xs">{room.beds}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-[#b97a38]/10 p-3 rounded-lg">
                <Users size={15} className="text-[#b97a38]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">GUESTS</p>
                <p className="font-medium text-xs">{room.guests}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-[#b97a38]/10 p-3 rounded-lg">
                <Bath size={15} className="text-[#b97a38]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">BATHROOMS</p>
                <p className="font-medium text-xs">{room.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-[#b97a38]/10 p-3 rounded-lg">
                <MapPin size={15} className="text-[#b97a38]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">SIZE</p>
                <p className="font-medium text-xs">{room.size} m²</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <p 
              className="text-gray-600 line-clamp-3 mb-3 text-xs" 
              itemProp="description"
              dangerouslySetInnerHTML={{ __html: room.description }}
            ></p>
            <Link 
              to={`/room/${room.id}`} 
              className="text-[#b97a38] border border-[#b97a38]/30 py-2 px-4 rounded-full hover:bg-[#b97a38] hover:text-white text-xs font-medium"
            >
              View full details 
              <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
          
          {/* Amenities */}
          {room.facilities && room.facilities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Featured Amenities
              </h3>
              <div className="flex flex-wrap gap-3">
                {room.facilities.slice(0, 4).map((facility, index) => (
                  <div 
                    className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full"
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
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Price and Booking */}
          <div className="mt-4 flex items-center justify-between border-t border-t-[#b97a38]/10 pt-4">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-2xl font-light text-[#b97a38]" itemProp="priceRange">
                {room.price}
                <meta itemProp="priceCurrency" content="USD" />
              </p>
              <p className="text-xs text-gray-500">per night, plus taxes</p>
            </div>
            
            <Link
              to="/reserve"
              state={{
                id: room.id,
                image: room.image,
                name: room.name,
                price: room.price,
                cardInfo: room.cardInfo,
                description: room.description,
                beds: room.beds,
                size: room.size,
                guests: room.guests,
                bathrooms: room.bathrooms,
                choice: room.choice,
              }}
              className="bg-[#b97a38] hover:bg-[#b97a38]/90 text-white px-6 py-3 rounded-lg text-xs font-medium shadow-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <motion.img 
          src={assets.roomsBanner || assets.hero_img1} 
          alt="Luxury Hotel Rooms" 
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        />
        
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <div className="max-w-5xl px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden mb-6"
            >
              <span className="inline-block text-xs tracking-widest font-light bg-[#b97a38]/20 backdrop-blur-sm px-4 py-2 border-l-2 border-[#b97a38] text-white">
                HOTEL HORIZON
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4"
            >
              Our Exceptional <span className="text-[#b97a38] font-medium">Rooms</span>
            </motion.h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-30 h-0.5 bg-white/30 mx-auto mb-6 relative overflow-hidden"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute top-0 left-0 right-0 mx-auto h-full w-15 bg-[#b97a38]"
              />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xs text-white/90 max-w-2xl mx-auto"
            >
              Discover our collection of meticulously designed rooms and suites offering the perfect 
              blend of contemporary elegance and timeless luxury for an unforgettable stay.
            </motion.p>
          </div>
        </div>
        
        {/* Vertical Line with Text */}
        <motion.div 
          className="hidden lg:flex flex-col items-center absolute left-8 top-1/2 -translate-y-1/2 z-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Line before text */}
          <motion.div 
            className="w-px h-8 bg-white/30"
            initial={{ height: 0 }}
            animate={{ height: 32 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          ></motion.div>
          
          {/* Vertical text */}
          <div className="flex flex-col items-center justify-center my-4 text-white/60 text-xs tracking-widest">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >L</motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.5 }}
            >U</motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >X</motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.45, duration: 0.5 }}
            >U</motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >R</motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.55, duration: 0.5 }}
            >Y</motion.span>
            
            <motion.div 
              className="w-px h-4 bg-white/30 my-4"
              initial={{ height: 0 }}
              animate={{ height: 16 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            ></motion.div>
            
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.65, duration: 0.5 }}
            >S</motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >T</motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.75, duration: 0.5 }}
            >A</motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >Y</motion.span>
          </div>
          
          {/* Line after text */}
          <motion.div 
            className="w-px h-8 bg-white/30"
            initial={{ height: 0 }}
            animate={{ height: 32 }}
            transition={{ delay: 1.85, duration: 0.8 }}
          ></motion.div>
        </motion.div>
        
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
      
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
        {/* Filters Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <motion.h2 
                className="text-xs uppercase tracking-widest text-gray-500 mb-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                EXPERIENCE LUXURY
              </motion.h2>
              <motion.h3 
                className="text-xl font-light text-gray-900"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Find Your <span className="text-[#b97a38] font-medium">Perfect Room</span>
              </motion.h3>
            </div>
            
            <motion.div 
              className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={filtersApplied.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 w-full sm:w-60 text-xs focus:outline-none focus:ring-1 focus:ring-[#b97a38] focus:border-[#b97a38]"
                />
                <Search size={14} className="absolute left-3.5 top-2.5 text-gray-400" />
              </div>
              
              <motion.button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter size={14} /> 
                {filterOpen ? "Hide Filters" : "Show Filters"}
                {filterOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </motion.button>
              
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#b97a38] focus:border-[#b97a38]"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </motion.div>
          </div>
          
          {/* Expandable Filters */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 mb-3">Price Range</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-full">
                          <label className="text-xs text-gray-500 mb-1 block">Min</label>
                          <input
                            type="number"
                            min="0"
                            value={filtersApplied.price.min}
                            onChange={(e) => handleFilterChange('price', {
                              ...filtersApplied.price,
                              min: parseInt(e.target.value) || 0
                            })}
                            className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-xs"
                          />
                        </div>
                        <span className="text-gray-400">-</span>
                        <div className="w-full">
                          <label className="text-xs text-gray-500 mb-1 block">Max</label>
                          <input
                            type="number"
                            min={filtersApplied.price.min}
                            value={filtersApplied.price.max}
                            onChange={(e) => handleFilterChange('price', {
                              ...filtersApplied.price,
                              max: parseInt(e.target.value) || 0
                            })}
                            className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Beds */}
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 mb-3">Beds</h4>
                      <select
                        value={filtersApplied.beds || ""}
                        onChange={(e) => handleFilterChange('beds', e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs"
                      >
                        <option value="">Any number of beds</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                      </select>
                    </div>
                    
                    {/* Guests */}
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 mb-3">Guests</h4>
                      <select
                        value={filtersApplied.guests || ""}
                        onChange={(e) => handleFilterChange('guests', e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs"
                      >
                        <option value="">Any number of guests</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="6">6+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <motion.button
                      onClick={resetFilters}
                      className="text-xs text-gray-500 hover:text-gray-700 mr-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reset Filters
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Results Summary */}
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-xs text-gray-500">
              Showing {currentRooms.length} of {displayedRooms.length} rooms
            </p>
            
            {displayedRooms.length === 0 && (
              <motion.button
                onClick={resetFilters}
                className="text-xs text-[#b97a38] font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear all filters
              </motion.button>
            )}
          </motion.div>
        </div>
        
        {/* Rooms Listing */}
        {displayedRooms.length > 0 ? (
          <div className="flex flex-col space-y-16">
            {currentRooms.map((room, index) => (
              <div key={room.id}>
                <EnhancedRoomCard room={room} index={index} />
                
                {index < currentRooms.length - 1 && (
                  <div className="w-full h-px bg-gray-200">
                    <div className="w-24 h-px bg-[#b97a38]/30"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
              </svg>
            </motion.div>
            <motion.h3 
              className="text-lg font-medium text-gray-900 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              No rooms found
            </motion.h3>
            <motion.p 
              className="text-xs text-gray-500 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Try adjusting your search criteria or filters
            </motion.p>
            <motion.button
              onClick={resetFilters}
              className="text-xs font-medium bg-[#b97a38] text-white px-6 py-3 rounded-lg hover:bg-[#b97a38]/90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset All Filters
            </motion.button>
          </motion.div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-xs ${
                  currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.9 } : {}}
              >
                <ChevronUp className="rotate-90 w-4 h-4" />
              </motion.button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-xs ${
                    currentPage === i + 1
                      ? 'bg-[#b97a38] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {i + 1}
                </motion.button>
              ))}
              
              <motion.button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-xs ${
                  currentPage === totalPages 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.9 } : {}}
              >
                <ChevronDown className="rotate-90 w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Room Highlights Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-xs uppercase tracking-widest text-gray-500 mb-1"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              HOTEL HORIZON
            </motion.h2>
            <motion.h3 
              className="text-2xl font-light text-gray-900 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Room <span className="text-[#b97a38] font-medium">Highlights</span>
            </motion.h3>
            <motion.div 
              className="w-24 h-0.5 bg-gray-200 mx-auto mb-6 relative"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]/30"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              ></motion.div>
            </motion.div>
            <motion.p 
              className="text-xs text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Discover the exceptional amenities and features that make our rooms 
              a sanctuary of comfort and elegance for discerning travelers.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 bg-[#b97a38]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#b97a38]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Premium Amenities</h4>
              <p className="text-xs text-gray-600">
                Each room features high-quality linens, complimentary Wi-Fi, and curated toiletries 
                for a truly luxurious experience.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 bg-[#b97a38]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#b97a38]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Personalized Service</h4>
              <p className="text-xs text-gray-600">
                Enjoy 24-hour concierge service, personalized check-in/check-out, and 
                custom room preferences for a tailored stay.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 bg-[#b97a38]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#b97a38]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Prime Location</h4>
              <p className="text-xs text-gray-600">
                All rooms offer stunning views and easy access to both city attractions 
                and peaceful retreats, perfect for any travel purpose.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 container mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-xs uppercase tracking-widest text-gray-500 mb-1"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ANSWERS TO YOUR QUESTIONS
          </motion.h2>
          <motion.h3 
            className="text-2xl font-light text-gray-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Frequently Asked <span className="text-[#b97a38] font-medium">Questions</span>
          </motion.h3>
          <motion.div 
            className="w-24 h-0.5 bg-gray-200 mx-auto mb-6 relative"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]/30"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            ></motion.div>
          </motion.div>
        </div>
        
        <div className="mx-auto divide-y">
          <FaqItem 
            question="What time is check-in and check-out ?"
            answer="Check-in is available from 2:00 PM, and check-out is until 10:00 AM. Early check-in and late check-out can be arranged based on availability for an additional fee."
          />
          <FaqItem 
            question="Do all rooms include breakfast ?"
            answer="Breakfast is included with select room packages. Please check the specific room description or contact our concierge to confirm if breakfast is included with your booking."
          />
          <FaqItem 
            question="Are pets allowed in the rooms ?"
            answer="Pets are not allowed in the Hotel."
          />
          <FaqItem 
            question="Is there a shuttle service from the airport ?"
            answer="Yes, we offer a chargable shuttle service from the airport for all guests at $15 per trip. Please provide your flight details at least 24 hours before arrival so we can arrange your pickup."
          />
        </div>
      </div>
      
      {/* Booking CTA Section */}
      <motion.div 
        className="relative py-20 bg-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 z-0 opacity-30"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        >
          <img 
            src={assets.hero_img2 || assets.hero_img1} 
            alt="Luxury experience" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </motion.div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-12 text-center">
          <motion.h2 
            className="text-xs uppercase tracking-widest text-[#b97a38] mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            LIMITED TIME OFFER
          </motion.h2>
          <motion.h3 
            className="text-3xl md:text-4xl font-light text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Exclusive <span className="text-[#b97a38] font-medium">10% Discount</span> on Your Next Stay
          </motion.h3>
          <motion.p 
            className="text-xs text-white/80 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Book your room before June 30th and enjoy a complimentary upgrade and welcome drink upon arrival.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/reserve"
                className="inline-flex items-center justify-center bg-[#b97a38] hover:bg-[#b97a38]/90 text-white px-8 py-3 rounded-lg text-xs font-medium shadow-lg"
              >
                Book Now and Save
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Subscribe component */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Subscribe />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className="py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <button 
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-sm font-medium text-gray-900">{question}</h4>
        <div className={`ml-2 p-1 rounded-full transition-colors ${isOpen ? 'bg-[#b97a38]/10' : 'bg-gray-100'}`}>
          {isOpen ? (
            <ChevronUp size={14} className={isOpen ? 'text-[#b97a38]' : 'text-gray-500'} />
          ) : (
            <ChevronDown size={14} className={isOpen ? 'text-[#b97a38]' : 'text-gray-500'} />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-gray-600 mt-2 pl-0">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Rooms;
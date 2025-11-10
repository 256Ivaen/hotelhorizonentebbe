import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import Subscribe from "../components/Subscribe";
import { 
  PhoneOutgoing, 
  UtensilsCrossed, 
  MapPinCheck, 
  Clock, 
  Calendar, 
  ChefHat, 
  GlassWater, 
  Users, 
  Star, 
  BookOpen,
  ArrowRight,
  Gift
} from "lucide-react";

const Dining = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <DiningHero />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
        {/* Intro Section */}
        <DiningIntro />
        
        {/* Restaurant Tabs */}
        <RestaurantTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Restaurant Cards */}
        <RestaurantCards activeTab={activeTab} setSelectedRestaurant={setSelectedRestaurant} />
        
        {/* Culinary Experience */}
        <CulinaryExperience />
        
        {/* Menu Highlights */}
        <MenuHighlights />
        
        {/* Meet Our Chefs */}
        <MeetOurChefs />
        
        {/* Private Dining */}
        <PrivateDining />
        
        {/* Special Events */}
        <SpecialEvents />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Reservation CTA */}
        <ReservationCTA />
      </div>
      
      {/* Subscribe Newsletter */}
      {/* <div className="bg-gray-50 py-16">
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
      </div> */}
    </div>
  );
};

// Hero Section Component
const DiningHero = () => {
  return (
    <div className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <motion.img 
        src={assets.sigrestaurant} 
        alt="Luxury Dining Experience" 
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
            Exceptional <span className="text-[#b97a38] font-medium">Culinary</span> Experiences
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
            className="text-sm text-white/90 max-w-2xl mx-auto mb-8"
          >
            Discover a world of exquisite flavors, exceptional service, and unforgettable moments at our award-winning restaurants and bars.
          </motion.p>
          
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#b97a38] text-white text-sm font-medium rounded-md shadow-lg"
            >
              Explore Our Venues
            </motion.button>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};

// Dining Intro Component
const DiningIntro = () => {
  return (
    <motion.div 
      className="mb-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-xs text-[#b97a38] uppercase tracking-wider mb-3">CULINARY EXCELLENCE</h2>
      <h3 className="text-3xl font-light text-gray-900 mb-6">A Journey Through <span className="text-[#b97a38] font-medium">Exquisite Tastes</span></h3>
      
      <div className="w-24 h-0.5 bg-gray-200 mx-auto mb-8 relative">
        <div className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]/30"></div>
      </div>
      
      <p className="text-gray-600 max-w-3xl mx-auto text-sm leading-relaxed">
        At Hotel Horizon, we believe that dining is not just about food; it's about creating memorable experiences. 
        Our culinary team is dedicated to crafting exceptional dishes that celebrate local flavors and global techniques. 
        From casual breakfasts to fine dining experiences, each venue offers a unique atmosphere and menu designed to delight your senses.
      </p>
    </motion.div>
  );
};

// Restaurant Tabs Component
const RestaurantTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "all", label: "All Dining" },
    { id: "restaurants", label: "Restaurants" },
    { id: "bars", label: "Bars & Lounges" },
    { id: "casual", label: "Casual Dining" }
  ];
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-5 py-3 text-xs font-medium rounded-full transition-all ${
            activeTab === tab.id
              ? "bg-[#b97a38] text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

// Restaurant Cards Component
const RestaurantCards = ({ activeTab, setSelectedRestaurant }) => {
  const restaurants = [
    {
      id: "signature",
      name: "The Signature Restaurant",
      type: "restaurants",
      description: "Experience the epitome of fine dining with our award-winning menu featuring locally-sourced ingredients prepared with global techniques.",
      image: assets.sigrestaurant,
      hours: "24/7",
      location: "Main Building, Ground Floor",
      phone: "+256 742 50 50 52",
      cuisine: "Contemporary International",
      featured: true
    },
    {
      id: "panorama",
      name: "Panorama Rooftop",
      type: "restaurants",
      description: "Enjoy breathtaking city views while savoring our contemporary fusion menu and signature cocktails.",
      image: assets.outdoorrestaurant,
      hours: "2:00 PM - 12:00 AM",
      location: "Main Building, Ground Floor",
      phone: "+256 742 50 50 53",
      cuisine: "Bar Bites & Cocktails",
      featured: true
    },
    {
      id: "horizon-bar",
      name: "Horizon Lounge",
      type: "bars",
      description: "Unwind in our elegant lounge with premium spirits, crafted cocktails, and light gourmet bites.",
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069",
      hours: "12:00 PM - 2:00 AM",
      location: "Main Building, Lobby Level",
      phone: "+256 742 50 50 54",
      cuisine: "Bar Bites & Cocktails",
      featured: false
    },
    {
      id: "poolside",
      name: "Poolside Café",
      type: "casual",
      description: "Relax by the pool with refreshing beverages and casual fare perfect for a sunny day.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
      hours: "9:00 AM - 7:00 PM",
      location: "Pool Deck, Level 3",
      phone: "+256 742 50 50 55",
      cuisine: "Light Meals & Refreshments",
      featured: false
    },
    {
      id: "garden-terrace",
      name: "Garden Terrace",
      type: "casual",
      description: "Dine amidst lush greenery with our healthy and organic menu options sourced from local farms.",
      image: "https://images.unsplash.com/photo-1559304822-9eb2813c9844?q=80&w=2070",
      hours: "6:30 AM - 10:00 PM",
      location: "Garden Level",
      phone: "+256 742 50 50 56",
      cuisine: "Organic & Health-focused",
      featured: false
    },
    {
      id: "wine-cellar",
      name: "The Wine Cellar",
      type: "bars",
      description: "Discover our extensive collection of fine wines paired with artisanal cheeses and charcuterie.",
      image: "https://images.unsplash.com/photo-1527751171053-6ac5ec50000b?q=80&w=2070",
      hours: "5:00 PM - 11:00 PM",
      location: "Lower Level, Main Building",
      phone: "+256 742 50 50 57",
      cuisine: "Wine Pairings & Tapas",
      featured: false
    }
  ];
  
  // Filter restaurants based on active tab
  const filteredRestaurants = activeTab === "all" 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.type === activeTab);
  
  // Get featured restaurants for highlighting
  const featuredRestaurants = filteredRestaurants.filter(r => r.featured);
  const regularRestaurants = filteredRestaurants.filter(r => !r.featured);
  
  return (
    <div className="mb-24">
      {/* Featured Restaurants */}
      {featuredRestaurants.length > 0 && (
        <div className="mb-12">
          {featuredRestaurants.map((restaurant, index) => (
            <SignatureRestaurant key={restaurant.id} restaurant={restaurant} index={index} />
          ))}
        </div>
      )}
      
      {/* Regular Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularRestaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-medium text-gray-800">{restaurant.name}</h3>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                  {restaurant.type === "restaurants" ? "Restaurant" : 
                   restaurant.type === "bars" ? "Bar & Lounge" : "Casual Dining"}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{restaurant.description}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center text-xs text-gray-700">
                  <Clock size={14} className="text-[#b97a38] mr-2" />
                  <span>{restaurant.hours}</span>
                </div>
                <div className="flex items-center text-xs text-gray-700">
                  <UtensilsCrossed size={14} className="text-[#b97a38] mr-2" />
                  <span>{restaurant.cuisine}</span>
                </div>
              </div>
              
              <button className="w-full text-[#b97a38] border border-[#b97a38] text-xs font-medium py-2 rounded hover:bg-[#b97a38] hover:text-white transition-colors flex items-center justify-center gap-2">
                View Details
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredRestaurants.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No dining options found in this category.</p>
        </div>
      )}
    </div>
  );
};

// Signature Restaurant Component
const SignatureRestaurant = ({ restaurant, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className="bg-white py-12 px-8 rounded-lg shadow-md mb-8 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-start`}>
        {/* Image Section */}
        <div className="lg:w-1/2 overflow-hidden rounded-lg">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content Section */}
        <div className="lg:w-1/2 flex flex-col">
          <h3 className="text-xs text-[#b97a38] uppercase tracking-wider mb-2">FEATURED VENUE</h3>
          <h1 className="text-3xl font-light text-gray-900 mb-4">
            {restaurant.name.split(' ').map((word, i, arr) => (
              <React.Fragment key={i}>
                {i === arr.length - 1 ? (
                  <span className="text-[#b97a38] font-medium">{word}</span>
                ) : (
                  <span>{word} </span>
                )}
              </React.Fragment>
            ))}
          </h1>
          
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            {restaurant.description}
          </p>
          
          <div className="grid grid-cols-2 gap-px bg-gray-100 rounded-lg mb-6">
            <div className="flex flex-col items-center justify-center p-4 bg-white">
              <Clock size={20} className="text-[#b97a38] mb-2" />
              <p className="text-gray-700 font-medium text-xs text-center">
                <span className="font-semibold block mb-1">HOURS</span>
                <span className="text-xs">{restaurant.hours}</span>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white">
              <MapPinCheck size={20} className="text-[#b97a38] mb-2" />
              <p className="text-gray-700 font-medium text-xs text-center">
                <span className="font-semibold block mb-1">LOCATION</span>
                <span className="text-xs">{restaurant.location}</span>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white">
              <PhoneOutgoing size={20} className="text-[#b97a38] mb-2" />
              <p className="text-gray-700 font-medium text-xs text-center">
                <span className="font-semibold block mb-1">RESERVATIONS</span>
                <span className="text-xs">{restaurant.phone}</span>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white">
              <UtensilsCrossed size={20} className="text-[#b97a38] mb-2" />
              <p className="text-gray-700 font-medium text-xs text-center">
                <span className="font-semibold block mb-1">CUISINE</span>
                <span className="text-xs">{restaurant.cuisine}</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="bg-[#b97a38] text-white font-medium py-3 px-6 rounded text-xs font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reserve a Table
            </motion.button>
            <motion.button
              className="bg-white text-gray-800 font-medium py-3 px-6 rounded border border-gray-300 text-xs font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Menu
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Culinary Experience Component
const CulinaryExperience = () => {
  return (
    <motion.div 
      className="mb-24 py-16 px-8 bg-gray-50 rounded-xl relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#b97a38]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#b97a38]/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xs text-[#b97a38] uppercase tracking-wider mb-3">GASTRONOMY</h2>
          <h3 className="text-3xl font-light text-gray-900 mb-6">The <span className="text-[#b97a38] font-medium">Culinary</span> Experience</h3>
          
          <div className="w-24 h-0.5 bg-gray-200 mx-auto mb-8 relative">
            <div className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]/30"></div>
          </div>
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
              <ChefHat size={20} className="text-[#b97a38]" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Master Chefs</h4>
            <p className="text-sm text-gray-600">
              Our internationally trained culinary team brings experience from Michelin-starred restaurants around the world, crafting dishes that tell a story.
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
              <GlassWater size={20} className="text-[#b97a38]" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Premium Ingredients</h4>
            <p className="text-sm text-gray-600">
              We source the finest local and international ingredients, emphasizing sustainability and partnering with local farmers for freshness.
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
              <BookOpen size={20} className="text-[#b97a38]" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Curated Menus</h4>
            <p className="text-sm text-gray-600">
              Each of our venues features a thoughtfully curated menu that balances classic favorites with innovative creations that change seasonally.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Menu Highlights Component
const MenuHighlights = () => {
  const menuItems = [
    {
      name: "Pan-Seared Scallops",
      description: "Black garlic purée, lemon butter sauce, micro herbs",
      price: "$28",
      category: "appetizer",
      image: "https://images.unsplash.com/photo-1635146037526-a3150ebbe0ac?q=80&w=1974"
    },
    {
      name: "Wagyu Beef Tenderloin",
      description: "Truffle mashed potatoes, seasonal vegetables, red wine reduction",
      price: "$65",
      category: "main",
      image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=2070"
    },
    {
      name: "Deconstructed Chocolate Sphere",
      description: "Warm chocolate sauce, raspberry coulis, gold leaf",
      price: "$18",
      category: "dessert",
      image: "https://images.unsplash.com/photo-1631206753348-db44784f0465?q=80&w=1974"
    },
    {
      name: "Signature Horizon Martini",
      description: "House-infused botanical gin, dry vermouth, olive dust",
      price: "$22",
      category: "beverage",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1857"
    }
  ];
  
  return (
    <motion.div 
      className="mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-xs text-[#b97a38] uppercase tracking-wider mb-3">TASTE SIGNATURES</h2>
        <h3 className="text-3xl font-light text-gray-900 mb-6">Menu <span className="text-[#b97a38] font-medium">Highlights</span></h3>
        
        <div className="w-24 h-0.5 bg-gray-200 mx-auto mb-8 relative">
          <div className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]/30"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
              />
              <div className="absolute top-3 right-3 bg-[#b97a38] text-white text-xs font-medium py-1 px-3 rounded-full capitalize">
                {item.category}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-gray-900 font-medium">{item.name}</h4>
                <span className="text-[#b97a38] font-semibold">{item.price}</span>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <motion.button
          className="inline-flex items-center gap-2 text-[#b97a38] border border-[#b97a38] text-xs font-medium py-3 px-6 rounded-full hover:bg-[#b97a38] hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Full Menus
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Meet Our Chefs Component
const MeetOurChefs = () => {
  const chefs = [
    {
      name: "Chef Daniel Moreau",
      title: "Executive Chef",
      bio: "With over 20 years of experience in luxury establishments across Europe and Asia, Chef Daniel brings his passion for innovative cuisine to Hotel Horizon.",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1954"
    },
    {
      name: "Chef Amara Okafor",
      title: "Head Pastry Chef",
      bio: "Trained in Paris, Chef Amara combines classic techniques with African flavors to create unique and memorable dessert experiences.",
      image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2080"
    },
    {
      name: "Chef Hiroshi Tanaka",
      title: "Specialty Chef - Asian Cuisine",
      bio: "Master of Japanese culinary arts, Chef Hiroshi specializes in authentic Asian flavors with a contemporary presentation.",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=1974"
    }
  ];
  
  return (
    <motion.div 
      className="mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-xs text-[#b97a38] uppercase tracking-wider mb-3">CULINARY TEAM</h2>
        <h3 className="text-3xl font-light text-gray-900 mb-6">Meet Our <span className="text-[#b97a38] font-medium">Chefs</span></h3>
        
        <div className="w-24 h-0.5 bg-gray-200 mx-auto mb-8 relative">
          <div className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]/30"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {chefs.map((chef, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={chef.image} 
                alt={chef.name} 
                className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-700"
              />
            </div>
            
            <div className="p-6">
              <h4 className="text-xl font-medium text-gray-900">{chef.name}</h4>
              <p className="text-[#b97a38] text-sm mb-3">{chef.title}</p>
              <p className="text-gray-600 text-sm">{chef.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Private Dining Component
const PrivateDining = () => {
  return (
    <motion.div 
      className="mb-24 bg-gray-900 rounded-xl overflow-hidden relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070" 
          alt="Private Dining" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
      </div>
      
      <div className="relative z-10 py-16 px-8 md:px-16 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-xs text-[#b97a38] uppercase tracking-wider mb-3">EXCLUSIVE EXPERIENCE</h2>
          <h3 className="text-3xl font-light text-white mb-6">Private <span className="text-[#b97a38] font-medium">Dining</span></h3>
          
          <div className="w-24 h-0.5 bg-white/20 mb-6 relative">
            <div className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]/50"></div>
          </div>
          
          <p className="text-white/80 text-sm mb-8 leading-relaxed">
            Experience the height of culinary luxury with our private dining options. Whether you're celebrating a special occasion or hosting an important business dinner, our dedicated team will create a personalized experience in an elegant, secluded setting.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#b97a38]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#b97a38]"></div>
              </div>
              <div>
                <h4 className="text-white text-sm font-medium">Chef's Table</h4>
                <p className="text-white/70 text-xs">An interactive dining experience with our executive chef.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#b97a38]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#b97a38]"></div>
              </div>
              <div>
                <h4 className="text-white text-sm font-medium">Wine Cellar</h4>
                <p className="text-white/70 text-xs">Dine surrounded by our collection of fine wines for an intimate experience.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#b97a38]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#b97a38]"></div>
              </div>
              <div>
                <h4 className="text-white text-sm font-medium">Rooftop Private Room</h4>
                <p className="text-white/70 text-xs">Breathtaking views paired with exclusive service for up to 20 guests.</p>
              </div>
            </div>
          </div>
          
          <motion.button
            className="bg-[#b97a38] text-white text-xs font-medium py-3 px-6 rounded-md hover:bg-[#b97a38]/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Inquire About Private Dining
          </motion.button>
        </div>
        
        <div className="md:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=2070" 
              alt="Private Dining Room" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Special Events Component
const SpecialEvents = () => {
  const events = [
    {
      title: "Wine Tasting Evenings",
      description: "Join our sommelier for a guided tasting of premium wines paired with chef-selected bites.",
      day: "Fridays",
      time: "7:00 PM - 9:00 PM",
      location: "The Wine Cellar",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070"
    },
    {
      title: "Sunday Brunch",
      description: "Indulge in our lavish brunch spread featuring live cooking stations and free-flowing champagne.",
      day: "Sundays",
      time: "11:30 AM - 3:00 PM",
      location: "The Signature Restaurant",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965"
    },
    {
      title: "Seasonal Tasting Menu",
      description: "Experience our executive chef's seasonal tasting menu showcasing the finest local produce.",
      day: "Daily",
      time: "6:30 PM - 10:00 PM",
      location: "Panorama Rooftop",
      image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070"
    }
  ];
  
  return (
    <motion.div 
      className="mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-xs text-[#b97a38] uppercase tracking-wider mb-3">CULINARY CALENDAR</h2>
        <h3 className="text-3xl font-light text-gray-900 mb-6">Special <span className="text-[#b97a38] font-medium">Events</span></h3>
        
        <div className="w-24 h-0.5 bg-gray-200 mx-auto mb-8 relative">
          <div className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]/30"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-48 overflow-hidden relative group">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                <button className="text-white text-xs bg-[#b97a38] py-2 px-4 rounded-full hover:bg-[#b97a38]/90">
                  Book Now
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="text-xl font-medium text-gray-900 mb-2">{event.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#b97a38]" />
                  <span className="text-gray-700">{event.day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#b97a38]" />
                  <span className="text-gray-700">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinCheck size={16} className="text-[#b97a38]" />
                  <span className="text-gray-700">{event.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <motion.button
          className="inline-flex items-center gap-2 bg-white text-[#b97a38] border border-[#b97a38] text-xs font-medium py-3 px-6 rounded-full hover:bg-[#b97a38] hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Events
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      quote: "An exceptional dining experience. The signature tasting menu was a culinary journey we'll never forget.",
      author: "James & Sarah Thompson",
      location: "United Kingdom",
      rating: 5
    },
    {
      quote: "The private dining room was perfect for our anniversary celebration. The chef's personalized menu made the evening truly special.",
      author: "Michael Rodriguez",
      location: "United States",
      rating: 5
    },
    {
      quote: "The rooftop restaurant offers breathtaking views paired with incredible food. A must-visit when in the city.",
      author: "Aisha Nkosi",
      location: "South Africa",
      rating: 5
    }
  ];
  
  return (
    <motion.div 
      className="mb-24 bg-gray-50 py-16 px-8 rounded-xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-xs text-[#b97a38] uppercase tracking-wider mb-3">GUEST EXPERIENCES</h2>
        <h3 className="text-3xl font-light text-gray-900 mb-6">What Our <span className="text-[#b97a38] font-medium">Guests Say</span></h3>
        
        <div className="w-24 h-0.5 bg-gray-200 mx-auto mb-8 relative">
          <div className="absolute top-0 left-0 h-full w-12 bg-[#b97a38]/30"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-[#b97a38] fill-[#b97a38]" />
              ))}
            </div>
            
            <p className="text-gray-600 text-sm italic mb-6">"{testimonial.quote}"</p>
            
            <div>
              <p className="text-gray-900 font-medium text-sm">{testimonial.author}</p>
              <p className="text-gray-500 text-xs">{testimonial.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Reservation CTA Component
const ReservationCTA = () => {
  return (
    <motion.div 
      className="mb-12 bg-[#b97a38] rounded-xl overflow-hidden relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=2070" 
          alt="Dining Reservation" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 py-12 px-8 flex flex-col items-center text-center">
        <div className="max-w-2xl mx-auto">
          <Gift size={32} className="text-white/80 mx-auto mb-4" />
          
          <h2 className="text-3xl font-light text-white mb-4">Reserve Your <span className="font-medium">Table</span></h2>
          
          <p className="text-white/80 text-sm mb-8">
            Experience the exceptional flavors and impeccable service at Hotel Horizon's dining destinations. Reserve your table today for an unforgettable culinary journey.
          </p>
          
          <motion.button
            className="bg-white text-[#b97a38] text-xs font-medium py-3 px-8 rounded-md hover:bg-white/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Make a Reservation
          </motion.button>
          
          <p className="text-white/60 text-xs mt-4">
            For assistance, please call +256 742 50 50 50
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dining;
import React, { useState, useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { assets } from "../assets/assets";
import "react-phone-number-input/style.css";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Reserve = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [extras, setExtras] = useState({
    airportPick: false,
    airportDrop: false,
    halfBoard: false,
    fullBoard: false,
  });
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedRoomData, setSelectedRoomData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");
  const [roomError, setRoomError] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  
  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: 30, transition: { duration: 0.4, ease: "easeIn" } }
  };
  
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);
  
  const {
    id,
    image,
    name,
    price,
    description,
    beds,
    size,
    guests,
    bathrooms,
    choice,
  } = location.state || {};

  const roomTypes = [
    { id: "singleRoom", maxGuests: 1 },
    { id: "standardRoom", maxGuests: 2 },
    { id: "twinRoom", maxGuests: 2 },
    { id: "deluxeRoom", maxGuests: 2 },
    { id: "familySuite", maxGuests: 4 },
    { id: "suite", maxGuests: 2 },
  ];

  const getMaxGuests = (roomId) => {
    const room = roomTypes.find((r) => r.id === roomId);
    return room ? room.maxGuests : 0;
  };

  const calculateOccupancySurcharge = () => {
    if (!selectedRoomType || selectedRoomType === "familySuite") return 0;
    
    const totalGuests = adults + children;
    
    // Apply $20 surcharge for standard, twin, deluxe, and suite rooms when guests > 1
    if ((selectedRoomType === "standardRoom" || 
         selectedRoomType === "twinRoom" || 
         selectedRoomType === "deluxeRoom" || 
         selectedRoomType === "suite") && totalGuests > 1) {
      return 20;
    }
    
    // Apply $20 surcharge for single room when guests > 1
    if (selectedRoomType === "singleRoom" && totalGuests > 1) {
      return 20;
    }
    
    return 0;
  };

  useEffect(() => {
    if (selectedRoomType) {
      const maxGuests = getMaxGuests(selectedRoomType);
      const totalGuests = adults + children;

      if (totalGuests > maxGuests) {
        if (adults <= maxGuests) {
          setChildren(maxGuests - adults);
        } else {
          setAdults(Math.min(adults, maxGuests));
          setChildren(0);
        }
      }
    }
  }, [selectedRoomType, adults, children]);

  useEffect(() => {
    if (id) {
      setSelectedRoomType(id);
      setSelectedRoomData({
        id,
        image,
        name,
        price,
        description,
        beds,
        size,
        guests,
        bathrooms,
        choice,
      });
    }
  }, [id, image, name, price, description, beds, size, guests, bathrooms, choice]);

  useEffect(() => {
    if (checkIn && checkOut && checkOut <= checkIn) {
      setCheckOut(null);
      setDateError("Check-out date must be after check-in date");
    } else {
      setDateError("");
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  useEffect(() => {
    if (submitSuccess) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      setConfirmationNumber(`HH${dateStr}${randomNum}`);
    }
  }, [submitSuccess]);

  const getCurrentRoomPrice = () => {
    if (selectedRoomData) {
      return selectedRoomData.price
        ? parseFloat(selectedRoomData.price.replace(/[^0-9.]/g, ""))
        : 0;
    }
    return 0;
  };

  const pricePerNight = getCurrentRoomPrice();

  const extrasPrices = {
    airportPick: 15,
    airportDrop: 15,
    halfBoard: 15,
    fullBoard: 30,
  };

  const totalNights = checkIn && checkOut
    ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    : 0;

  const totalPrice = totalNights * pricePerNight;
  const occupancySurcharge = calculateOccupancySurcharge();

  const extrasTotal = Object.keys(extras).reduce((sum, key) => {
    if (extras[key]) {
      return sum + (key === "halfBoard" || key === "fullBoard"
        ? extrasPrices[key] * totalNights
        : extrasPrices[key]);
    }
    return sum;
  }, 0);

  const finalPrice = totalPrice + extrasTotal + occupancySurcharge;

  const handleExtraChange = (extra) => {
    setExtras((prevExtras) => {
      const newExtras = { ...prevExtras, [extra]: !prevExtras[extra] };
      if (extra === "halfBoard" && newExtras.halfBoard) {
        newExtras.fullBoard = false;
      } else if (extra === "fullBoard" && newExtras.fullBoard) {
        newExtras.halfBoard = false;
      }
      return newExtras;
    });
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setPhoneError(!value || !/^\+/.test(value) ? "Please enter a valid phone number" : "");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailError(emailRegex.test(value) ? "" : "Please enter a valid email address");
  };

  const handleFirstNameChange = (value) => {
    setFirstName(value);
    setFirstNameError(value ? "" : "First name is required");
  };

  const handleLastNameChange = (value) => {
    setLastName(value);
    setLastNameError(value ? "" : "Last name is required");
  };

  const selectRoom = (room) => {
    setSelectedRoomType(room.id);
    setSelectedRoomData({
      id: room.id,
      image: room.image,
      name: room.name,
      price: room.price,
      description: room.description,
      beds: room.beds,
      size: room.size,
      guests: room.guests,
      bathrooms: room.bathrooms,
      choice: room.choice || "Selected Room",
    });
    setRoomError("");
  };

  const handleResetSelection = () => {
    setSelectedRoomType(null);
    setSelectedRoomData(null);
  };

  const generateAdultOptions = () => {
    const maxGuests = selectedRoomType ? getMaxGuests(selectedRoomType) : 1;
    return Array.from({ length: maxGuests }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1} Adult{i + 1 > 1 ? "s" : ""}
      </option>
    ));
  };

  const generateChildrenOptions = () => {
    const maxGuests = selectedRoomType ? getMaxGuests(selectedRoomType) : 1;
    const remainingSlots = maxGuests - adults;
    return Array.from({ length: remainingSlots + 1 }, (_, i) => (
      <option key={i} value={i}>
        {i} Child{i !== 1 ? "ren" : ""}
      </option>
    ));
  };

  const handleAdultsChange = (e) => {
    const newAdults = parseInt(e.target.value);
    setAdults(newAdults);
    const maxGuests = getMaxGuests(selectedRoomType);
    if (newAdults + children > maxGuests) {
      setChildren(maxGuests - newAdults);
    }
  };

  const goToNextStep = () => {
    if (currentStep === 1 && !selectedRoomData) {
      setRoomError("Please select a room");
      return;
    } else if (currentStep === 2) {
      if (!checkIn || !checkOut) {
        setDateError("Please select both check-in and check-out dates");
        return;
      }
      if (checkOut <= checkIn) {
        setDateError("Check-out date must be after check-in date");
        return;
      }
    } else if (currentStep === 3) {
      if (!firstName || !lastName || !email || !phoneNumber || emailError || phoneError) {
        if (!firstName) setFirstNameError("First name is required");
        if (!lastName) setLastNameError("Last name is required");
        if (!email) setEmailError("Email is required");
        if (!phoneNumber) setPhoneError("Phone number is required");
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !phoneNumber || !checkIn || !checkOut || !selectedRoomData) {
      setSubmitError("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const confirmationNum = confirmationNumber || `HH${Date.now()}`;
      setConfirmationNumber(confirmationNum);

      const formData = {
        confirmationNumber: confirmationNum,
        firstName,
        lastName,
        email,
        phoneNumber,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        room: selectedRoomData.name,
        adults,
        children,
        nights: totalNights,
        price: pricePerNight,
        totalPrice,
        extras,
        extrasTotal,
        occupancySurcharge,
        finalPrice,
        specialRequests: specialRequests || "None"
      };

      const response = await axios.post('https://api.hotelhorizonug.com/reserve.php', formData);

      if (response.data.success) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(response.data.message || "Failed to submit reservation");
      }
    } catch (error) {
      console.error("Reservation error:", error);
      setSubmitError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const RoomTypeCard = ({ room }) => (
    <motion.div
      whileHover={{ y: -8 }}
      className="flex flex-col md:flex-row overflow-hidden rounded-xl border bg-white text-gray-900 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => selectRoom(room)}
    >
      <div className="md:w-2/5 w-full h-56 md:h-auto overflow-hidden">
        <img
          src={room.image?.[0]}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center p-6 md:w-3/5 space-y-2">
        <span className="text-xs bg-[#b97a38]/10 text-[#b97a38] px-3 py-1 rounded-full font-medium inline-block w-fit">
          {room.choice || "Room"}
        </span>
        <h3 className="text-xl font-bold tracking-tight">{room.name}</h3>
        
        <div className="flex items-center text-gray-600 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Up to {room.guests} Guests</span>
        </div>

        <div className="flex items-center pt-2 text-gray-600">
          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center">
              <img src={assets.bedsIcon} alt="beds" className="w-4 h-4 mr-1" />
              {room.beds}
            </span>
            <span className="flex items-center">
              <img src={assets.bathroomIcon} alt="bathrooms" className="w-4 h-4 mr-1" />
              {room.bathrooms}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xl font-bold text-[#b97a38]">{room.price}</p>
          <p className="text-xs text-gray-500">per night</p>
        </div>
      </div>
    </motion.div>
  );

  const ProgressIndicator = () => (
    <div className="relative pt-4 pb-12">
      <div className="flex justify-between items-center">
        {[1, 2, 3, 4].map((step, index) => (
          <div 
            key={step} 
            className="relative flex flex-1 items-center last:flex-none"
          >
            <div className={`flex items-center ${index === 3 ? '' : 'flex-1'}`}>
              <div 
                className={`flex justify-center items-center shrink-0 rounded-full font-semibold w-10 h-10 text-sm border-2 transition-all duration-300 ${
                  step < currentStep 
                    ? "bg-[#b97a38] text-white border-[#b97a38]" 
                    : step === currentStep 
                    ? "bg-[#b97a38] text-white border-[#b97a38]" 
                    : "bg-gray-100 text-gray-500 border-gray-200"
                }`}
              >
                {step < currentStep ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="font-semibold">{step}</span>
                )}
              </div>
              {index < 3 && (
                <div className={`flex-1 h-0.5 mx-3 transition-all duration-300 ${
                  step < currentStep ? "bg-[#b97a38]" : "bg-gray-200"
                }`}></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3">
        <span className="text-xs font-medium text-gray-600">Room</span>
        <span className="text-xs font-medium text-gray-600">Dates</span>
        <span className="text-xs font-medium text-gray-600">Details</span>
        <span className="text-xs font-medium text-gray-600">Confirm</span>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen" ref={formRef}>
      <div className="pt-24 pb-16 bg-[#b97a38] text-white text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            Book Your <span className="font-semibold">Perfect Stay</span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto px-4 text-sm">
            Complete your reservation in a few simple steps to secure your perfect getaway at Hotel Horizon
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10 -mt-10 relative z-10">
        <div >
          {!submitSuccess ? (
            <>
              <ProgressIndicator />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={formVariants}
                  className="min-h-[450px]"
                >
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-light text-gray-900 mb-3">
                          Select Your <span className="text-[#b97a38] font-semibold">Room</span>
                        </h2>
                        <p className="text-xs text-gray-600 max-w-2xl mx-auto">
                          Choose from our carefully curated selection of rooms, each designed to provide comfort and luxury during your stay.
                        </p>
                      </div>

                      {!selectedRoomData && !id && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {assets.roomItem.map((room) => (
                            <RoomTypeCard key={room.id} room={room} />
                          ))}
                        </div>
                      )}

                      {selectedRoomData && (
                        <div className="space-y-6">
                          <div >
                            <div className="flex flex-col lg:flex-row gap-6">
                              <div className="lg:w-2/5">
                                <img
                                  className="w-full h-[250px] lg:h-[200px] object-cover rounded-lg"
                                  src={selectedRoomData.image?.[0]}
                                  alt={selectedRoomData.name}
                                />
                              </div>
                              <div className="lg:w-3/5 flex flex-col justify-between">
                                <div>
                                  <span className="inline-block px-3 py-1.5 text-xs bg-[#b97a38]/10 text-[#b97a38] rounded-full font-medium mb-3">
                                    {selectedRoomData.choice || "Selected Room"}
                                  </span>
                                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {selectedRoomData.name}
                                  </h3>
                                  
                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                                      <img src={assets.bedsIcon} alt="beds" className="w-5 h-5 mx-auto mb-1" />
                                      <p className="text-xs text-gray-500 uppercase tracking-wide">BEDS</p>
                                      <p className="text-sm font-semibold text-gray-900">{selectedRoomData.beds}</p>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                                      <img src={assets.guestIcon} alt="guests" className="w-5 h-5 mx-auto mb-1" />
                                      <p className="text-xs text-gray-500 uppercase tracking-wide">GUESTS</p>
                                      <p className="text-sm font-semibold text-gray-900">{selectedRoomData.guests}</p>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                                      <img src={assets.bathroomIcon} alt="bathrooms" className="w-5 h-5 mx-auto mb-1" />
                                      <p className="text-xs text-gray-500 uppercase tracking-wide">BATHROOM</p>
                                      <p className="text-sm font-semibold text-gray-900">{selectedRoomData.bathrooms}</p>
                                    </div>
                                    <div className="text-center p-3 bg-[#b97a38]/5 rounded-lg border border-[#b97a38]/20">
                                      <div className="w-5 h-5 mx-auto mb-1 bg-[#b97a38] rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">$</span>
                                      </div>
                                      <p className="text-xs text-gray-500 uppercase tracking-wide">PRICE</p>
                                      <p className="text-sm font-bold text-[#b97a38]">{selectedRoomData.price}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selectedRoomData.description && (
                              <div className="mt-6 pt-6 border-t border-gray-200">
                                <div
                                  className={`text-xs text-gray-600 leading-relaxed ${
                                    isExpanded ? "max-h-none" : "max-h-20 overflow-hidden"
                                  }`}
                                  dangerouslySetInnerHTML={{
                                    __html: selectedRoomData.description,
                                  }}
                                />
                                {selectedRoomData.description.length > 200 && (
                                  <button
                                    className="mt-3 px-5 py-2 bg-white border border-[#b97a38] rounded-full text-xs text-[#b97a38] transition-colors duration-300 block mx-auto font-medium z-50 relative"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsExpanded((prev) => !prev);
                                    }}
                                  >
                                    {isExpanded ? "Show Less" : "Read More"}
                                  </button>
                                )}
                              </div>
                            )}
                            
                            {!id && (
                              <div className="text-center mt-6 pt-5 border-t border-gray-200">
                                <button
                                  onClick={handleResetSelection}
                                  className="text-xs text-[#b97a38] font-medium transition-colors"
                                >
                                  Change Room Selection
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {roomError && (
                        <div className="text-center">
                          <p className="text-xs text-red-500 bg-red-50 py-2 px-4 rounded-lg inline-block">{roomError}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-light text-gray-900 mb-3">
                          Choose Your <span className="text-[#b97a38] font-semibold">Dates</span>
                        </h2>
                        <p className="text-xs text-gray-600 max-w-2xl mx-auto">
                          Select your check-in and check-out dates, and let us know how many guests will be joining you.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Check-in Date <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Flatpickr
                              options={{
                                minDate: "today",
                                dateFormat: "D, d M Y",
                                disableMobile: true,
                              }}
                              value={checkIn}
                              onChange={(selectedDates) => setCheckIn(selectedDates[0])}
                              placeholder="Select check-in date"
                              className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none transition-all duration-200 bg-white"
                              required
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Check-out Date <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Flatpickr
                              options={{
                                minDate: checkIn ? new Date(checkIn).fp_incr(1) : "today",
                                dateFormat: "D, d M Y",
                                disableMobile: true,
                              }}
                              value={checkOut}
                              onChange={(selectedDates) => setCheckOut(selectedDates[0])}
                              placeholder="Select check-out date"
                              className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none transition-all duration-200 bg-white"
                              required
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {dateError && (
                        <div className="text-center">
                          <p className="text-xs text-red-500 bg-red-50 py-2 px-4 rounded-lg inline-block">{dateError}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Adults <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none transition-all duration-200 bg-white"
                            value={adults}
                            onChange={handleAdultsChange}
                            disabled={!selectedRoomType}
                          >
                            {generateAdultOptions()}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Children
                          </label>
                          <select
                            className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none transition-all duration-200 bg-white"
                            value={children}
                            onChange={(e) => setChildren(parseInt(e.target.value))}
                            disabled={!selectedRoomType}
                          >
                            {generateChildrenOptions()}
                          </select>
                        </div>
                      </div>

                      {occupancySurcharge > 0 && (
                        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                          <p className="text-xs text-amber-800">
                            <span className="font-semibold">Note:</span> A double occupancy surcharge of ${occupancySurcharge} will be applied to your booking for multiple guests.
                          </p>
                        </div>
                      )}

                      {checkIn && checkOut && totalNights > 0 && (
                        <div className="mt-8 bg-[#b97a38]/5 p-6 rounded-xl border border-[#b97a38]/20">
                          <h3 className="font-semibold text-base text-gray-900 mb-4 text-center">Stay Summary</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="bg-white p-3 rounded-lg">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Check-in</p>
                                <p className="font-semibold text-xs text-gray-900">{checkIn.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="bg-white p-3 rounded-lg">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Check-out</p>
                                <p className="font-semibold text-xs text-gray-900">{checkOut.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="bg-[#b97a38] p-3 rounded-lg">
                                <p className="text-xs text-white/80 uppercase tracking-wide mb-1">Length of Stay</p>
                                <p className="font-semibold text-xs text-white">{totalNights} {totalNights === 1 ? 'Night' : 'Nights'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-light text-gray-900 mb-3">
                          Your <span className="text-[#b97a38] font-semibold">Details</span>
                        </h2>
                        <p className="text-xs text-gray-600 max-w-2xl mx-auto">
                          Please provide your contact information and any special requirements for your stay.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={firstName}
                              onChange={(e) => handleFirstNameChange(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-xl text-xs pr-10 focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none transition-all duration-200 bg-white"
                              required
                            />
                            {(firstNameError || firstName) && (
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <img
                                  src={firstNameError ? assets.invalid : assets.valid}
                                  alt="validation status"
                                  className="w-4 h-4"
                                />
                              </div>
                            )}
                          </div>
                          {firstNameError && (
                            <p className="text-xs text-red-500 mt-1">{firstNameError}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => handleLastNameChange(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-xl text-xs pr-10 focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none transition-all duration-200 bg-white"
                              required
                            />
                            {(lastNameError || lastName) && (
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <img
                                  src={lastNameError ? assets.invalid : assets.valid}
                                  alt="validation status"
                                  className="w-4 h-4"
                                />
                              </div>
                            )}
                          </div>
                          {lastNameError && (
                            <p className="text-xs text-red-500 mt-1">{lastNameError}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              value={email}
                              onChange={handleEmailChange}
                              className="w-full p-3 border border-gray-300 rounded-xl text-xs pr-10 focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none transition-all duration-200 bg-white"
                              required
                            />
                            {(emailError || email) && (
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <img
                                  src={emailError ? assets.invalid : assets.valid}
                                  alt="validation status"
                                  className="w-4 h-4"
                                />
                              </div>
                            )}
                          </div>
                          {emailError && (
                            <p className="text-xs text-red-500 mt-1">{emailError}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <PhoneInput
                              international
                              defaultCountry="UG"
                              value={phoneNumber}
                              onChange={handlePhoneChange}
                              className="w-full focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none transition-all duration-200"
                              inputClassName="w-full p-3 border border-gray-300 rounded-xl text-xs pr-10 focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none bg-white"
                              required
                            />
                            {(phoneError || phoneNumber) && (
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <img
                                  src={phoneError ? assets.invalid : assets.valid}
                                  alt="validation status"
                                  className="w-4 h-4"
                                />
                              </div>
                            )}
                          </div>
                          {phoneError && (
                            <p className="text-xs text-red-500 mt-1">{phoneError}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#b97a38] focus:border-[#b97a38] outline-none transition-all duration-200 h-28 bg-white resize-none"
                          placeholder="Let us know if you have any special requirements for your stay..."
                        ></textarea>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Enhance Your Stay</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {Object.entries({
                            airportPick: { label: "Airport Pick-up", desc: "From Entebbe International Airport", price: extrasPrices.airportPick },
                            airportDrop: { label: "Airport Drop-off", desc: "To Entebbe International Airport", price: extrasPrices.airportDrop },
                            halfBoard: { label: "Half Board", desc: "Breakfast and dinner included", price: `${extrasPrices.halfBoard}/night` },
                            fullBoard: { label: "Full Board", desc: "Breakfast, lunch and dinner included", price: `${extrasPrices.fullBoard}/night` }
                          }).map(([key, { label, desc, price }]) => (
                            <label
                              key={key}
                              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                extras[key] 
                                  ? "border-[#b97a38] bg-[#b97a38]/5" 
                                  : "border-gray-200"
                              }`}
                              onClick={() => handleExtraChange(key)}
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-[#b97a38] border-gray-300 rounded focus:ring-[#b97a38]"
                                checked={extras[key]}
                                readOnly
                              />
                              <div className="ml-4 flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="text-sm font-semibold text-gray-900">{label}</span>
                                    <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
                                  </div>
                                  <span className="text-base font-bold text-[#b97a38]">${price}</span>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-light text-gray-900 mb-3">
                          Confirm Your <span className="text-[#b97a38] font-semibold">Reservation</span>
                        </h2>
                        <p className="text-xs text-gray-600 max-w-2xl mx-auto">
                          Please review your booking details below and confirm your reservation to complete the process.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-base text-gray-900 mb-4">Reservation Details</h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 mb-6">
                          <div className="space-y-0.5">
                            <h4 className="text-xs text-gray-500 uppercase tracking-wide font-medium">Room</h4>
                            <p className="font-semibold text-sm text-gray-900">{selectedRoomData.name}</p>
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-xs text-gray-500 uppercase tracking-wide font-medium">Stay Duration</h4>
                            <p className="font-semibold text-sm text-gray-900">{totalNights} {totalNights === 1 ? 'Night' : 'Nights'}</p>
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-xs text-gray-500 uppercase tracking-wide font-medium">Check-in</h4>
                            <p className="font-semibold text-sm text-gray-900">{checkIn.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-xs text-gray-500 uppercase tracking-wide font-medium">Check-out</h4>
                            <p className="font-semibold text-sm text-gray-900">{checkOut.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-xs text-gray-500 uppercase tracking-wide font-medium">Guests</h4>
                            <p className="font-semibold text-sm text-gray-900">{adults} Adult{adults !== 1 ? 's' : ''}, {children} Child{children !== 1 ? 'ren' : ''}</p>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                          <h3 className="font-semibold text-base text-gray-900 mb-4">Guest Information</h3>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 mb-6">
                            <div className="space-y-0.5">
                              <h4 className="text-xs text-gray-500 uppercase tracking-wide font-medium">Name</h4>
                              <p className="font-semibold text-sm text-gray-900">{firstName} {lastName}</p>
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-xs text-gray-500 uppercase tracking-wide font-medium">Email</h4>
                              <p className="font-semibold text-sm text-gray-900">{email}</p>
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-xs text-gray-500 uppercase tracking-wide font-medium">Phone</h4>
                              <p className="font-semibold text-sm text-gray-900">{phoneNumber}</p>
                            </div>
                            {specialRequests && (
                              <div className="lg:col-span-2 space-y-0.5">
                                <h4 className="text-xs text-gray-500 uppercase tracking-wide font-medium">Special Requests</h4>
                                <p className="font-semibold text-sm text-gray-900">{specialRequests}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {Object.values(extras).some(val => val) && (
                          <div className="border-t border-gray-200 pt-6">
                            <h3 className="font-semibold text-base text-gray-900 mb-4">Additional Services</h3>
                            <div className="bg-white p-4 rounded-lg border border-gray-100">
                              <ul className="space-y-3">
                                {extras.airportPick && (
                                  <li className="flex justify-between items-center">
                                    <span className="text-xs text-gray-900 font-medium">Airport Pick-up</span>
                                    <span className="text-sm font-semibold text-[#b97a38]">${extrasPrices.airportPick}</span>
                                  </li>
                                )}
                                {extras.airportDrop && (
                                  <li className="flex justify-between items-center">
                                    <span className="text-xs text-gray-900 font-medium">Airport Drop-off</span>
                                    <span className="text-sm font-semibold text-[#b97a38]">${extrasPrices.airportDrop}</span>
                                  </li>
                                )}
                                {extras.halfBoard && (
                                  <li className="flex justify-between items-center">
                                    <span className="text-xs text-gray-900 font-medium">Half Board ({totalNights} {totalNights === 1 ? 'night' : 'nights'})</span>
                                    <span className="text-sm font-semibold text-[#b97a38]">${extrasPrices.halfBoard * totalNights}</span>
                                  </li>
                                )}
                                {extras.fullBoard && (
                                  <li className="flex justify-between items-center">
                                    <span className="text-xs text-gray-900 font-medium">Full Board ({totalNights} {totalNights === 1 ? 'night' : 'nights'})</span>
                                    <span className="text-sm font-semibold text-[#b97a38]">${extrasPrices.fullBoard * totalNights}</span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        )}

                        <div className="border-t border-gray-200 pt-6">
                          <h3 className="font-semibold text-base text-gray-900 mb-4">Price Summary</h3>
                          <div className="bg-white p-4 rounded-lg border border-gray-100 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-900">Room Rate ({totalNights} {totalNights === 1 ? 'night' : 'nights'})</span>
                              <span className="font-semibold text-sm text-gray-900">${pricePerNight.toFixed(2)} x {totalNights} = ${totalPrice.toFixed(2)}</span>
                            </div>
                            {occupancySurcharge > 0 && (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-900">Double Occupancy Surcharge</span>
                                <span className="font-light text-sm text-gray-900">${occupancySurcharge.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-900">Additional Services</span>
                              <span className="font-light text-sm text-gray-900">${extrasTotal.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between items-center">
                              <span className="text-base font-semibold text-gray-900">Total</span>
                              <span className="text-xl font-semibold text-[#b97a38]">${finalPrice.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-600 mt-6 p-3 bg-gray-50 rounded-lg">
                          <p className="mb-1">All prices include VAT and local taxes.</p>
                          <p>By proceeding with this booking, you agree to our Terms and Conditions and Privacy Policy.</p>
                        </div>

                        {submitError && (
                          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-6 text-xs">
                            {submitError}
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className={`w-full bg-[#b97a38] text-white py-3 px-6 rounded-lg font-semibold text-sm flex items-center justify-center mt-6 transition-all duration-300 ${
                            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing Reservation...
                            </>
                          ) : (
                            "Confirm Reservation"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex justify-between items-center">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="px-6 py-2.5 border-2 border-gray-300 rounded-lg text-xs text-gray-700 transition-all duration-300 flex items-center font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                {currentStep < totalSteps && (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="px-6 py-2.5 bg-[#b97a38] text-white rounded-lg transition-all duration-300 flex items-center font-semibold text-xs"
                  >
                    {currentStep === 3 ? "Review Booking" : "Continue"}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-12"
            >
              <div className="bg-green-50 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">
                Booking <span className="text-[#b97a38] font-semibold">Confirmed</span>
              </h2>
              <p className="text-xs text-gray-600 mb-6 max-w-lg mx-auto">
                Your reservation at Hotel Horizon has been successfully confirmed. A confirmation email has been sent to {email}.
              </p>
              <div className="p-5 rounded-xl inline-block mb-8 border border-[#b97a38]/20">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Confirmation Number</p>
                <p className="text-2xl font-light text-[#b97a38]">{confirmationNumber}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2.5 bg-[#b97a38] text-white rounded-lg transition-all duration-300 font-semibold text-xs"
                >
                  Return to Homepage
                </button>
                <button
                  onClick={() => navigate("/rooms")}
                  className="px-6 py-2.5 border-2 border-gray-300 rounded-lg text-xs text-gray-700 transition-all duration-300 font-medium"
                >
                  Browse More Rooms
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reserve;
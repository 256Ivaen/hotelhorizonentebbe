import React from "react";
import { PhoneOutgoing, UtensilsCrossed, MapPinCheck, Clock } from "lucide-react";

const SignatureRestaunt = () => {
  return (
    <div className="bg-white py-20 px-10 rounded-lg shadow-lg my-5 w-full mx-auto"> 

{/* w-full bg-orange-500 my-5 py-10 px-10 rounded-lg text-white sm:text-left flex flex-col sm:flex-row gap-5 sm:gap-20 items-center */}
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Left Section - Text and Buttons */}
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
            The Signature<br />Restauant
          </h1>
          <p className="text-gray-600 sm:mb-8 text-xs sm:text-sm">
            Experience the epitome of fine dining at The Signature Restaurant, where our award-winning chefs craft exquisite dishes using the finest locally-sourced ingredients. Our elegant ambiance and impeccable service create the perfect setting for an unforgettable culinary journey.
          </p>
          <div className="flex flex-col hidden sm:flex sm:flex-row gap-4">
            <button className="bg-black text-white font-medium py-3 px-10 rounded-lg text-xs font-semibold">
              Reserve a table
            </button>
            <button className="bg-white text-black font-medium py-3 px-10 rounded-lg border border-black text-xs font-semibold">
              View Gallery
            </button>
          </div>
        </div>
        
        {/* Right Section - Benefits Grid */}
        <div className="grid grid-cols-2 gap-px bg-gray-100 rounded-lg  md:w-1/2">
          <div className="flex flex-col items-center justify-center p-6 bg-white">
            <Clock size={28} className="text-orange-500 mb-3" />
            <p className="text-gray-700 font-medium text-xs text-center flex flex-col"><span className="font-semibold text-sm">HOURS</span> <span className="text-xs">24/7 Service</span></p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-white">
            <MapPinCheck size={28} className="text-orange-500 mb-3" />
            <p className="text-gray-700 font-medium text-xs text-center flex flex-col"><span className="font-semibold text-sm">LOCATION</span> <span className="text-xs">Main Building, Ground Floor</span></p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white">
            <PhoneOutgoing size={28} className="text-orange-500 mb-3" />
            <p className="text-gray-700 font-medium text-xs text-center flex flex-col"><span className="font-semibold text-sm">RESERVATIONS</span> <span className="text-xs">+256 742 50 50 52</span></p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white">
            <UtensilsCrossed size={28} className="text-orange-500 mb-3" />
            <p className="text-gray-700 font-medium text-xs text-center flex flex-col"><span className="font-semibold text-sm">CUISINE</span> <span className="text-xs">Contemporary International</span></p>
          </div>
        </div>

        <div className="flex flex-col sm:hidden sm:flex-row gap-4 w-full">
            <button className="bg-black text-white font-medium py-2 px-10 rounded-lg text-xs font-semibold">
              Reserve a table
            </button>
            <button className="bg-white text-black font-medium py-2 px-10 rounded-lg border border-black text-xs font-semibold">
              View Gallery
            </button>
          </div>
      </div>
    </div>
  );
};

export default SignatureRestaunt;
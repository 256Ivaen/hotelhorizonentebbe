import React, { useState } from "react";
import backgroundImage from "../assets/explore.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };


  return (
    <div
      className="flex flex-col sm:flex-row px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#01234e",
      }}
    >
      {/* Hero Left Side */}

      <div className="w-full h-[300px] flex items-center justify-center py-10 sm:py-0">
        <div className="w-full text-white">
          <h1 className="text-3xl sm:py-3 lg:text-3xl leading-relaxed max-w-[400px]">
            Lets build something great together !
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-sm md:text-base max-w-[500px]">
              Don't wait any longer to bring your construction dreans to life.
              Partner with Polad Uganda Limitted and experience unparralleled
              service and quility.
            </p>
          </div>

          <button
            onClick={() => handleNavigation("/contact")}
            className="bg-white text-blue-900 mt-5 px-8 py-3 text-sm active:bg-gray-700 rounded-[10px]"
          >
            GET STARTED →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;

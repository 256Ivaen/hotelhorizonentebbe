import React from "react";
import backgroundImage from "../assets/celebrate.jpg";

const Explore = () => {
  return (
    <div className="flex flex-col sm:flex-row px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
      <div
        className="relative w-full h-[350px] flex items-end justify-center py-10 sm:py-0 bg-gray-300 rounded-[30px]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-[30px]"></div>

        {/* Text Content */}
        <div className="relative w-full text-white m-0 sm:m-10 px-5 sm:px-0">
          <h1 className="text-3xl sm:py-3 lg:text-3xl leading-relaxed max-w-[400px]">
            Celebrate In Style
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-sm md:text-base max-w-[500px]">
              Lounge under a colorful event With Hotel Horizon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

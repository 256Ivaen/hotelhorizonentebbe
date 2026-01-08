import React from "react";
import backgroundImage from "../assets/build.jpg";

const Build = () => {
  return (
    <div className="flex flex-col sm:flex-row px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10">
      <div
        className="relative w-full h-[350px] flex items-end justify-center py-10 sm:py-0  rounded-[30px]"
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
          <h1 className="text-1xl font-bold lg:text-2xl leading-relaxed">
            Building Tomorrow's world.
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-sm md:text-base max-w-[500px]">
              Creating exceptional solutions that empower people and drive
              lasting prosperity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Build;

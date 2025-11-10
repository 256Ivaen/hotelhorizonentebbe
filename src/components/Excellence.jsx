import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className=" w-full bg-gray-900">
      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-start w-full h-full text-white flex items-center justify-between py-3 px-3 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-center justify-between font-medium">
        <div className="w-full flex flex-col justify-center bg-grey-200 py-5">
          <div>
            <h1 className="prata-regular text-3xl sm:py-3 lg:text-3xl text-white leading-relaxed bg-black">
              OUR LEGACY OF EXCELLENCE
            </h1>
            <div className="flex items-center gap-2 mt-3 bg-black">
              <p className="text-sm text-white md:text-base">
                Some info Goes here
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-start w-full h-full text-white flex items-center justify-between py-3 px-3 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-center justify-between font-medium">
        <div className="w-full flex flex-col justify-center bg-grey-200">
          <div>
            <h1 className="prata-regular text-3xl lg:text-3xl text-white leading-relaxed bg-black">
              260+
            </h1>
            <div className="flex items-center gap-2 mt-3 bg-black">
              <p className="text-sm text-white md:text-base">
                Some info Goes here
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center bg-grey-200">
          <div>
            <h1 className="prata-regular text-3xl lg:text-3xl text-white leading-relaxed bg-black">
                75%
            </h1>
            <div className="flex items-center gap-2 mt-3 bg-black">
              <p className="text-sm text-white md:text-base">
                Some info Goes here
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center bg-grey-200">
          <div>
            <h1 className="prata-regular text-3xl lg:text-3xl text-white leading-relaxed bg-black">
                200+
            </h1>
            <div className="flex items-center gap-2 mt-3 bg-black">
              <p className="text-sm text-white md:text-base">
                Some info Goes here
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center bg-grey-200">
          <div>
            <h1 className="prata-regular text-3xl lg:text-3xl text-white leading-relaxed bg-black">
                100+
            </h1>
            <div className="flex items-center gap-2 mt-3 bg-black">
              <p className="text-sm text-white md:text-base">
                Some info Goes here
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Hero;

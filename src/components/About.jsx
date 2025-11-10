import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";

const About = () => {
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
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-5 mx-auto">
      <div className="my-10 flex flex-col md:flex-row gap-10">
        <img
          className="w-full md:max-w-[300px] object-cover sm:block hidden"
          src={assets.about}
          alt=""
        />
        <div className="flex flex-col justify-center gap-5 md:w-2/4 text-gray-600">
          <h1 className="text-1xl md:text-2xl font-bold leading-tight max-w-[500px]">
            Stay Longer, Save More
          </h1>

          <p className="text-sm">
            Visit Hotel Horizon for as long as you wish, the longer you stay,
            the more you save.
          </p>

          <div className="sm:flex sm:flex-row flex-col sm:gap-5">
            {/* Our Services Button */}
            <button
              onClick={() => handleNavigation("/reserve")}
              className="bg-transparent border border-blue-900 text-black px-8 py-3 my-2 text-sm active:bg-transparent sm:flex"
            >
              GET STARTED
            </button>

            <a
              href="tel:+256740505050"
              className="text-black my-2 text-sm flex items-center rounded-[10px] space-x-3"
            >
              <svg
                height="30"
                viewBox="0 0 48 48"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.25 21.59c2.88 5.66 7.51 10.29 13.18 13.17l4.4-4.41c.55-.55 1.34-.71 2.03-.49 2.24.74 4.65 1.14 7.14 1.14 1.11 0 2 .89 2 2v7c0 1.11-.89 2-2 2-18.78 0-34-15.22-34-34 0-1.11.9-2 2-2h7c1.11 0 2 .89 2 2 0 2.49.4 4.9 1.14 7.14.22.69.06 1.48-.49 2.03l-4.4 4.42z"
                  fill="#01234e"
                />
              </svg>

              {/* Text on the Right */}
              <div className="flex flex-col text-left">
                <span className="text-xs">Call For Reservations.</span>
                <span className="text-sm font-semibold">+256 740 50 50 50</span>
              </div>
            </a>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default About;

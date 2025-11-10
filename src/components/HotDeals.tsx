import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Title from "./Title";
import { assets } from "../assets/assets";

const hotDeals = [
  { id: 1, name: "Velentines Deals", image: assets.deal_1 },
  { id: 2, name: "Accomodation Discount", image: assets.deal_2 },
  { id: 3, name: "Buy 2 for the price of one", image: assets.deal_3 },
  { id: 4, name: "Stay Longer, Pay Less", image: assets.deal_4 },
  { id: 5, name: "Happy Hour Is Back", image: assets.deal_5 },
];

const HotDealsSlider = () => {
  return (
    <div className="mt-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
        <p className="text-5x1 text-bold">Deals with Appeal</p>
        <p className="text-xs sm:text-[12px] text-gray-600 max-w-[300px]">
          Connect to the places you love, with savings on hotels and more.
        </p>
        </div>
        <p className="text-xs sm:text-[12px] text-black max-w-[300px]">
            View All 
        </p>
      </div>
      {/* Swiper for Hot Deals */}
      <div className="mt-6">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={2000}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            // Default for mobile (< 768px)
            0: {
              slidesPerView: 1,
            },
            // Tablet/iPad (≥ 768px)
            768: {
              slidesPerView: 2,
            },
            // Desktop (≥ 1024px)
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full"
        >
          {hotDeals.map((deal) => (
            <SwiperSlide key={deal.id} className="relative">
              <div className="relative w-full h-72">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
                {/* Gradient Overlay & Text */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-xl">
                  <p className="text-white font-bold text-lg">{deal.name}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HotDealsSlider;

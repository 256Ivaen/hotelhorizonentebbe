import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";

import backgroundImage from "../assets/celebrate.jpg";

const offers = [
  {
    title: "Celebrate In Style",
    description: "Lounge under a colorful event With Hotel Horizon.",
    image: backgroundImage,
  },
  {
    title: "Exclusive Getaway",
    description: "Enjoy a luxurious stay with exclusive amenities.",
    image: backgroundImage,
  },
  {
    title: "Family Retreat",
    description: "Create lasting memories with your loved ones.",
    image: backgroundImage,
  },
  {
    title: "Romantic Escape",
    description: "A perfect retreat for you and your partner.",
    image: backgroundImage,
  },
];

const Explore = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10">
        <h1 className="text-1xl md:text-2xl font-semibold mb-5 leading-tight ">
            Get Promo for a cheaper price
          </h1>
      <Swiper

          modules={[Autoplay]}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
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
              slidesPerView: 2,
            },
          }}
          className="w-full"

      >
        {offers.map((offer, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-[200px] flex items-end justify-center py-2  bg-gray-300 rounded-[20px]"
              style={{
                backgroundImage: `url(${offer.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-[20px]"></div>
              <div className="relative w-full text-white m-0 px-5">
                <h1 className="text-2xl leading-relaxed max-w-[400px]">
                  {offer.title}
                </h1>
                <p className="text-sm md:text-base max-w-[500px]">
                  {offer.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Explore;

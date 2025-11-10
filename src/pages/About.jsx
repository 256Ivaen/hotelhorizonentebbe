import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

import Title from "../components/Title";
import AboutUs from "../components/CompanyOverview";
import Build from "../components/Build";
import WhyPolad from "../components/WhyPolad";
import FAQS from "../components/FrequentQuestions";
import OurPolicy from "../components/OurPolicy";

// Handle Navigation and Reloading Active Page
const handleNavigation = (path) => {
  if (location.pathname === path) {
    window.location.reload();
  } else {
    navigate(path);
  }
};

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: assets.about_hero,
      title: "Company Overview",
      subtitle: "Who We Are",
    },
  ];

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[30vh] md:h-[50vh]">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
          speed={1000}
          effect="fade"
          onSlideChange={handleSlideChange}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <motion.img
                className="w-full h-full object-cover"
                src={slide.image}
                alt={`Slide ${index + 1}`}
              />
              <div className="absolute inset-0 sm:pt-40 flex flex-col items-center justify-center text-white text-center bg-black/10 px-5">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: currentIndex === index ? 1 : 0,
                    y: currentIndex === index ? 0 : 50,
                  }}
                  transition={{ duration: 1 }}
                >
                  <h1 className="text-2xl md:text-4xl font-bold leading-tight max-w-[500px] mx-auto">
                    {slide.title}
                  </h1>
                  <p className="text-sm mt-3 max-w-[600px] mx-auto">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
      <AboutUs />
      <Build />
      {/* <OurPolicy /> */}
      {/* <WhyPolad /> */}
      <FAQS />
    </div>
  );
};

export default About;

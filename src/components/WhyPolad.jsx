import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { assets } from "../assets/assets";
import Title from "./Title";

const WhyPolad = () => {
  const [whypolad, setWhyPolad] = useState([
    {
      title: "Expert Management & Leadership",
      description: "Our experienced leadership team ensures successful project execution with strong guidance and a clear vision.",
      icon: assets.leadership_icon,
    },
    {
      title: "Unwavering Commitment to Customer Satisfaction",
      description: "We prioritize our clients' needs and strive to exceed their expectations with every project.",
      icon: assets.handshake_icon,
    },
    {
      title: "Decisive and Strategic Decision-Making",
      description: "Our company’s leadership makes informed, timely decisions to deliver projects efficiently and effectively.",
      icon: assets.target_icon,
    },
    {
      title: "Clear and Effective Communication",
      description: "We maintain open lines of communication, ensuring all stakeholders are informed and aligned throughout the project.",
      icon: assets.chat_icon,
    },
    {
      title: "Commitment to Continuous Improvement",
      description: "We continuously evaluate and enhance our processes to provide cutting-edge, cost-effective solutions.",
      icon: assets.progress_icon,
    },
    {
      title: "Measurement and Feedback for Excellence",
      description: "We actively collect feedback and measure outcomes to ensure consistent quality and improvement.",
      icon: assets.chart_icon,
    },
    {
        title: "Regular Innovation and Technique Enhancement",
        description: "We stay ahead by continually updating our techniques and incorporating industry best practices.",
        icon: assets.innovation_icon,
      },
      {
        title: "Hands-On Tool Training for Team Expertise",
        description: "We provide our team with hands-on training to master the tools and techniques that drive high-quality results.",
        icon: assets.training_icon,
      },
      {
        title: "Strict Supplier Quality Management",
        description: "We collaborate with trusted suppliers, ensuring the highest quality materials for every project.",
        icon: assets.certificate_icon,
      },
      {
        title: "Efficient Systems and Processes",
        description: "Our streamlined processes and systems enhance project efficiency, delivering timely and cost-effective solutions.",
        icon: assets.automation_icon,
      },
      {
        title: "Access to the Best Resources in the Industry",
        description: "We leverage the latest technologies, tools, and resources to ensure superior construction results.",
        icon: assets.toolbox_icon,
      },
      {
        title: "Ongoing Education and Training",
        description: "We believe in the professional growth of our team, offering continuous education to keep them at the forefront of the industry.",
        icon: assets.teamtraining_icon,
      },
      {
        title: "Positive Work Environment & Culture",
        description: "Our company fosters a collaborative and supportive environment, ensuring a motivated and high-performing team.",
        icon: assets.hammer_icon,
      },
      {
        title: "Relentless Hard Work and Teamwork",
        description: "We take pride in our strong work ethic, where every team member is dedicated to success through collaboration.",
        icon: assets.teamwork_icon,
      },
      {
        title: "Meticulous Supplier Selection for Quality",
        description: "We carefully select suppliers who share our commitment to quality, ensuring only the best materials and resources are used.",
        icon: assets.checklist_icon,
      },
  ]);

  return (
    <div className="my-10 sm:flex-row my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="text-center py-8">
        <Title text1={"WHY"} text2={"POLAD"} />
        <p className="w-3/4 m-auto text-xs sm:text-xs md:text-base text-gray-600 max-w-[600px]">
          Developed in close collaboration with our partners and clients,
          combines industry knowledge, decades of experience, ingenuity and
          adaptability to deliver excellence to our clients
        </p>
      </div>

      {/* Best Seller Showcase with Swiper */}
      <div className="w-full mt-5 mx-auto">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={10}
          centeredSlides={true}
          speed={1000}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 3,
            },
            480: {
              slidesPerView: 2,
            },
          }}
        >
          {whypolad.map((project, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="w-[100%] overflow-hidden">
                {/* Check if the index is even or odd to decide the layout */}
                <div className="block flex flex-col gap-5 h-auto transition-all duration-1000 ease-in-out">
                  <div className="text-left flex-1 border-2 border-blue-900 rounded-[30px] p-5 gap-8">
                    <h3 className="text-[15px] font-semibold flex flex-col items-start gap-2">
                      <img
                        src={project.icon}
                        alt={project.title}
                        className="my-2 w-10 h-10"
                      />
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default WhyPolad;

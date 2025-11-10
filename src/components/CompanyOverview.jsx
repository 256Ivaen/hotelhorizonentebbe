import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
// import Location from "../components/Location";
import NewsletterBox from "../components/NewsletterBox";

const handleNavigation = (path) => {
  if (location.pathname === path) {
    window.location.reload();
  } else {
    navigate(path);
  }
};

const About = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-5 mx-auto">
      <div className="block sm:hidden text-2xl text-center pt-8">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row justify-between gap-10">
        <div className="flex-1 flex-col justify-center gap-5 md:w-2/4 text-gray-600">
          <h1 className="text-2xl md:text-4xl font-semibold leading-tight mb-5 max-w-[500px]">
            We're shaping the future of construction.
          </h1>

          <div className="flex flex-col gap-5">
            <p className="text-sm">
              POLAD UGANDA LTD was formed in 2007, with the aim of providing
              full range of technical and advisory quality services for Civil
              Engineering, Aluminium Fabrication, Interior Works and Metal
              Fabrication to developers of Buildings within the existing
              professionals in Uganda and East Africa.
            </p>

            <p className="text-sm">
              Our team has a wealth of experience working closely with
              architects, contractors and clients to develop project solutions
              from their earliest concept. We are committed to providing the
              most efficient and cost efficient construction work in the country
              and anticipate being of services to your esteemed organization.
            </p>

            <p className="text-sm">
              We have workshop equipped with modern machinery to ensure high
              quality products and timely execution.
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center sm:flex-wrap">
          {[
            {
              title: "Vision",
              description: "Customer focus and satisfaction is our motto",
              icon: assets.vision,
            },
            {
              title: "Mission",
              description:
                "To exceed customer expectations and be the total solution provider",
              icon: assets.mission,
            },
            {
              title: "Values",
              description: "Encourage innovations to meet the challenges",
              icon: assets.value,
            },
            {
              title: "Objective",
              description: "To become leading service provider in industry",
              icon: assets.objective,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center px-2 py-5 sm:flex-wrap:py-10 bg-white border-2 border-blue-900 shadow-lg rounded-[30px] w-full"
            >
              <img src={item.icon} alt={item.title} className="w-10 mb-2" />
              <p className="text-sm sm:text-base font-semibold">{item.title}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

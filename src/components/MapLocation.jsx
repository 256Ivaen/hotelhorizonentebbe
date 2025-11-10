import React from "react";
import Title from "../components/Title";
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
        <Title text1={"Our"} text2={"Location"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <iframe
          className="w-full md:max-w-[450px] h-[450px] object-cover rounded-[10px] border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31917.953651632764!2d32.54108967431639!3d0.3492299999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb8a411e7e75%3A0xd77972c93b3dfec0!2sPolad%20Uganda!5e0!3m2!1sen!2sug!4v1739797976895!5m2!1sen!2sug"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="flex flex-col justify-center gap-5 md:w-2/4 text-gray-600">
          <div className="text-sm hidden sm:block">
            <Title text1={"Our"} text2={"Location"} />
          </div>

          <h1 className="text-2xl md:text-4xl font-bold leading-tight max-w-[500px]">
            Connecting Near and Far
          </h1>

          <h2 className="text-1xl md:text-2xl font-semibold leading-tight max-w-[500px]">
            Headquarters
          </h2>

          <p className="text-sm">
            Plot No: 95 / A<br /> 6th Street<br /> Industrial Area<br /> Kampala<br /> Uganda
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
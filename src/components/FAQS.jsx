import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const handleNavigation = (path) => {
  if (location.pathname === path) {
    window.location.reload();
  } else {
    navigate(path);
  }
};

const FAQS = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Do you offer a free, no-obligation quotation?",
      answer:
        "Our post-construction services give you peace of mind knowing that we are still here for you even after.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "The duration depends on the complexity and scale of the project, but we always aim to complete within the agreed timeframe.",
    },
    {
      question: "What materials do you use for construction?",
      answer:
        "We use high-quality, durable materials sourced from trusted suppliers to ensure longevity and aesthetics.",
    },
    {
      question: "Do you provide maintenance after project completion?",
      answer:
        "Yes, we offer post-project maintenance services to keep your structures in the best condition.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-5 mx-auto">
      <div className="block sm:hidden text-2xl text-center pt-8">
        <Title text2={"FAQS"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* Hides the image on small screens */}
        <img
          className="hidden sm:block w-full md:max-w-[450px] object-cover rounded-[30px]"
          src={assets.faqs}
          alt="About us"
        />
        <div className="flex flex-col justify-center gap-5 md:w-2/4 text-gray-600">
          <div className="text-sm hidden sm:block">
            <Title text2={"FAQS"} />
          </div>

          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-3">
              <h2
                onClick={() => toggleFAQ(index)}
                className={`flex items-center justify-between text-sm font-semibold cursor-pointer transition-colors duration-300 ${
                  activeIndex === index ? "text-[#01234e]" : "text-gray-600"
                }`}
              >
                {faq.question}
                <img
                  src={assets.arrowDown}
                  alt="Toggle Icon"
                  className={`w-8 h-8 transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-90" : "rotate-0"
                  }`}
                />
              </h2>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeIndex === index
                    ? "max-h-[1000px] opacity-100"  
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm mt-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQS;

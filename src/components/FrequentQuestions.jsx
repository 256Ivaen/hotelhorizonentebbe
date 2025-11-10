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
      question: "What time is check-in and check-out at Hotel Horizon?",
      answer:
        "Check-in starts at 2:00 PM and check-out is by 10:00 AM. Early check-in and late check-out are subject to availability.",
    },
    {
      question: "Does Hotel Horizon offer free Wi-Fi?",
      answer:
        "Yes, complimentary high-speed Wi-Fi is available throughout the hotel, including guest rooms and public areas.",
    },
    {
      question: "Is parking available at the hotel?",
      answer:
        "Yes, we offer free on-site parking for all our guests. Valet parking services are also available upon request.",
    },
    {
      question: "Is there a pool or fitness center available?",
      answer:
        "Yes, guests can enjoy our outdoor swimming pool and fully-equipped fitness center during their stay.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mx-auto">
      <div className="block sm:hidden text-2xl text-center pt-8">
        <Title text2={"FAQS"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row ">
        <div className="flex flex-col justify-center md:w-2/4 text-gray-600">
          <div className="text-sm hidden sm:block">
            <Title text2={"FAQS"} />
          </div>

          <p className="text-5xl max-w-[500px]">
            Do you have any questions for us ?
          </p>

          <p className="text-sm mt-2 max-w-[500px]">If there are any questions you want to ask. We will answer all your questions</p>
        </div>

        {/* Hides the image on small screens */}
        <div className="flex flex-col justify-center gap-5 md:w-2/4 text-gray-600">
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
                className={`overflow-hidden ${
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

import React, { useState } from "react";
import backgroundImage from "../assets/celebrate.jpg";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing, ${email}!`);
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="w-full bg-gray-100 py-20 px-10 rounded-2xl text-white sm:text-left flex flex-col sm:flex-row gap-5 sm:gap-20">
      <div className="flex flex-col justify-center flex-1">
        <p className="leading-relaxed mb-2 text-xs text-black">GET FIRST UPDATE</p>
        <p className="text-lg sm:text-2xl text-black font-semibold">
          Be the first to know about special discounts, events, and more by{" "}
          <span className="text-red-600">subscribing</span> to our newsletter
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-grow p-3 text-xs rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#B97A38]"
        />
        <button
          onClick={handleSubscribe}
          className="w-full sm:w-auto bg-black text-white px-6 py-3 text-xs font-semibold rounded-lg transition duration-300 whitespace-nowrap"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
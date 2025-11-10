import React, { useState } from "react";
import { CalendarSearch } from "lucide-react";

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
    <div className="w-full bg-orange-500 my-5 py-10 px-10 rounded-lg text-white sm:text-left flex flex-col sm:flex-row gap-5 sm:gap-20 items-center">
        <div className="flex flex-col justify-center flex-1">
          <p className="leading-relaxed mb-2 text-3xl text-white font-semibold">
          Ready to plan your event ?
          </p>
          <p className="text-sm text-white">
          Our dedicated events team is here to help you create a memorable experience.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full justify-end">
          <button
            onClick={handleSubscribe}
            className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded-lg text-xs font-semibold"
          >
            <div className="flex gap-2 items-center">
            <CalendarSearch size={15} className="text-black" />
            <p>Book Online</p>
            </div>
          </button>

          <button
            onClick={handleSubscribe}
            className="w-full sm:w-auto border border-1 border-white text-white px-6 py-3 rounded-lg text-xs font-semibold"
          >
            Call to Reserve
          </button>
        </div>
      </div>
  );
};

export default Subscribe;
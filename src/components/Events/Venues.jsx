import React, { useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import EventVenueItem from "./EventVenueItem";
import { assets } from "../../assets/assets";
import Title from "./Title";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Venues = ({ showAll = true }) => {
  const displayedVenues = showAll
    ? assets.eventVenues
    : assets.eventVenues.slice(0, 8);

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
    <div className="relative">
      {/* Blog Section Title & View All Button */}
      <div className="justify-between mb-5">
        <div className="text-start">
          <Title text1={"Our"} text2={"Event Venues"} />
          <p className="text-xs">
            From intimate gatherings to grand celebrations, our versatile venues
            provide the perfect backdrop for any occasion.
          </p>
        </div>
      </div>

      {/* Blog Items in Grid Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-black">
        {displayedVenues.map((item) => (
          <div key={item.id}>
            <EventVenueItem
              id={item.id}
              image={item.image}
              name={item.name}
              description={item.description}
              capacity={item.capacity}
              location={item.location}
            />
          </div>
        ))}
      </div>

      {/* <div className="w-full bg-gray-100 mt-10 py-10 px-10 rounded-lg text-white sm:text-left flex flex-col sm:flex-row gap-5 sm:gap-20 items-center">
        <div className="flex flex-col justify-center flex-1">
          <p className="leading-relaxed mb-2 text-3xl text-black font-semibold">
          Ready to plan your event ?
          </p>
          <p className="text-sm text-black">
          Our dedicated events team is here to help you create a memorable experience.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full justify-end">
          <button
            onClick={handleSubscribe}
            className="w-full sm:w-auto bg-white border border-1 text-black px-5 text-xs font-semibold py-2 rounded-lg"
          >
            Download Brochure
          </button>

          <button
            onClick={handleSubscribe}
            className="w-full sm:w-auto bg-black text-xs text-white px-5 font-semibold py-2 rounded-lg"
          >
            Contact Us
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Venues;

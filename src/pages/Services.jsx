import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ServiceItem from "../components/ServiceItem";

const Services = ({ showAll = true }) => {
  const displayedServices = showAll ? assets.serviceItem : assets.serviceItem.slice(0, 8);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 mt-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10">
      {/* Right Side - Display Services */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 gap-y-6">
          {displayedServices.length > 0 ? (
            displayedServices.map((item, index) => (
              <ServiceItem 
                key={item.id} 
                index={index} 
                id={item.id} 
                image={item.image} 
                name={item.name} 
                title={item.title} 
                about={item.about}
              />
            ))
          ) : (
            <p>No services found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;

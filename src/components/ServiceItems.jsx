import React from "react";
import { Link } from "react-router-dom";

const ServiceItem = ({ id, image, name, title, about }) => {
  return (
  
    <div className="shadow-md hover:shadow-lg rounded-[10px] overflow-hidden transition ease-in-out duration-300">
      <Link to={`/service/${id}`} className="block">
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out duration-1000 w-full h-[250px] object-cover rounded-tl-[10px] rounded-tr-[10px]"
            src={image[0]}  
            alt={name}
          />
        </div>

        <div className="text-left pl-3 py-5 rounded-bl-[10px] rounded-br-[10px] bg-white">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm font-bold text-gray-900">{title}</p>
          <p className="text-sm font-bold text-gray-900">{about}</p>
          <Link to={`/service/${id}`} className="text-[#01234e] font-bold text-[12px]">
            Read More →
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default ServiceItem;
  

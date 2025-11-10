import React from "react";

const AmenityItem = ({ id, image, name, description }) => {
  return (
    <div className="rounded-lg shadow-md hover:outline-2 hover:border-blue-900 border border-black overflow-hidden py-10 px-5 transition-all ease-in-out duration-1000 flex gap-5 h-full justify-start items-center w-full">


      {/* Circle container for the icon */}
      <div className="w-10 h-10 object-cover rounded-full p-3 bg-black">
        <img
          className="w-full h-full object-cover rounded-full filter invert brightness-0"
          src={image}
          alt={name}
        />
      </div>

      <div className="flex flex-col gap-1 flex-grow">
        <p className="text-md font-semibold">{name}</p>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
};

export default AmenityItem;

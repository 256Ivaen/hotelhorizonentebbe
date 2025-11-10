import React from "react";
import Title from "../components/Title";

const ServiceItem = ({ index, image, name, title, about }) => {
  // Alternate layout based on even or odd index
  const isEven = index % 2 === 0;

  return (
    <div className="overflow-hidden mx-auto w-full">
      <div className="block sm:hidden text-2xl text-center pt-8">
        <Title text1={name} />
      </div>

      {/* Alternate flex direction */}
      <div className={`flex flex-col md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-16`}>
        {/* Image alternates position */}
        <img
          className="w-full sm:h-[450px] md:max-w-[450px] object-cover rounded-[20px]"
          src={image[0]}
          alt={name}
        />
        <div className="flex flex-col justify-between gap-2 w-full text-gray-600">
          <div className="text-sm hidden sm:block">
            <Title text1={name} />
          </div>

          <h1 className="text-2xl md:text-4xl font-bold leading-tight max-w-[500px]">
            {title}
          </h1>

          <p className="text-sm">
            {about}
          </p>

          <img
            className="w-full max-h-[200px] object-cover rounded-[20px]"
            src={image[1]}
            alt={name}
          />
        </div>
      </div>

      <hr className="border-t-2 border-blue-900 mt-10" />
    </div>
  );
};

export default ServiceItem;

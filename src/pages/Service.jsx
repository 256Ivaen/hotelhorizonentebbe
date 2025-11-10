import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Service = () => {
  const { serviceId } = useParams();
  const { services } = useContext(ShopContext);
  const [serviceData, setServiceData] = useState(null);
  const [image, setImage] = useState("");
  const [nextService, setNextService] = useState(null);

  useEffect(() => {
    const fetchServiceData = () => {
      const currentIndex = assets.serviceItem.findIndex(
        (item) => item.id === serviceId
      );
      if (currentIndex !== -1) {
        setServiceData(assets.serviceItem[currentIndex]);
        setImage(assets.serviceItem[currentIndex].image[0]);
        const nextIndex = (currentIndex + 1) % assets.serviceItem.length;
        setNextService(assets.serviceItem[nextIndex]);
      }
    };
    fetchServiceData();
  }, [serviceId]);

  // Handle image change every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentIndex = serviceData?.image.findIndex(
        (item) => item === image
      );
      const nextIndex = (currentIndex + 1) % serviceData?.image.length;
      setImage(serviceData?.image[nextIndex]);
    }, 5000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [image, serviceData]);

  return serviceData ? (
    <div className="sm:mt-10">
      <div className="flex gap-12 flex-col sm:flex-row py-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {/* Display all images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {serviceData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                className={`w-[25%] sm:w-full sm:mb-3 cursor-pointer aspect-square object-cover transition-transform duration-500 ease-in-out ${
                  image === item ? "border-4 border-blue-900" : ""
                }`}
                alt="Service Thumbnail"
              />
            ))}
          </div>
          <div className="w-full sm:w-[500px] h-[300px] sm:h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt="Service"
            />
          </div>
        </div>

        {/* Service Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{serviceData.name}</h1>
          <p className="mt-5 text-gray-500">{serviceData.about}</p>
          <div className="flex flex-col sm:flex-row justify-between w-full mt-5 sm:gap-0 gap-5">
            <p className="flex flex-col gap-3">
              <strong className="text-blue-900 font-normal text-lg capitalize">
                CLIENT
                <br />
              </strong>{" "}
              {serviceData.client}
            </p>
            <p className="flex flex-col gap-3">
              <strong className="text-blue-900 font-normal text-lg capitalize">
                COMPLETED
                <br />
              </strong>{" "}
              {serviceData.completion_date}
            </p>
            <p className="flex flex-col gap-3">
              <strong className="text-blue-900 font-normal text-lg capitalize">
                LOCATION
                <br />
              </strong>{" "}
              {serviceData.location}
            </p>
          </div>
          <hr className="border-t-2 border-blue-900 mt-2" />
        </div>
      </div>

      {/* Next Service Section */}
      {nextService && (
        <div
          className="relative cursor-pointer"
          onClick={() => (window.location.href = `/service/${nextService.id}`)}
        >
          <img
            src={nextService.image[0]}
            className="w-full h-[300px] object-cover"
            alt="Next Service"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-3">
            <h2 className="text-gray-300 text-sm font-normal  uppercase tracking-[1px]">
              Next Service
            </h2>
            <h2 className="text-white text-xl font-semibold uppercase tracking-[1px]">
              {nextService.name}
            </h2>
            <img
            src={assets.nextArrow}
            className="w-10 h-10 object-cover"
            alt="Next Service"
          />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Service;

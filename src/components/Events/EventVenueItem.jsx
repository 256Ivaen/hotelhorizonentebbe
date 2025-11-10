import React from "react";
import { Link } from "react-router-dom";
import { Users, MapPinCheck } from "lucide-react";

const EventItem = ({ id, image, name, description, capacity, location }) => {
  return (
    <div className="overflow-hidden flex flex-col h-full flex-grow rounded-lg border">
      {/* Display only the first image */}
      <div className="relative overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out duration-1000 w-full h-[200px] object-cover"
          src={image}
          alt={name}
        />
      </div>

      <div className="p-5 flex flex-col gap-2 w-[98%]">
        <p className="text-lg font-semibold line-clamp-2">{name}</p>
        <p
          className="text-xs font-normal text-gray-500 line-clamp-1"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Users size={20} className="text-gray-500" />
            <p className="text-xs text-gray-500 black">{capacity}</p>
          </div>

          <div className="flex gap-2 items-center">
            <MapPinCheck size={20} className="text-gray-500" />
            <p className="text-xs text-gray-500">{location}</p>
          </div>
        </div>

        {/* <Link
          to={`/venue/${id}`}
          className="text-gray-800 font-semibold text-[12px] mt-5 py-2 border text-center"
        >
          View Details
        </Link> */}
      </div>
    </div>
  );
};

export default EventItem;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Share2, Heart, Users } from "lucide-react";

const RoomItem = ({
  id,
  image,
  name,
  price,
  description,
  cardInfo,
  beds,
  size,
  guests,
  bathrooms,
  choice,
}) => {
  const [liked, setLiked] = useState(false);

  // Handle share functionality
  const handleShare = async () => {
    const shareData = {
      title: name,
      text: `Check out this room: ${name}`,
      url: `${window.location.origin}/room/${id}`,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // Handle like functionality
  const handleLike = () => {
    setLiked(!liked);
  };

  // Ensure `image` is an array and has at least one image
  const roomImage =
    Array.isArray(image) && image.length > 0
      ? image[0]
      : "https://via.placeholder.com/300";

  return (
    <div className="border border-1 rounded-lg overflow-hidden transition ease-in-out duration-300 flex flex-col h-full my-5 flex-grow">
      {/* Display the first image */}
      <div className="relative overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out duration-1000 w-full h-[250px] object-cover"
          src={roomImage}
          alt={name}
        />
        <div className="flex absolute top-2 right-2 gap-4">
          <button
            onClick={handleShare}
            className="bg-white p-2 rounded-full shadow-md"
          >
            <Share2 size={20} className="text-gray-800" />
          </button>

          <button
            onClick={handleLike}
            className="bg-white p-2 rounded-full shadow-md"
          >
            <Heart
              size={20}
              className={`${
                liked ? "fill-red-500 text-red-500" : "text-red-900"
              } transition-colors duration-300`}
            />
          </button>
        </div>
      </div>

      <div className="px-3 py-3 rounded-bl-[10px] rounded-br-[10px] bg-white gap-2 flex flex-col flex-grow">
        <p className="text-lg font-semibold line-clamp-2">{name}</p>
        <p className="text-[10px] text-gray-500 font-normal line-clamp-2">
          {cardInfo}
        </p>

        {/* Display room details */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Users size={20} className="text-gray-500" />
            <p className="text-xs text-gray-500">Max Capacity: {guests}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-xs text-gray-500">Beds: {beds}</p>
            <p className="text-xs text-gray-500">Size: {size}</p>
            <p className="text-xs text-gray-500">Bathrooms: {bathrooms}</p>
          </div>
        </div>

        {/* Display price */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <p className="text-[25px] font-semibold text-gray-900">
              <span className="text-xs font-normal text-gray-500">FROM: </span>$
              {price}{" "}
              <span className="text-xs font-normal text-gray-500">/ night</span>
            </p>
          </div>
        </div>

        {/* View Details button */}
        <Link
          to={`/room/${id}`}
          className="text-gray-800 font-semibold text-xs font-semibold text-center px-4 py-3 border border-blue-900"
        >
          View Details
        </Link>

        {/* Book Now button */}
        <div className="flex justify-between flex-col gap-2">
          <Link
            to="/reserve"
            state={{
              id,
              image,
              name,
              price,
              cardInfo,
              description,
              beds,
              size,
              guests,
              bathrooms,
              choice,
            }}
            className="bg-blue-900 w-full text-white px-4 py-3 text-xs font-semibold text-center"
          >
            BOOK NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;

import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ id, image, name, readtime, topic, description }) => {
  return (
    <div className="overflow-hidden flex flex-col h-full my-5 flex-grow rounded-lg">
      {/* Display only the first image */}
      <div className="relative overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out duration-1000 w-200px] h-[200px] object-cover rounded-lg"
          src={image[0]}
          alt={name}
        />
      </div>

      <div className="py-5 flex flex-col gap-2 w-[98%]">
        <div className="flex gap-2 items-center">
          <p className="text-xs text-red-500 font-semibold black">{topic}</p>
          <span className="font-bold text-[20px]">•</span>
          <p className="text-xs text-gray-500 font-semibold">{readtime}</p>
        </div>
        <p className="text-lg font-semibold line-clamp-2">{name}</p>
        <p
          className="text-xs font-normal text-gray-500 line-clamp-5"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>

        <Link
          to={`/bloginfo/${id}`}
          className="text-gray-800 font-semibold text-[12px] py-2"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;

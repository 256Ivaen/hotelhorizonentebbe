import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import Title from "./Title"

const Blog = () => {
  const selectedIds = [
    "Why_Hotel_Horizon_is_the_Best_Choice_for_Your_Stay_Near_Entebbe_Airport",
    "How_to_Stay_Safe_and_Healthy_While_Traveling_in_Uganda",
    "How_to_Plan_a_Business_Meeting_in_Entebbe",
    "Family-Friendly_Activities_in_Entebbe",
  ];

  const displayedBlogs = assets.blogItem.filter((item) =>
    selectedIds.includes(item.id)
  );

  const middleBlog = displayedBlogs.length > 0 ? displayedBlogs[0] : null;
  const blogTwo = displayedBlogs.length > 1 ? displayedBlogs[1] : null;
  const blogThree = displayedBlogs.length > 2 ? displayedBlogs[2] : null;
  const blogFour = displayedBlogs.length > 3 ? displayedBlogs[3] : null;

  return (
    <div className="mb-10">
        {/* Blog Section Title & View All Button */}
      <div className="hidden sm:flex justify-between mb-1">
        <div className="text-start">
          <Title text1={"Must"} text2={"Read"} />
        </div>
      </div>
        <div className="flex flex-col sm:grid grid-cols-[1fr_1fr_1fr_1fr] gap-5">
      {/* Blog Two */}
      {blogTwo && (
        <div
          key={blogTwo.id}
          className="overflow-hidden flex flex-col h-full flex-grow rounded-lg justify-between"
        >
          {/* Display only the first image */}
          <div className="relative overflow-hidden">
            <img
              className="hover:scale-110 transition ease-in-out duration-1000 w-full h-[200px] object-cover rounded-lg"
              src={blogTwo.image[0]}
              alt={blogTwo.name}
            />
          </div>

          <div className="flex flex-col gap-2 w-[98%]">
            <div className="flex gap-2 items-center">
              <p className="text-xs text-red-500 font-semibold black">
                {blogTwo.topic}
              </p>
              <span className="font-bold text-[20px]">•</span>
              <p className="text-xs text-gray-500 font-semibold">
                {blogTwo.readtime}
              </p>
            </div>
            <p className="text-sm font-semibold line-clamp-3">{blogTwo.name}</p>
            <p
              className="text-xs font-normal text-gray-500 line-clamp-[6]"
              dangerouslySetInnerHTML={{ __html: blogTwo.description }}
            ></p>

            <Link
              to={`/blog/${blogTwo.id}`}
              className="text-gray-800 font-semibold text-[12px] pt-2"
            >
              Read More →
            </Link>
          </div>
        </div>
      )}

      {/* Middle Blog */}
      {middleBlog && (
        <div className="lg:col-span-2 relative rounded-lg overflow-hidden">
          <div
            className="relative w-full h-full flex items-end justify-start p-6"
            style={{
              backgroundImage: `url(${middleBlog.image[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Content */}
            <div className="relative text-white z-10">
              <div className="flex gap-3 items-center">
                <p className="text-xs font-semibold">{middleBlog.topic}</p>
                <span className="font-bold text-[20px]">•</span>
                <p className="text-xs font-semibold">{middleBlog.readtime}</p>
              </div>
              <h1 className="text-sm sm:text-[20px] font-bold leading-tight max-w-[500px]">
                {middleBlog.name}
              </h1>
              <p
                className="text-xs mt-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: middleBlog.description }}
              ></p>
              <Link
                to={`/blog/${middleBlog.id}`}
                className="inline-block mt-2 text-sm font-semibold text-white pt-2"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-between gap-5">
        {/* Blog Three */}
        {blogThree && (
          <div
            key={blogThree.id}
            className="overflow-hidden flex flex-col h-full flex-grow rounded-lg justify-between"
          >
            {/* Display only the first image */}
            <div className="relative overflow-hidden">
              <img
                className=" w-full h-[110px] object-cover rounded-lg"
                src={blogThree.image[0]}
                alt={blogThree.name}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <p className="text-xs text-red-500 font-semibold black">
                  {blogThree.topic}
                </p>
                <span className="font-bold text-[20px]">•</span>
                <p className="text-xs text-gray-500 font-semibold">
                  {blogThree.readtime}
                </p>
              </div>
              <p className="text-sm font-semibold line-clamp-2">
                {blogThree.name}
              </p>

              <Link
                to={`/blog/${blogThree.id}`}
                className="text-gray-800 font-semibold text-[12px]"
              >
                Read More →
              </Link>
            </div>
          </div>
        )}

        {/* Blog Four */}
        {blogFour && (
          <div
            key={blogFour.id}
            className="overflow-hidden flex flex-col h-full flex-grow rounded-lg justify-between"
          >
            {/* Display only the first image */}
            <div className="relative overflow-hidden">
              <img
                className="w-full h-[110px] object-cover rounded-lg"
                src={blogFour.image[0]}
                alt={blogFour.name}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <p className="text-xs text-red-500 font-semibold black">
                  {blogFour.topic}
                </p>
                <span className="font-bold text-[20px]">•</span>
                <p className="text-xs text-gray-500 font-semibold">
                  {blogFour.readtime}
                </p>
              </div>
              <p className="text-sm font-semibold line-clamp-2">
                {blogFour.name}
              </p>

              <Link
                to={`/blog/${blogFour.id}`}
                className="text-gray-800 font-semibold text-[12px] pt-2 "
              >
                Read More →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Blog;

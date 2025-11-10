import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import BlogItem from "./BlogItem";
import { assets } from "../assets/assets";
import Title from "./Title";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Blog = ({ showAll = true }) => {
  const displayedBlogs = showAll
    ? assets.blogItem
    : assets.blogItem.slice(0, 4);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative my-10 ">
      {/* Custom ID and Styling */}
      {displayedBlogs
        .filter(
          (item) =>
            item.id ===
            "Why_Hotel_Horizon_is_the_Best_Choice_for_Your_Stay_Near_Entebbe_Airport"
        )
        .map((item) => (
          <div
            key={item.id}
            className="flex sm:flex-row flex-col gap-2 sm:gap-20  justify-center mb-10"
          >
            <img
              className="flex-1 w-full sm:h-[350px] object-cover rounded-lg"
              src={item.image[1]}
              alt={item.name}
            />

            <div className="flex flex-col justify-center gap-5">
              <div className="flex gap-2 items-center">
                <p className="text-xs text-red-500 font-semibold black">
                  {item.topic}
                </p>
                <span className="font-bold text-[20px]">•</span>
                <p className="text-xs text-gray-500 font-semibold">
                  {item.readtime}
                </p>
              </div>
              <h2 className="text-3xl font-semibold">{item.name}</h2>
              <p
                className="text-gray-700 text-xs line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></p>
              <Link
                to={`/bloginfo/${item.id}`}
                className="text-gray-800 font-semibold text-[12px] py-2"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}

      <div className="flex justify-between ">
        <div className="text-start">
          <Title text1={"Our"} text2={"Blog"} />
        </div>

        <button
          onClick={() => handleNavigation("/blog")}
          className="text-red-500 text-xs font-semibold "
        >
          View All →
        </button>
      </div>

      <div className="border-b border-black">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 20000, disableOnInteraction: false }}
          speed={2000}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="w-full"
        >
          {displayedBlogs.map((item) => (
            <SwiperSlide key={item.id} className="relative">
              <BlogItem
                id={item.id}
                image={item.image}
                name={item.name}
                readtime={item.readtime}
                topic={item.topic}
                description={item.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Blog;

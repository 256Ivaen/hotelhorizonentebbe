import React from "react";
import "swiper/css";
import "swiper/css/autoplay";
import BlogItem from "./DiningItem";
import { assets } from "../../assets/assets";
import Title from "./Title"
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  const selectedIds = [
    "Why_Hotel_Horizon_is_the_Best_Choice_for_Your_Stay_Near_Entebbe_Airport",
    "How_to_Stay_Safe_and_Healthy_While_Traveling_in_Uganda",
    "How_to_Plan_a_Business_Meeting_in_Entebbe",
    "Family-Friendly_Activities_in_Entebbe",
  ];

  // Get only the selected 4 blogs
  const displayedBlogs = assets.blogItem.filter((item) =>
    selectedIds.includes(item.id)
  );

  // Featured blog (First blog from displayedBlogs)
  const featuredBlog = displayedBlogs.length > 0 ? displayedBlogs[0] : null;

  return (
    <div className="relative mb-10">
        {/* Blog Section Title & View All Button */}
      <div className="hidden sm:flex justify-between mb-1">
        <div className="text-start">
          <Title text1={"Editor's"} text2={"Pick"} />
        </div>
      </div>
      {/* Featured Blog */}
      {featuredBlog && (
        <div className="flex flex-col sm:flex-row sm:mb-5">
          <div
            className="relative w-full h-[350px] flex items-end justify-center py-10 sm:py-0 bg-gray-300 rounded-lg"
            style={{
              backgroundImage: `url(${featuredBlog.image[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"></div>

            {/* Text Content */}
            <div className="relative w-full text-white m-0 sm:m-10 px-5 sm:px-0">
              <div className="flex gap-3 items-center">
                <p className="text-xs font-semibold black">
                  {featuredBlog.topic}
                </p>
                <span className="font-bold text-[20px]">•</span>
                <p className="text-xs font-semibold">{featuredBlog.readtime}</p>
              </div>
              <h1 className="text-2xl sm:py-3 lg:text-2xl leading-relaxed max-w-[80%]">
                {featuredBlog.name}
              </h1>
              <div className="flex items-center gap-2">
                <p
                  className="text-white text-xs line-clamp-2 max-w-[80%]"
                  dangerouslySetInnerHTML={{ __html: featuredBlog.description }}
                ></p>
              </div>
              <Link
                  to={`/room/${featuredBlog.id}`}
                  className="font-semibold text-[12px] py-2"
                >
                  Read More →
                </Link>
            </div>
          </div>
        </div>
      )}

      {/* Blog Items in Grid Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedBlogs.map((item) => (
          <div key={item.id}>
            <BlogItem
              id={item.id}
              image={item.image}
              name={item.name}
              readtime={item.readtime}
              topic={item.topic}
              //   description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

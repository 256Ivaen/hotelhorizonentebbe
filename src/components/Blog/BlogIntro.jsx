import React from "react";
import "swiper/css";
import "swiper/css/autoplay";
import BlogItem from "./BlogItem";
import { assets } from "../../assets/assets";
import Title from "./Title";
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
    <div className="relative my-10">
      {/* Featured Blog */}
      {featuredBlog && (
        <div className="flex sm:flex-row flex-col gap-2 sm:gap-20 justify-center mb-10">
          <img
            className="flex-1 w-full sm:h-[350px] object-cover rounded-lg"
            src={featuredBlog.image[2]}
            alt={featuredBlog.name}
          />

          <div className="flex flex-col justify-center gap-5">
            <div className="flex gap-2 items-center">
              <p className="text-xs text-red-500 font-semibold black">
                {featuredBlog.topic}
              </p>
              <span className="font-bold text-[20px]">•</span>
              <p className="text-xs text-gray-500 font-semibold">
                {featuredBlog.readtime}
              </p>
            </div>
            <h2 className="text-3xl font-semibold">{featuredBlog.name}</h2>
            <p
              className="text-gray-700 text-xs line-clamp-3"
              dangerouslySetInnerHTML={{ __html: featuredBlog.description }}
            ></p>
            <Link
              to={`/bloginfo/${featuredBlog.id}`}
              className="text-gray-800 font-semibold text-[12px] py-2"
            >
              Read More →
            </Link>
          </div>
        </div>
      )}

      {/* Blog Section Title & View All Button */}
      <div className="hidden sm:flex justify-between mb-1">
        <div className="text-start">
          <Title text1={"Latest"} text2={"News"} />
        </div>
      </div>

      {/* Blog Items in Grid Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-black">
        {displayedBlogs.map((item) => (
          <div key={item.id}>
            <BlogItem
              id={item.id}
              image={item.image}
              name={item.name}
              readtime={item.readtime}
              topic={item.topic}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

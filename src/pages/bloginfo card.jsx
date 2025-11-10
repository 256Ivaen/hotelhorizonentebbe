import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Share2, Eye } from "lucide-react";

const BlogInfo = () => {
  const { blogid } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [nextBlog, setNextBlog] = useState(null);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchBlogData = () => {
      const currentIndex = assets.blogItem.findIndex(
        (item) => item.id === blogid
      );
      if (currentIndex !== -1) {
        setBlogData(assets.blogItem[currentIndex]);
        setSelectedImageIndex(0);
        const nextIndex = (currentIndex + 1) % assets.blogItem.length;
        setNextBlog(assets.blogItem[nextIndex]);

        // Simulate a view count by generating a random number or using localStorage
        const storedViews = localStorage.getItem(`blog_views_${blogid}`);
        if (storedViews) {
          // Increment view count by 1 when the page is visited
          const newCount = parseInt(storedViews) + 1;
          localStorage.setItem(`blog_views_${blogid}`, newCount.toString());
          setViewCount(newCount);
        } else {
          // Generate initial random view count between 100-1000 for first visit
          const initialCount = Math.floor(Math.random() * 900) + 100;
          localStorage.setItem(`blog_views_${blogid}`, initialCount.toString());
          setViewCount(initialCount);
        }
      }
    };

    fetchBlogData();
  }, [blogid]);

  const handleShare = () => {
    navigator
      .share({
        title: blogData?.name,
        url: window.location.href,
      })
      .catch((error) => console.log("Sharing failed", error));
  };

  if (!blogData) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="sm:mt-20">
      <div className="flex flex-col py-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {/* Blog Title and Topic */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
            <span className="px-5 py-1 bg-green-200 rounded text-xs font-semibold w-fit">
              {blogData.topic}
            </span>
            <button
              onClick={handleShare}
              className="rounded-full transition w-fit"
            >
              <Share2 size={20} className="text-gray-800" />
            </button>
          </div>
          <h1 className="text-2xl font-semibold">{blogData.name}</h1>
          {/* View Count */}
          <div className="flex items-center gap-1 mt-2 text-gray-500 text-sm">
            <Eye size={16} />
            <span>{viewCount.toLocaleString()} views</span>
          </div>
        </div>

        {/* Image Grid - Similar to listing layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <img
              src={blogData.image[0]}
              className="w-full h-[40vh] sm:h-[60vh] object-cover rounded-lg"
              alt="Blog Main"
            />
          </div>

          <div className="flex flex-row sm:flex-col justify-between gap-4">
            {blogData.image.length > 1 && (
              <img
                src={blogData.image[1]}
                className="w-full h-[10vh] sm:h-[29vh] object-cover rounded-lg"
                alt="Blog Secondary"
              />
            )}

            {blogData.image.length > 2 && (
              <img
                src={blogData.image[2]}
                className="w-full h-[10vh] sm:h-[29vh] object-cover rounded-lg"
                alt="Blog Tertiary"
              />
            )}
          </div>
        </div>

        {/* Blog Description */}
        <div className="mb-10">
          <div
            className="text-gray-500 text-sm"
            dangerouslySetInnerHTML={{ __html: blogData.description }}
          ></div>
        </div>

        {/* Next Article Section */}
        {nextBlog && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Next Article</h3>
            <Link
              to={`/bloginfo/${nextBlog.id}`}
              className="block hover:opacity-90"
            >
              <div className="flex flex-col sm:flex-row gap-4 border p-4 rounded-lg">
                <img
                  src={nextBlog.image[0]}
                  alt={nextBlog.name}
                  className="w-full sm:w-48 h-40 object-cover rounded-md"
                />
                <div>
                  <span className="px-3 py-1 bg-green-200 rounded text-xs font-semibold">
                    {nextBlog.topic}
                  </span>
                  <h4 className="text-lg font-medium font-semibold mt-2">
                    {nextBlog.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {nextBlog.description
                      .replace(/<[^>]*>/g, "")
                      .substring(0, 300)}
                    ......
                    <span className="text-gray-500 font-semibold font-italic text-xs">
                      Read More
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogInfo;

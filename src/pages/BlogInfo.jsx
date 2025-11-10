import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Share2, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

const BlogInfo = () => {
  const { blogid } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);
  const [viewCount, setViewCount] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  useEffect(() => {
    const fetchBlogData = () => {
      const currentIndex = assets.blogItem.findIndex(
        (item) => item.id === blogid
      );
      if (currentIndex !== -1) {
        setBlogData(assets.blogItem[currentIndex]);
        const nextIndex = (currentIndex + 1) % assets.blogItem.length;
        setNextBlog(assets.blogItem[nextIndex]);

        const storedViews = localStorage.getItem(`blog_views_${blogid}`);
        if (storedViews) {
          const newCount = parseInt(storedViews) + 1;
          localStorage.setItem(`blog_views_${blogid}`, newCount.toString());
          setViewCount(newCount);
        } else {
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

  const openFullscreen = (index) => {
    setFullscreenImage(blogData.image[index]);
    setFullscreenIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const nextImage = () => {
    const newIndex = (fullscreenIndex + 1) % blogData.image.length;
    setFullscreenIndex(newIndex);
    setFullscreenImage(blogData.image[newIndex]);
  };

  const prevImage = () => {
    const newIndex =
      (fullscreenIndex - 1 + blogData.image.length) % blogData.image.length;
    setFullscreenIndex(newIndex);
    setFullscreenImage(blogData.image[newIndex]);
  };

  if (!blogData) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="sm:mt-20">
      <div className="flex flex-col py-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
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
          <div className="flex items-center gap-1 mt-2 text-gray-500 text-sm">
            <Eye size={16} />
            <span>{viewCount.toLocaleString()} views</span>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <img
              src={blogData.image[0]}
              className="w-full h-[40vh] sm:h-[60vh] object-cover rounded-lg cursor-pointer"
              alt="Blog Main"
              onClick={() => openFullscreen(0)}
            />
          </div>

          <div className="flex flex-row sm:flex-col justify-between gap-4">
            {blogData.image.length > 1 && (
              <img
                src={blogData.image[1]}
                className="w-full h-[10vh] sm:h-[29vh] object-cover rounded-lg cursor-pointer"
                alt="Blog Secondary"
                onClick={() => openFullscreen(1)}
              />
            )}
            {blogData.image.length > 2 && (
              <img
                src={blogData.image[2]}
                className="w-full h-[10vh] sm:h-[29vh] object-cover rounded-lg cursor-pointer"
                alt="Blog Tertiary"
                onClick={() => openFullscreen(2)}
              />
            )}
          </div>
        </div>

        {fullscreenImage && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <button
              onClick={closeFullscreen}
              className="absolute top-5 right-5 text-white text-1xl bg-black p-1 rounded-full shadow-lg"
            >
              <X size={32} />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-5 text-white text-1xl bg-black p-1 rounded-full shadow-lg"
            >
              <ChevronLeft size={40} />
            </button>
            <img
              src={fullscreenImage}
              className="max-w-full max-h-[90%] rounded-lg"
              alt="Fullscreen"
            />
            <button
              onClick={nextImage}
              className="absolute right-5 text-white text-1xl bg-black p-1 rounded-full shadow-lg"
            >
              <ChevronRight size={40} />
            </button>
          </div>
        )}

        <div className="mb-10">
          <div
            className="text-gray-500 text-sm"
            dangerouslySetInnerHTML={{ __html: blogData.description }}
          ></div>
        </div>

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

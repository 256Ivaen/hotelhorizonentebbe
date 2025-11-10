import React from "react";
import { assets } from "../assets/assets";
import RoomItem from "../components/RoomItem";
import BlogIntro from "../components/Blog/BlogIntro";
import MustRead from "../components/Blog/MustRead";
import EditorsPick from "../components/Blog/EditorsPick";
import Subscribe from "../components/Subscribe";

const Blog = ({ showAll = true }) => {
  const displayedRooms = showAll ? assets.roomItem : assets.roomItem.slice(0, 8);

  return (
    <div className="flex flex-col gap-4 pt-10 mt-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10">
      <BlogIntro />
      <MustRead />
      <EditorsPick />
      <Subscribe />
    </div>
  );
};

export default Blog;

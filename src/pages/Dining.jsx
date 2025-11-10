import React from "react";
import { assets } from "../assets/assets";
import RoomItem from "../components/RoomItem";
import DiningIntro from "../components/Dining/DiningIntro";
import MustRead from "../components/Dining/MustRead";
import EditorsPick from "../components/Dining/EditorsPick";
import Subscribe from "../components/Subscribe";
import ReserveTable from "../components/Dining/ReserveTable"

const Dining = ({ showAll = true }) => {

  return (
    <div className="flex flex-col gap-4 pt-10 mt-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10">
      <DiningIntro />
      {/* <MustRead /> */}
      {/* <EditorsPick /> */}
      {/* <Subscribe /> */}
      <ReserveTable />
    </div>
  );
};

export default Dining;

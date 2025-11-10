import React from "react";
import { assets } from "../assets/assets";
import RoomItem from "../components/RoomItem";
import EventsIntro from "../components/Events/EventsIntro";
import MustRead from "../components/Events/MustRead";
import EditorsPick from "../components/Events/EditorsPick";
import Subscribe from "../components/Subscribe";
import Venues from "../components/Events/Venues";

const Events = ({ showAll = true }) => {

  return (
    <div className="flex flex-col gap-4 pt-10 mt-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10">
      {/* <EventsIntro /> */}
      {/* <MustRead /> */}
      {/* <EditorsPick /> */}
      <Venues />
      {/* <Subscribe /> */}
    </div>
  );
};

export default Events;

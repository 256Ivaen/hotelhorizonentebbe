import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import RoomItem from "./RoomItem";
import Title from "./Title";

const Rooms = ({ showAll = true }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rooms from the API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("https://hotelhorizonug.com/get_rooms.php");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Determine which rooms to display
  const displayedRooms = showAll ? rooms : rooms.slice(0, 8);

  if (loading) {
    return <div className="text-center py-8">Loading rooms...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative my-10">
      <div className="text-center py-8">
        <Title text1={"ROOMS &"} text2={"SUITES"} />
        <p className="w-3/4 m-auto text-xs sm:text-xs md:text-base text-gray-600 max-w-[600px]">
          Choose from our selection of luxurious accommodations
        </p>
      </div>

      {/* Swiper for Rooms */}
      <div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={2000}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full"
        >
          {displayedRooms.map((item) => (
            <SwiperSlide key={item.id} className="relative">
              <RoomItem
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                description={item.description}
                beds={item.beds}
                size={item.size}
                guests={item.guests}
                bathrooms={item.bathrooms}
                choice={item.choice}
                cardInfo={item.cardInfo}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Rooms;
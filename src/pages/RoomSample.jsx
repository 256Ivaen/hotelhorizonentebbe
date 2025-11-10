import { useState } from "react";
import { assets } from "../assets/assets";
import { Wifi, Bed, Bath, Coffee, Maximize2 } from "lucide-react";

export default function RoomPage() {
  const [selectedImage, setSelectedImage] = useState("/placeholder.svg?height=500&width=800");

  const images = [
    "/placeholder.svg?height=500&width=800",
    "/placeholder.svg?height=500&width=800",
    "/placeholder.svg?height=500&width=800",
    "/placeholder.svg?height=500&width=800",
  ];

  const [extras, setExtras] = useState({
    airportPick: false,
    airportDrop: false,
    halfBoard: false,
    fullBoard: false,
  });
  

  const roomData = {
    name: "Maxone Ascent Hotel Luxury Kota Malang",
    address: "Jln. Diponegoro V No. 12, Kec. Lowokwaru, Kota Malang",
    rating: "5.0",
    price: 301,
    originalPrice: 501,
    description:
      "A studio apartment in strategic location in Malang. Located nearby Univ Muhammadiyah Malang, Univ Negeri Malang and Univ Brawijaya, this is perfect for students and academics. This is in the main road to Batu, the main tourist attractions in East Java. So, it is well suited for tourists. This has a stunning Arjuna Mountain view with misty ambience in morning. It has kitchen, and cozy sofa and bunk bed & it caters up 3 guests. It has two pools, gyms, futsal field, minimarket and coffee shop.",
  };

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-[5vw] md:px-[8vw] lg:px-[10vw] my-10 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:w-24">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img || "/placeholder.svg"}
                  alt={`Room view ${index + 1}`}
                  className={`w-24 h-24 object-cover cursor-pointer rounded-md ${
                    selectedImage === img ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <div className="flex-1">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Main room view"
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Room Details */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-200 rounded text-sm">{roomData.rating} Perfect</span>
            </div>

            <h1 className="text-2xl font-semibold mb-2">{roomData.name}</h1>
            <p className="text-gray-500 mb-6">{roomData.address}</p>

            <div className="border-b mb-4">
              <nav className="flex gap-4">
                <button className="py-2 px-4 text-blue-600 border-b-2 border-blue-600">Description</button>
              </nav>
            </div>

            <p className="text-gray-500">{roomData.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                <span>Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                <span>Kings Bed</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5" />
                <span>Bathup</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5" />
                <span>Breakfast</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="h-5 w-5" />
                <span>4m x 6m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-white shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-3xl font-semibold">${roomData.price}</span>
                <span className="text-gray-500">/night</span>
                <div className="text-sm text-gray-500 line-through">${roomData.originalPrice}</div>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm">20% OFF</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Check-In</label>
                  <input type="date" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm font-medium">Check-Out</label>
                  <input type="date" className="w-full border rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Guest</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>2 Adults, 1 Children</option>
                  <option>2 Adults, 2 Children</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Extra Features</label>
                <div className="space-y-2">
                <label
                className="flex items-center space-x-2 w-full cursor-pointer p-3 rounded border border-gray-300 justify-between"
                onClick={() => handleExtraChange("airportPick")}
              >
                <div className="flex gap-5 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    checked={extras.airportPick}
                    readOnly
                  />
                  <img
                    src={assets.taxi}
                    alt={name}
                    className="w-[50px] h-[50px]"
                  />
                  <p className="text-xs font-semibold">Airport Pick</p>
                </div>
                <span className="text-sm font-medium ml-auto">$15</span>
              </label>

              <label
                className="flex items-center space-x-2 w-full cursor-pointer p-3 rounded border border-gray-300 justify-between"
                onClick={() => handleExtraChange("airportDrop")}
              >
                <div className="flex gap-5 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    checked={extras.airportDrop}
                    readOnly
                  />
                  <img
                    src={assets.taxi}
                    alt={name}
                    className="w-[50px] h-[50px]"
                  />
                  <p className="text-xs font-semibold">Airport Drop</p>
                </div>
                <span className="text-sm font-medium ml-auto">$15</span>
              </label>

              <label
                className="flex items-center space-x-2 w-full cursor-pointer p-3 rounded border border-gray-300 justify-between"
                onClick={() => handleExtraChange("halfBoard")}
              >
                <div className="flex gap-5 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    checked={extras.halfBoard}
                    readOnly
                  />
                  <img
                    src={assets.extrafood}
                    alt={name}
                    className="w-[50px] h-[50px]"
                  />
                  <p className="text-xs font-semibold">Half Board</p>
                </div>
                <div className="flex flex-col text-right">
                  <p className="text-1xl font-semibold">
                    <span className="font-normal text-[10px]">FROM : </span>$15
                  </p>
                  <span className="text-[10px]">/ stay</span>
                </div>
              </label>

              <label
                className="flex items-center space-x-2 w-full cursor-pointer p-3 rounded border border-gray-300 justify-between"
                onClick={() => handleExtraChange("fullBoard")}
              >
                <div className="flex gap-5 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    checked={extras.fullBoard}
                    readOnly
                  />
                  <img
                    src={assets.extrafood}
                    alt={name}
                    className="w-[50px] h-[50px]"
                  />
                  <p className="text-xs font-semibold">Full Board</p>
                </div>
                <div className="flex flex-col text-right">
                  <p className="text-1xl font-semibold">
                    <span className="font-normal text-[10px]">FROM : </span>$30
                  </p>
                  <span className="text-[10px]">/ stay</span>
                </div>
              </label>
                </div>
              </div>

              <div className="space-y-2">
                
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total Payment</span>
                  <span>$316</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Book Now</button>
              <p className="text-sm text-center text-gray-500">You will not get charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
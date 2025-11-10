import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUpload = () => {
  const [roomData, setRoomData] = useState({
    name: "",
    price: "",
    description: "",
    beds: "",
    size: "",
    guests: "",
    bathrooms: "",
    cardInfo: "",
    choice: "",
    maxKids: "",
    maxAdults: "",
  });
  const [images, setImages] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [extraFacilities, setExtraFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Predefined facilities and extra facilities with icons
  const predefinedFacilities = [
    { name: "1 Single Bed", icon: "smallbed_icon" },
    { name: "Balcony", icon: "balcony" },
    { name: "View", icon: "view" },
    { name: "Flat-screen TV", icon: "tv" },
    { name: "Air conditioning", icon: "ac" },
    { name: "Ensuite bathroom", icon: "bathroomfacility_icon" },
  ];

  const predefinedExtraFacilities = [
    { name: "Free toiletries", icon: "tick_icon" },
    { name: "Safety deposit box", icon: "tick_icon" },
    { name: "Toilet", icon: "tick_icon" },
    { name: "Bath or shower", icon: "tick_icon" },
    { name: "Towels", icon: "tick_icon" },
    { name: "Linen", icon: "tick_icon" },
    { name: "Socket near the bed", icon: "tick_icon" },
    { name: "Desk", icon: "tick_icon" },
    { name: "Private entrance", icon: "tick_icon" },
    { name: "TV", icon: "tick_icon" },
    { name: "Slippers", icon: "tick_icon" },
    { name: "Telephone", icon: "tick_icon" },
    { name: "Ironing facilities", icon: "tick_icon" },
    { name: "Electric kettle", icon: "tick_icon" },
    { name: "Wake-up service", icon: "tick_icon" },
    { name: "Wardrobe or closet", icon: "tick_icon" },
    { name: "Upper floors accessible by elevator", icon: "tick_icon" },
    { name: "Entire unit wheelchair accessible", icon: "tick_icon" },
  ];

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 3 || files.length > 4) {
      toast.error("Please upload between 3 and 4 images.");
      return;
    }
    setImages(files);
  };

  const handleFacilityChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFacilities(selectedOptions);
  };

  const handleExtraFacilityChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setExtraFacilities(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Format description: Replace ** with <strong> and <br/> with <br>
    const formattedDescription = roomData.description
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/<br\/>/g, "<br>");

    const formData = new FormData();

    // Add all form fields to FormData
    Object.keys(roomData).forEach((key) => {
      formData.append(key, key === "description" ? formattedDescription : roomData[key]);
    });

    // Add images to FormData
    images.forEach((image) => {
      formData.append("images[]", image);
    });

    // Add facilities and extra facilities
    formData.append("facilities", JSON.stringify(facilities));
    formData.append("extraFacilities", JSON.stringify(extraFacilities));

    try {
      const res = await axios.post(
        "https://hotelhorizonug.com/upload_room.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Room uploaded successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Reset form on success
        setRoomData({
          name: "",
          price: "",
          description: "",
          beds: "",
          size: "",
          guests: "",
          bathrooms: "",
          cardInfo: "",
          choice: "",
          maxKids: "",
          maxAdults: "",
        });
        setImages([]);
        setFacilities([]);
        setExtraFacilities([]);
        document.getElementById("imageInput").value = "";
      } else {
        toast.error(res.data.message || "Upload failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
      toast.error(
        error.response?.data?.message ||
          "Server error occurred. Please try again later.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 flex gap-5 flex-col py-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <h2 className="text-2xl font-bold">Upload Room</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Form fields */}
        <input
          className="border p-2 rounded"
          type="text"
          name="name"
          placeholder="Room Name"
          value={roomData.name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="number"
          name="price"
          placeholder="Price"
          value={roomData.price}
          onChange={handleChange}
          required
        />
        <textarea
          className="border p-2 rounded"
          name="description"
          placeholder="Description"
          value={roomData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          className="border p-2 rounded"
          type="number"
          name="beds"
          placeholder="Beds"
          value={roomData.beds}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="text"
          name="size"
          placeholder="Room Size"
          value={roomData.size}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="number"
          name="guests"
          placeholder="Max Guests"
          value={roomData.guests}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={roomData.bathrooms}
          onChange={handleChange}
          required
        />
        <textarea
          className="border p-2 rounded"
          name="cardInfo"
          placeholder="Card Info"
          value={roomData.cardInfo}
          onChange={handleChange}
          required
        ></textarea>
        <input
          className="border p-2 rounded"
          type="text"
          name="choice"
          placeholder="Choice"
          value={roomData.choice}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="number"
          name="maxKids"
          placeholder="Max Kids"
          value={roomData.maxKids}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="number"
          name="maxAdults"
          placeholder="Max Adults"
          value={roomData.maxAdults}
          onChange={handleChange}
          required
        />
        <input
          id="imageInput"
          className="border p-2 rounded"
          type="file"
          multiple
          onChange={handleImageChange}
          required
        />
        <select
          className="border p-2 rounded"
          multiple
          onChange={handleFacilityChange}
          required
        >
          {predefinedFacilities.map((facility, index) => (
            <option key={index} value={facility.name}>
              {facility.name}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          multiple
          onChange={handleExtraFacilityChange}
          required
        >
          {predefinedExtraFacilities.map((facility, index) => (
            <option key={index} value={facility.name}>
              {facility.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-900 p-5 text-white rounded-lg hover:bg-blue-800 transition-colors"
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Room"}
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;
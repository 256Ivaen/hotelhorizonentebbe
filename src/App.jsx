import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Reserve from './pages/Reserve';
import Room from './pages/Room';
import Blog from './pages/Blog';
import BlogInfo from './pages/BlogInfo';
import Dining from './pages/Dining';
import Admin from './pages/Admin';
import Events from './pages/Events';
import RoomSample from './pages/RoomSample';
import Service from './pages/Service';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopScroll from './components/TopScroll';
import Pesapal from './pages/Pesapal';

const App = () => {
  return (
    <>
      <Navbar />
      {/* <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"> */}
      <div>
        <ToastContainer />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path='/pesapal' element={<Pesapal />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/roomsample" element={<RoomSample />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/bloginfo/:blogid" element={<BlogInfo />} />
          <Route path="/service/:serviceId" element={<Service />} />
        </Routes>
      </div>

      <Footer />
      <TopScroll />
    </>
  );
};

export default App;

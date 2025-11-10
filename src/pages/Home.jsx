import React from 'react'
import Hero from '../components/Hero'
import HotDeals from '../components/HotDeals'
import Celebrate from '../components/Celebrate'
import Explore from '../components/Explore'
import Rooms from '../components/Rooms'
import Blog from '../components/Blog'
import About from '../components/About'
import Amenities from '../components/Amenities'
import ExploreDinning from '../components/ExploreDinning'
import Offers from '../components/Offers'
import Subscribe from '../components/Subscribe'
import MajorBrands from '../components/MajorBrands'
import WhyPolad from '../components/WhyPolad'
import FAQS from '../components/FrequentQuestions'

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <HotDeals /> */}
      {/* <About /> */}
      {/* <Offers /> */}
      <Rooms />
      {/* <Explore /> */}
      <Amenities />
      {/* <Subscribe /> */}
      {/* <Celebrate /> */}
      <ExploreDinning />
      <Blog />
      {/* <WhyPolad /> */}
      {/* <MajorBrands /> */}
      <FAQS />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-10">
        <Subscribe />
      </div>
    </div>
  )
}

export default Home
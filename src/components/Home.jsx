import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Excellence from '../components/Excellence'
import MajorBrands from '../components/MajorBrands'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Explore from '../components/Explore'
import Services from '../components/Services'
import About from '../components/About'
import WhyPolad from '../components/WhyPolad'
import FAQS from '../components/FAQS'
import Reviews from '../components/Reviews'
import ReviewPlatforms from '../components/ReviewPlatforms'
import HotDeals from '../components/HotDeals'
import Celebrate from '../components/Celebrate'


const Home = () => {
  return (
    <div>
      <Hero />
      <HotDeals />
      {/* <About /> */}
      <Celebrate />
      {/* <Excellence /> */}
      {/* <MajorBrands /> */}
      {/* <Services /> */}
      <WhyPolad />
      {/* <LatestCollection/> */}
      {/* <BestSeller/> */}
      {/* <OurPolicy/> */}
      {/* <NewsletterBox/> */}
      {/* <Explore /> */}
      <Reviews />
      <ReviewPlatforms />
      {/* <FAQS /> */}
    </div>
  )
}

export default Home
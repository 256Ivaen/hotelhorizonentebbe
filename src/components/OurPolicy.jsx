import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around text-xs sm:text-sm md:text-base text-gray-700 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mx-auto'>
      
      <div className='p-5 border-2 border-blue-900 m-2 rounded-[30px]'>
        <img src={assets.vision} className='w-10 mb-2' alt="" />
        <p className=' font-semibold'>Vision</p>
        <p className='text-[12px] text-gray-400'>Customer focus and satisfaction is our motto</p>
      </div>

      <div className='p-5 border-2 border-blue-900 m-2 rounded-[30px]'>
        <img src={assets.mission} className='w-10 mb-2' alt="" />
        <p className=' font-semibold'>Mission</p>
        <p className='text-[12px] text-gray-400'>To exceed customer expectations and be the total solution provider</p>
      </div>

      <div className='p-5 border-2 border-blue-900 m-2 rounded-[30px]'>
        <img src={assets.value} className='w-10 mb-2' alt="" />
        <p className=' font-semibold'>Values</p>
        <p className='text-[12px] text-gray-400'>Encourage innovations to meet the challenges</p>
      </div>

      <div className='p-5 border-2 border-blue-900 m-2 rounded-[30px]'>
        <img src={assets.objective} className='w-10 mb-2' alt="" />
        <p className=' font-semibold'>Objective</p>
        <p className='text-[12px] text-gray-400'>To become leading service provider in industry</p>
      </div>


    </div>
  )
}

export default OurPolicy

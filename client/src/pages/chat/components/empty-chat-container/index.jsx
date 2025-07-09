import { animationDefaultOptions } from '@/lib/utils'
import React from 'react'
import Lottie from 'react-lottie'

const EmptyChatContainer = () => {
  return (
    <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all'>
      <Lottie 
      isClickToPauseDisabled={true}
      height={200}
      width={200}
      options={animationDefaultOptions}
      />
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center"> 
        <h3 className='poppins-medium'>
          Hi there<span className='text-[#ff006e]'>!</span> Welcome to
          <span className='text-[#ff006e]'> Texty </span> 
          <span className='text-[#ff006e]'>.</span>
          
        </h3>

      </div>
    </div>
  )
}

export default EmptyChatContainer
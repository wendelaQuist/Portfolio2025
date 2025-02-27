import React from 'react'
import Elly from '../Images/app-01 - Copy.png'

const Card = () => {
    return(
        <div className='border-2 p-4 shadow-2xl border-pink rounded-lg w-[80%] max-w-[500px]'>
            <div className='relative h-60 mb-4'>
                <img className='absolute w-full h-full object-cover rounded' src={ Elly }></img>
            </div>
            <div className='text-pink'>
                <p className='font-semibold'>Elly</p>
                <p className='text-sm pb-2 font-thin'>Elly is a smart eyewear concept designed for elderly individuals with Alzheimer's, featuring GPS tracking for caregivers and real-time assistance. The glasses help users recognize people and reduce anxiety by playing familiar music, enhancing both safety and comfort.</p>
                <a href="#" className="py-2 px-4 rounded-lg bg-dark-grey border-2 border-pink text-pink dark:text-white hover:bg-light-grey hover:text-pink hover:border-pink text-md">View project</a>
            </div>
        </div>
    )
}

export default Card
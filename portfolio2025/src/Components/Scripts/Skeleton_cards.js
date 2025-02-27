import React from 'react';

const Skeleton = () => {
  return (
    <div className='border-2 p-4 shadow-2xl border-pink rounded-lg w-[80%] max-w-[500px] animate-pulse'>
      <div className='relative h-60 mb-4 p-4 flex justify-center items-center animate-pulse'>
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
          <defs>
            <style>
              {`
                .cls-1 { fill: #f4dae2; }
                .cls-2 { fill: #2b2a31; }
                .cls-3 { opacity: .5; }
              `}
            </style>
          </defs>
          <rect className="cls-2" width="1920" height="1080"/>
          <g className="cls-3">
            <path className="cls-1" d="M1089.26,365h-256.74c-25.75,0-46.63,20.87-46.63,46.62v256.76c0,25.75,20.87,46.62,46.62,46.62h256.75c25.75,0,46.63-20.87,46.63-46.62v-256.76c0-25.75-20.87-46.62-46.62-46.62h-.01ZM1118.39,571.34l-62.6-67.17c-6.01-6.44-16.11-6.8-22.55-.78-.13.13-.27.25-.4.38l-88.97,88.97c-6.85,6.86-17.74,7.52-25.38,1.55l-34.47-26.98c-5.95-4.66-14.36-4.5-20.12.39l-60.51,51.21v-207.29c.02-16.08,13.05-29.11,29.12-29.12h256.75c16.08.02,29.11,13.05,29.13,29.12v159.72h0Z"/>
            <circle className="cls-1" cx="896.28" cy="457.76" r="30.18"/>
          </g>
        </svg>
      </div>
      <div className='animate-pulse'>
        <div className='h-4 bg-light-grey rounded-full mb-4'></div>
        <div className='h-2 bg-light-grey rounded-full mb-3'></div>
        <div className='h-2 bg-light-grey rounded-full mb-3'></div>
        <div className='h-2 bg-light-grey rounded-full mb-3'></div>
      </div>
    </div>
  );
}

export default Skeleton;

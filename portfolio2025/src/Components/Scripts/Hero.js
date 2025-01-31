import React from "react";
import Model from "./3DModel";

const Hero = () => {
  return (
    <main className="bg-dark-grey relative overflow-hidden h-screen flex items-center">
      <div className="container mx-auto px-6 flex h-full items-center">
        {/* Left Side: Text */}
        <div className="sm:w-2/3 lg:w-2/5 flex flex-col justify-center">
          <span className="w-20 h-2 bg-pink dark:bg-white mb-6"></span>
          <h1 className="text-6xl sm:text-8xl font-black leading-none dark:text-white text-pink mb-6">
            Welcome
            <span className="text-5xl sm:text-6xl block overflow-hidden">
              to my portfolio
            </span>
          </h1>
          <p className="text-sm sm:text-base text-pink dark:text-white max-w-xl">
          Let’s explore my journey through innovation and creativity. Ready to start?
          </p>
          <div className="flex mt-6 space-x-4">
            <a href="#" className="py-2 px-4 rounded-lg bg-pink border-2 border-pink text-dark-grey text-md hover:bg-pink-400 hover:text-dark-grey">
            Start
            </a>
            <a href="#" className="py-2 px-4 rounded-lg bg-dark-grey border-2 border-pink text-pink dark:text-white hover:bg-light-grey hover:text-pink hover:border-pink text-md">
              Download C.V.
            </a>
          </div>
        </div>

        {/* Right Side: 3D Model */}
        <div className="w-1/2 flex justify-center items-center relative">
          <div className="w-full h-full flex justify-center items-center">
            <Model />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;

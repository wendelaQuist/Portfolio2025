import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Notebook = ({ scrollProgress }) => {
  const { scene } = useGLTF("/models/Notebook.glb");
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      // Rotate the model based on scroll progress
      ref.current.rotation.y = scrollProgress * Math.PI * 0.8; // Rotate up to 90 degrees
      // Move the model to the right based on scroll progress
      ref.current.position.x = -1 + scrollProgress * 10; // Move up to x = 3
    }
  }, [scrollProgress]);

  return (
    <primitive
      object={scene}
      ref={ref}
      position={[-1, 0, 0]} // Initial position
      rotation={[0.2, -0.8, 0]} // Initial rotation
      scale={10} // Maintain size
      castShadow // Enable shadows
    />
  );
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    // Listen for scroll events to calculate scroll progress
    const handleScroll = () => {
      // Update scroll position
      setScrollY(window.scrollY);
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate scroll progress (0 to 1) based on scroll position
  const scrollProgress = Math.min(scrollY / window.innerHeight, 1);

  return (
    <div className="h-[200vh] bg-dark-grey">
      <div className="h-screen w-screen flex overflow-hidden">
        <div className="w-1/2 flex items-center justify-center">
          {/* Left half content */}
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <Canvas shadows>
            {/* Ambient light for general illumination */}
            <ambientLight intensity={0.5} />
            {/* Directional light for highlights and shadows */}
            <directionalLight
              position={[0, 1, 10]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            {/* Add the model with smooth scrolling interactions */}
            <Notebook scrollProgress={scrollProgress} />
            {/* Disable zoom for OrbitControls */}
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
      <div className="h-[100vh] flex items-center justify-center bg-light-grey">
        <h1>Scroll down to see more content!</h1>
      </div>
    </div>
  );
};

export default Hero;

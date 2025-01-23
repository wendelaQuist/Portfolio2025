import React, { useRef, useEffect } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import Pc from "../models/PC.glb";

const Hero = () => {
  const containerRef = useRef(null);
  let mixer = null; // For controlling animations
  const raycaster = new THREE.Raycaster(); // For detecting mouse hover
  const mouse = new THREE.Vector2(); // For normalized mouse coordinates
  let currentlyHovering = false; // To track hover state
  let timeScale = 0; // To manage animation speed

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(5, 3, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xf4dae2, 3);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xf4dae2, 4);
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    // Load the model
    let model = null;
    const loader = new GLTFLoader();
    loader.load(
      Pc,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(0.2, 0.2, 0.2);
        model.position.set(0, 0, 0);
        scene.add(model);

        // Create mixer and animations
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);

          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopRepeat); // Loop the animation
            action.clampWhenFinished = true; // Stay at the end frame when finished
            action.paused = true; // Start paused
            action.play(); // Prepare action
          });
        }
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // Handle mouse movement
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Smoothly start the animation
    const smoothStart = () => {
      if (timeScale < 1) {
        timeScale += 0.1;
        mixer._actions.forEach((action) => {
          action.timeScale = timeScale;
          action.paused = false;
        });
        requestAnimationFrame(smoothStart);
      }
    };

    // Smoothly stop the animation
    const smoothStop = () => {
      if (timeScale > 0) {
        timeScale = Math.max(0, timeScale - 0.05); // Reduce timeScale gradually
        mixer._actions.forEach((action) => {
          action.timeScale = timeScale; // Apply the reduced speed
        });
        if (timeScale > 0) {
          requestAnimationFrame(smoothStop); // Continue reducing timeScale
        } else {
          // Once timeScale reaches 0, pause all actions
          mixer._actions.forEach((action) => {
            action.paused = true;
          });
        }
      }
    };    

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      if (model) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(model, true);

        if (intersects.length > 0) {
          if (!currentlyHovering) {
            currentlyHovering = true;
            smoothStart(); // Start animation smoothly
          }
        } else {
          if (currentlyHovering) {
            currentlyHovering = false;
            smoothStop(); // Stop animation smoothly
            console.log("smooth stop stopped")
          }
        }
      }

      if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }

      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="container3D"
      style={{ width: "100vw", height: "100vh" }}
      className="bg-dark-grey"
    ></div>
  );
};

export default Hero;

import React, { useRef, useEffect } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import Pc from "../models/PC.glb"; // Ensure the model path is correct

const Model = () => {
  const containerRef = useRef(null);
  let mixer = null; // For controlling animations
  const raycaster = new THREE.Raycaster(); // For detecting mouse hover
  const mouse = new THREE.Vector2(); // For normalized mouse coordinates
  let currentlyHovering = false; // To track hover state
  let timeScale = 0; // To manage animation speed

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scene, camera, and renderer
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const aspectRatio = width / height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45, 
      aspectRatio, 
      0.1, 
      1000);
    camera.position.set(0, 0, 10);


    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);


    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // ✅ Add OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // Smooth movement
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.rotateSpeed = 0.5; // Adjust rotation speed
      controls.enableZoom = false;


    // Load the model
    let model = null;
    let mixer = null;
    const loader = new GLTFLoader();
    loader.load(
      Pc,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(0.3, 0.3, 0.3); // Keep the scale intact
        model.position.set(-1, 1, 0);
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
      const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
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

      controls.update();

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
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
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
  style={{
    width: "100%",
    height: "80vh", // Adjust for navbar height
    maxHeight: "100vh",
    maxWidth: "100vw",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: "16/9",
  }}
  className="bg-dark-grey animate-appear z-10 flex justify-center items-center"
></div>

  );
};

export default Model;

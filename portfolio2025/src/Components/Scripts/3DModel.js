import React, { useRef, useEffect } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import Pc from "../models/PC.glb"; // Ensure the model path is correct

const Model = () => {
  const containerRef = useRef(null);
  const raycaster = new THREE.Raycaster(); // For detecting mouse hover
  const mouse = new THREE.Vector2(); // For normalized mouse coordinates
  let timeScale = 0;
  let targetTimeScale = 0; // Target time scale for smooth transition
  let lerpSpeed = 0.1; // Speed of the smooth transition (change as needed)
  let currentlyHovering = false; // To track hover state
  
  // Store original position and rotation of the model
  const originalPosition = new THREE.Vector3();
  const originalRotation = new THREE.Euler();
  const cameraOriginalPosition = new THREE.Vector3(0, 0, 10); // Camera reset position

  // Variables to manage the reset timeout
  let resetTimeout = null;
  let isResetting = false;

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scene, camera, and renderer
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const aspectRatio = width / height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 10); // Soft pink light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Add OrbitControls
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

        originalPosition.copy(model.position);
        originalRotation.copy(model.rotation);

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);

          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopRepeat); // Loop the animation
            action.clampWhenFinished = true; // Stay at the end frame when finished
            action.paused = false; // Start paused
            action.timeScale = 0;
            action.play(); // Prepare action
          });
        } else{
          console.log("No animations found on the model.")
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

    // Function to handle the reset smoothly
    const resetView = () => {
      if (isResetting) return; // Prevent multiple resets

      isResetting = true;

      // Start the reset process, but smooth it over time
      targetTimeScale = 0; // Reset the animation speed

      setTimeout(() => {
        isResetting = false; // Reset flag after smooth transition
      }, 1000); // You can adjust this timeout as needed for smooth reset
    };

    // Check if the user is interacting with the controls
    const controlsUpdate = () => {
      if (controls.enabled && controls.target && (controls.object.position.distanceTo(controls.target) > 0.1)) {
        // The user is interacting with the scene
        clearTimeout(resetTimeout); // Clear previous timeout
        resetTimeout = setTimeout(() => {
          resetView(); // Call resetView after a delay
        }, 2000); // Wait for 2 seconds after interaction ends
      }
    };

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      renderer.setAnimationLoop(animate);

      const delta = clock.getDelta();

      if(mixer) mixer.update(delta);
      renderer.render(scene, camera);

      // Smooth transition of timeScale
      if (timeScale !== targetTimeScale) {
        timeScale = THREE.MathUtils.lerp(timeScale, targetTimeScale, lerpSpeed);
      }

      if (mixer && mixer._actions.length > 0) {
        mixer._actions.forEach((action) => {
          action.timeScale = timeScale; // Apply smooth timeScale
          action.paused = timeScale === 0; // Pause when the timeScale is 0
        });
      }

      // Smoothly interpolate camera position
      camera.position.lerp(cameraOriginalPosition, lerpSpeed);

      raycaster.setFromCamera(mouse, camera);

      // Smoothly interpolate model position
      if (model) {
        model.position.lerp(originalPosition, lerpSpeed);

        // Smoothly interpolate model rotation (x, y, z axis)
        model.rotation.set(
          THREE.MathUtils.lerp(model.rotation.x, originalRotation.x, lerpSpeed),
          THREE.MathUtils.lerp(model.rotation.y, originalRotation.y, lerpSpeed),
          THREE.MathUtils.lerp(model.rotation.z, originalRotation.z, lerpSpeed)
        );
      }

      controls.update();
      controlsUpdate(); // Update check for interaction
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

      if (mixer) {
        mixer.stopAllAction();
        mixer.uncacheRoot(model);
      }

      while (containerRef.current?.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  });

  return (
    <div
      ref={containerRef}
      id="container3D"
      style={{
        width: "100%",
        height: "80vh", // Adjust for navbar height
        maxWidth: "100vw",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: "16/9",
      }}
      className="bg-dark-grey animate-appear z-10 flex justify-center items-center"
    />
  );
};

export default Model;

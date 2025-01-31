import React, { useRef, useEffect } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import Pc from "../models/PC.glb"; // Ensure the model path is correct

const Model = () => {
  const containerRef = useRef(null);
  const raycaster = new THREE.Raycaster(); // For detecting mouse hover
  const mouse = new THREE.Vector2(); // For normalized mouse coordinates
  let currentlyHovering = false; // To track hover state
  let timeScale = 0; // Start with paused animation
  let targetTimeScale = 0; // Target time scale for smooth transition
  let lerpSpeed = 0.1; // Speed of the smooth transition (change as needed)

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

    // Smooth Start function
    const smoothStart = () => {
      targetTimeScale = 1; // Target speed for animation
    };

    // Smooth Stop function
    const smoothStop = () => {
      targetTimeScale = 0; // Target to stop animation
    };

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

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

      // Update raycaster based on mouse position
      raycaster.setFromCamera(mouse, camera);

      if (model) {
        const intersects = raycaster.intersectObject(model, true) || [];
        if (intersects.length > 0 && !currentlyHovering) {
          currentlyHovering = true;
          smoothStart(); // Smooth start animation
        } else if (currentlyHovering && intersects.length === 0) {
          currentlyHovering = false;
          smoothStop(); // Smooth stop animation
        }
      }

      if (mixer) mixer.update(clock.getDelta());

      controls.update();
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

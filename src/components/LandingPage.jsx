import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LandingPage.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    //Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);

    document.body.appendChild(renderer.domElement);
    document.body.style.height = '500vh';

    //Lighting
    const light = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    //Video Background
    const video = document.createElement('video');
    video.src = '/assets/intro.mp4';
    video.loop = true;
    video.muted = true;
    video.load();

    const startVideo = () => {
      video.play().catch((error) => console.error('Video play error:', error));
      window.removeEventListener('click', startVideo);
    };

    window.addEventListener('click', startVideo);

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.scale.set(window.innerWidth / window.innerHeight, 1, 1);
    plane.position.z = -1;
    scene.add(plane);

    //GLTF Model
    const loader = new GLTFLoader();
    let propeller = null;

    loader.load(
      './a.glb',
      (gltf) => {
        propeller = gltf.scene;
        propeller.scale.set(10, 10, 10);
        propeller.position.set(15, 0, 0);
        propeller.rotation.x = Math.PI / 2;
        scene.add(propeller);
        console.log('Model loaded successfully!');
      },
      undefined,
      (error) => console.error('GLTF load error:', error)
    );

    //OrbitControls Setup with Restrictions
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 4;
    controls.minAzimuthAngle = -Math.PI / 4;
    controls.maxAzimuthAngle = Math.PI / 4;
    controls.enablePan = false;
    controls.enableZoom = true;

    //Propeller Interaction
    const mouse = new THREE.Vector2();
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      if (propeller) {
        propeller.rotation.x = Math.PI / 2 + THREE.MathUtils.clamp(mouse.y * Math.PI / 6, -Math.PI / 6, Math.PI / 6);
        propeller.rotation.y = THREE.MathUtils.clamp(mouse.x * Math.PI / 3, -Math.PI / 3, Math.PI / 3);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    //Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (propeller) {
        propeller.rotation.y += 0.05;
        propeller.position.x = (window.scrollY / window.innerHeight) * 5;
        propeller.position.y = -(window.scrollY / window.innerHeight);
      }
      camera.position.z = 10 + (window.scrollY / window.innerHeight) * 20;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
    camera.position.z = 100;

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', startVideo);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
      <nav
        style={{
          position: 'absolute',
          top: 10,
          left: 0,
          width: '100%',
          background: 'transparent',
          zIndex: 1,
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
      </nav>
      <img
        src="logo.png"
        alt="Logo"
        style={{
          position: 'absolute',
          top: '71px',
          right: '1px',
          height: '80px',
          filter: 'brightness(1)',
          opacity: 10,
          zIndex: 10,
        }}
      />
      <div
        className="text-overlay"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '75px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '114px',
          zIndex: 15,
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
        }}
      >
        Electrifying Global Aviation
      </div>
      <div
        className="text-overlay"
        style={{
          position: 'absolute',
          bottom: '650px',
          left: '875px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px',
          zIndex: 15,
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
        }}
      >
        Click and drag the propeller to view in 3D
      </div>
      <div
        className="text-overlay"
        style={{
          position: 'absolute',
          bottom: '70px',
          left: '1605px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '24px',
          zIndex: 15,
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
        }}
      >
        <Link to="/know-more" style={{ color: 'white', textDecoration: 'none' }}>
          Click here to know more
        </Link>
      </div>
    </>
  );
};

export default LandingPage;

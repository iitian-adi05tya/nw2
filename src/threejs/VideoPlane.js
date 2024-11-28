import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const VideoPlane = () => {
  const videoRef = useRef();
  const planeRef = useRef();

  useEffect(() => {
    // Video element
    const video = document.createElement('video');
    video.src = '/assets/intro.mp4'; // Path to your video
    video.crossOrigin = 'anonymous';
    video.loop = false;
    video.muted = true;
    video.play();
    videoRef.current = video;

    // Video texture
    const texture = new THREE.VideoTexture(video);

    // Attach texture to material
    if (planeRef.current) {
      planeRef.current.material.map = texture;
      planeRef.current.material.needsUpdate = true;
    }
  }, []);

  return (
    <mesh ref={planeRef} position={[0, 0, -2]}>
      <planeGeometry args={[16, 9]} />
      <meshBasicMaterial />
    </mesh>
  );
};

export default VideoPlane;

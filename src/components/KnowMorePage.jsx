import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './KnowMorePage.css';

const KnowMorePage = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/assets/i7.png',
    '/assets/i8.png',
  ];
  const images1 = [
    '/assets/i9.png',
    '/assets/i10.png',
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { offsetWidth: width, offsetHeight: height } = card;
    const { offsetX: x, offsetY: y } = e.nativeEvent;

    const xTilt = (y / height - 0.5) * 30;
    const yTilt = (x / width - 0.5) * -30;

    setTilt({ x: xTilt, y: yTilt });
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextImage();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="know-more-page">
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

      <div className="nwa-news-text">
        NWA News and Reports
      </div>

      <div className="know-more-content">
        <Link to="/" style={{ textDecoration: 'none', fontSize: '18px' }}>
          Go Back to Landing Page
        </Link>
      </div>

      <div className="image-cards">
        <div
          className="card"
          onMouseMove={handleMouseMove}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <img src="/assets/i1.png" alt="Aviation News" className="card-img" />
          <div className="card-content">
            <h2>Image 1</h2>
          </div>
        </div>
        <div
          className="card"
          onMouseMove={handleMouseMove}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <img src="/assets/i2.png" alt="Industry Trends" className="card-img" />
          <div className="card-content">
            <h2>Image 2</h2>
          </div>
        </div>
        <div
          className="card"
          onMouseMove={handleMouseMove}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <img src="/assets/i3.png" alt="Reports" className="card-img" />
          <div className="card-content">
            <h2>Image 3</h2>
          </div>
        </div>
      </div>

      <div className="electric-aviation-text">
        <h1 className="main-heading">Pioneering Electric Aviation</h1>
        <h2 className="sub-heading">We're India's 1st Electric Propulsion Technology Company.</h2>
        <p className="mission-paragraph">
          Our mission is to contribute to the global effort of sustainable aviation by developing advanced electric propulsion systems for aircrafts & unmanned systems. We believe that the future of flight lies in the integration of electric power & are committed to working towards a cleaner & more efficient industry.
        </p>
      </div>

      <div className="electric-aviation-text">
        <h1 className="main-heading">UAV Propulsion</h1>
      </div>

      <div className="image-cards">
        <div
          className="card"
          onMouseMove={handleMouseMove}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <img src="/assets/i4.png" alt="Aviation News" className="card-img" />
          <div className="card-content">
            <h1>Enterprise</h1>
            <p> Propulsion Solutions tailored to get the best out of your UAV platform</p>
          </div>
        </div>
        <div
          className="card"
          onMouseMove={handleMouseMove}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <img src="/assets/i5.png" alt="Industry Trends" className="card-img" />
          <div className="card-content">
            <h1>Defence</h1>
            <p> High Performance - Mission Specific Propulsion Solutions built to withstand most challenging environments</p>
          </div>
        </div>
        <div
          className="card"
          onMouseMove={handleMouseMove}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <img src="/assets/i6.png" alt="Reports" className="card-img" />
          <div className="card-content">
            <h1>Store</h1>
            <p> Explore our ready to integrate propeller & motor lineup</p>
          </div>
        </div>
      </div>

      <div className="carousel-container">
        <button className="carousel-button prev" onClick={goToPreviousImage}>&#8592;</button>
        <div className="carousel-image-container">
          <img
            src={images[currentImageIndex]}
            alt="carousel"
            className="carousel-image"
          />
        </div>
        <button className="carousel-button next" onClick={goToNextImage}>&#8594;</button>
      </div>
      <div className="electric-aviation-text">
        <h3 className="sub-heading">An electric propulsion technology for the aviation industry.</h3>
        <h2 className="main-heading">Fly Beyond Exellence</h2>
      </div>
      <div className="electric-aviation-text">
        <h1 className="main-heading">Meet Our People</h1>
      </div>
      <div className="carousel-image-container">
          <img
            src={images1[currentImageIndex]}
            alt="carousel"
            className="carousel-image"
          />
        </div>
        <footer className="footer">
        <div className="footer-info">
          <p>📍 Jakkur, Bangalore</p>
          <p>📞 +91-XXX-XXX-XXXX</p>
          <p>✉️ info@nauticalwingsaerospace.com</p>
        </div>
        <div className="footer-links">
          <ul>
            <li>Enterprise</li>
            <li>Electric Aviation</li>
            <li>Innovation Centre</li>
            <li>Experience Centre</li>
            <li>Launchpad</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Quality & Safety</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default KnowMorePage;

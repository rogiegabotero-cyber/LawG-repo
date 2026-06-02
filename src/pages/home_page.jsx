import React, { useState, useEffect } from 'react';
import './home_page.css';
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Background from '../assets/background.webp';
import Background1 from '../assets/background1.webp';

const HomePage = () => {
  const images = [Background, Background1];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextImage, setNextImage] = useState(null);
  const [slideDirection, setSlideDirection] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [textAnimate, setTextAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    document.title = " David Grossman & Associates";
  
    return () => clearInterval(interval);
    
  }, [currentIndex]);

  const triggerTextAnimation = () => {
    setTextAnimate(false);
    setTimeout(() => setTextAnimate(true), 50);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setSlideDirection('right');
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setNextImage(images[nextIndex]);
    setIsAnimating(true);
    triggerTextAnimation();
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsAnimating(false);
    }, 1000);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setSlideDirection('left');
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setNextImage(images[prevIndex]);
    setIsAnimating(true);
    triggerTextAnimation();
    setTimeout(() => {
      setCurrentIndex(prevIndex);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div id="main">
      <div className="slide-container">
        <div
          className={`slide current ${isAnimating ? slideDirection : ''}`}
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.42)), url(${images[currentIndex]})`,
          }}
        ></div>

        {isAnimating && (
          <div
            className={`slide next ${slideDirection}`}
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.32)), url(${nextImage})`,
            }}
          ></div>
        )}
      </div>

      <h1 className={textAnimate ? 'text-slide' : ''}>David Grossman & Associates</h1>
      <h2 className={textAnimate ? 'text-slide' : ''}>Your Legal Solution Starts Here</h2>

      
      <div className="slider-arrows">
        <button className="arrow_left" onClick={handlePrev}>
          <ChevronLeft size={40} />
        </button>

        <div className={textAnimate ? 'text-slide' : ''}>
          <Link to="/contact_page">
            <button>Contact us</button>
          </Link>
        </div>

        <button className="arrow_right" onClick={handleNext}>
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <h1 className="hero-title">Hey, Mohammed here</h1>

        <p className="hero-description">
          Data Scientist in Chicago 
        </p>

        <blockquote className="hero-quote">
          “Bridging data and intuition to build impactful, intelligent systems.”
        </blockquote>

        <div className="hero-image">
          <img src="/hero-single-line.svg" alt="Sketch of person at computer" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

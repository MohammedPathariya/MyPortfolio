import React from 'react';
import './Hero.css';
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaInstagram } from 'react-icons/fa';

const Hero = () => (
  <section id="home" className="hero">
    <div className="hero-left">
      <h1 className="hero-heading">
        Hi, Mohammed here <span role="img" aria-label="waving hand">👋</span>
      </h1>

      <p className="hero-subheading">
        Machine Learning Engineer in Bloomington, Indiana 🇺🇸
      </p>
      {/* Two-line, left-aligned tagline */}
      <p className="hero-tagline">
        I build predictive models and apply LLMs to analyze complex data. <br/>
        I translate my findings into actionable business strategy.
      </p>

      <div className="hero-cta">
        <strong>
          Got questions? Submit a ticket to Mohammed Support<span>&rarr;</span>
        </strong>
      </div>

      <div className="hero-buttons">
        <a
          href="/Mohammed_Resume.pdf"
          className="hero-resume-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume <FaDownload />
        </a>

        <div className="hero-social">
          <a
            href="https://www.linkedin.com/in/mjpathariya/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/MohammedPathariya"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/mohammedjp08/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a href="mailto:mjpathar@iu.edu" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>

    <div className="hero-right">
      <img
        src="/images/hero-banner.jpeg"
        alt="Mohammed Pathariya"
        className="hero-photo"
      />
    </div>
  </section>
);

export default Hero;

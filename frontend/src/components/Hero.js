import React from 'react';
import './Hero.css';
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaInstagram } from 'react-icons/fa';
import portfolio from '../data/portfolio.generated';

const Hero = () => (
  <>
  <section id="home" className="hero">
    <div className="hero-left">
      <h1 className="hero-heading">
        Hi, Mohammed here <span role="img" aria-label="waving hand">👋</span>
      </h1>

      <p className="hero-subheading">
        {portfolio.person.role} in {portfolio.person.location}
      </p>
      {/* Two-line, left-aligned tagline */}
      <p className="hero-tagline">
        {portfolio.person.tagline}
      </p>

      <div className="hero-cta">
        <strong 
          className="chat-trigger" 
          onClick={() => document.querySelector('.chat-toggle').click()}
          style={{ cursor: 'pointer' }}
        >
          Have questions? Chat with my AI assistant <span>&rarr;</span>
        </strong>
      </div>

      <div className="hero-buttons">
        <a
          href={portfolio.person.resumePath}
          className="hero-resume-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume <FaDownload />
        </a>

        <div className="hero-social">
          <a
            href={portfolio.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={portfolio.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={portfolio.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a href={`mailto:${portfolio.contact.email}`} aria-label="Email">
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
  </>
);

export default Hero;

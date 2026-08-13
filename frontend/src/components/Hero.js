import React from 'react';
import './Hero.css';
import AnimatedHeroIllustration from './AnimatedHeroIllustration';
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa';
import portfolio from '../data/portfolio.generated';

const Hero = () => (
  <section id="home" className="hero">
    <div className="hero-left">
      <p className="hero-eyebrow">Hi, I&apos;m Mohammed Pathariya.</p>
      <h1 className="hero-heading">I build AI systems that hold up in the real world.</h1>
      <p className="hero-tagline">{portfolio.person.headline}</p>

      <div className="hero-chat-cta">
        <button
          type="button"
          className="chat-trigger"
          onClick={() => document.querySelector('.chat-toggle').click()}
        >
          Have questions? Ask my portfolio assistant <span>&rarr;</span>
        </button>
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
          <a href={`mailto:${portfolio.contact.email}`} aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>

    <div className="hero-right">
      <AnimatedHeroIllustration
        alt="Mohammed Pathariya working at a desk"
      />
    </div>
  </section>
);

export default Hero;

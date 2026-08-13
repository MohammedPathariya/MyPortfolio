import React from 'react';
import './Hero.css';
import AnimatedHeroIllustration from './AnimatedHeroIllustration';
import portfolio from '../data/portfolio.generated';

const Hero = () => (
  <section id="home" className="hero">
    <div className="hero-left">
      <p className="hero-eyebrow">{portfolio.person.role}</p>
      <h1 className="hero-heading">{portfolio.person.headline}</h1>
      <p className="hero-tagline">{portfolio.person.tagline}</p>

      <div className="hero-chat-cta">
        <button
          type="button"
          className="chat-trigger"
          onClick={() => document.querySelector('.chat-toggle').click()}
        >
          Questions about the work? Ask the portfolio assistant <span>&rarr;</span>
        </button>
      </div>

      <div className="hero-links" aria-label="Professional links">
        <a
          href={portfolio.person.resumePath}
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
        <span aria-hidden="true">·</span>
        <a href={portfolio.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span aria-hidden="true">·</span>
        <a href={portfolio.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <span aria-hidden="true">·</span>
        <a href={`mailto:${portfolio.contact.email}`}>Email</a>
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

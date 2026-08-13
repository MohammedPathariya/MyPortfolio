import React from 'react';
import portfolio from '../data/portfolio.generated';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div>
        <h2>Let&apos;s build something that works.</h2>
        <a className="footer-email" href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a>
      </div>
      <div className="footer-links">
        <a href={portfolio.person.resumePath} target="_blank" rel="noopener noreferrer">Resume</a>
        <span aria-hidden="true">·</span>
        <a href={portfolio.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span aria-hidden="true">·</span>
        <a href={portfolio.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <p>© {new Date().getFullYear()} {portfolio.person.name}</p>
      </div>
    </footer>
  );
};

export default Footer;

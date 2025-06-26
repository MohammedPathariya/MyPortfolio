import React from 'react';
import './Header.css';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Left side: custom logo */}
        <div className="header-left">
          <Logo />
        </div>

        {/* Right side: nav links */}
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="/Mohammed_Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-button">Resume</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

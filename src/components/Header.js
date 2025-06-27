import React from 'react';
import './Header.css';
import ThemeToggle from './ThemeToggle';
import { FaComments } from 'react-icons/fa';

const Header = () => {
  const handleChatClick = () => {
    // TODO: hook this up to open your chat widget/modal
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Left: nav links */}
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Right: theme toggle + chat button */}
        <div className="header-controls">
          <ThemeToggle />
          <button
            className="chat-toggle"
            onClick={handleChatClick}
            aria-label="Open chat"
          >
            <FaComments />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

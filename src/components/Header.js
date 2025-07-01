import React from 'react';
import './Header.css';
import ThemeToggle from './ThemeToggle';
import { TbMessageChatbot } from 'react-icons/tb';

const Header = () => {
  const handleChatClick = () => {
    // TODO: hook this up to open your chat widget/modal
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Nav links always visible, inline */}
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#education-experience">Journey</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Theme toggle & chat button */}
        <div className="header-controls">
          <ThemeToggle />
          <button
            className="chat-toggle"
            onClick={handleChatClick}
            aria-label="Open chat"
          >
            <TbMessageChatbot />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

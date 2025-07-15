import React, { useState } from 'react';
import './Header.css';
import ThemeToggle from './ThemeToggle';
import { TbMessageChatbot } from 'react-icons/tb';
import ChatWidget from './ChatWidget';

const Header = () => {
  const [showChat, setShowChat] = useState(false);

  const handleChatClick = () => {
    setShowChat(prev => !prev);
  };

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          {/* Nav links */}
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
              // Adds the 'strikethrough' class when chat is not shown
              className={`chat-toggle ${!showChat ? 'strikethrough' : ''}`}
              onClick={handleChatClick}
              aria-label={showChat ? 'Close chat' : 'Open chat'}
            >
              <TbMessageChatbot />
            </button>
          </div>
        </div>
      </header>

      {/* Render chatbot */}
      <ChatWidget isOpen={showChat} />
    </>
  );
};

export default Header;
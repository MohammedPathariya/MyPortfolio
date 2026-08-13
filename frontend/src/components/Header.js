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
          <a className="header-name" href="#home">Mohammed Pathariya</a>

          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header-controls">
            <button
              className="chat-toggle"
              onClick={handleChatClick}
              aria-label={showChat ? 'Close chat' : 'Open chat'}
              aria-expanded={showChat}
            >
              <TbMessageChatbot />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <ChatWidget isOpen={showChat} />
    </>
  );
};

export default Header;

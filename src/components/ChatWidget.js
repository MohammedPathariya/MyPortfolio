import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import { TbMessageChatbot } from 'react-icons/tb';
import { FaRegUser, FaPaperPlane, FaTrashAlt } from 'react-icons/fa';

const ChatWidget = ({ isOpen }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything about Mohammed’s portfolio.' }
  ]);
  const [input, setInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    const botReply = {
      sender: 'bot',
      text: 'Mohammed completed his undergrad in AI & DS from Pune University in 2024.'
    };

    setMessages(prev => [...prev, userMessage, botReply]);
    setInput('');
  };

  const handleClear = () => setMessages([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className={`chat-widget-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="chat-header">
        <div>
          <span className="chat-status-dot"></span>
          <span className="chat-title">Portfolio Support</span>
        </div>
        <span className="chat-collapse" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '⌄' : '⌃'}
        </span>
      </div>

      {!isCollapsed && (
        <div className="chat-widget">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="chat-avatar">
                    <TbMessageChatbot className="chat-icon" />
                  </div>
                )}
                <div className="chat-bubble">{msg.text}</div>
                {msg.sender === 'user' && (
                  <div className="chat-avatar">
                    <FaRegUser className="chat-icon" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <button onClick={handleClear} className="chat-clear">
              <FaTrashAlt />
            </button>
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend} className="chat-send">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

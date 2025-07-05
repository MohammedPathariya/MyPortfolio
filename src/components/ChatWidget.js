import React, { useState } from 'react';
import './ChatWidget.css';
import { TbMessageChatbot } from 'react-icons/tb';
import { FaRegUser, FaPaperPlane, FaTrashAlt } from 'react-icons/fa';

const ChatWidget = ({ isOpen }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything about Mohammed’s portfolio.' }
  ]);
  const [input, setInput] = useState('');

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

  const handleClear = () => {
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-widget-wrapper">
      <div className="chat-header">
        <div>
          <span className="chat-status-dot"></span>
          <span className="chat-title">Portfolio Support</span>
        </div>
        {/* Optional collapse arrow */}
        <span className="chat-collapse">⌃</span>
      </div>

      <div className="chat-widget">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              <div className="chat-bubble">
                {msg.text}
              </div>
              <div className="chat-avatar">
                {msg.sender === 'bot' ? (
                  <TbMessageChatbot className="chat-icon bot-icon" />
                ) : (
                  <FaRegUser className="chat-icon user-icon" />
                )}
              </div>
            </div>
          ))}
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
          />
          <button onClick={handleSend} className="chat-send">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;

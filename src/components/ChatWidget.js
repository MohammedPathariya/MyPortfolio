import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import { TbMessageChatbot } from 'react-icons/tb';
import {
  FaRegUser,
  FaTrashAlt,
  FaPaperPlane,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa';

const ChatWidget = ({ isOpen }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! Ask me anything about Mohammed’s portfolio.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botReply = {
        sender: 'bot',
        text: data.response || 'Sorry, I could not get a response.',
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong.' },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleClear = () => setMessages([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className={`chat-widget-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="chat-header">
        <div>
          <span className="chat-status-dot"></span>
          <span className="chat-title">Mohammed Support</span>
        </div>
        <span className="chat-collapse" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <FaAngleDown /> : <FaAngleUp />}
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
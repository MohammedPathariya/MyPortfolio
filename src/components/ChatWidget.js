import React, { useState } from 'react';
import './ChatWidget.css';
import { TbMessageChatbot } from 'react-icons/tb'; // chatbot icon

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

  if (!isOpen) return null;

  return (
    <div className="chat-widget">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            <div className="chat-avatar">
              {msg.sender === 'bot' ? (
                <TbMessageChatbot className="chat-icon bot-icon" />
              ) : (
                <i className="fa-regular fa-user chat-icon user-icon"></i>
              )}
            </div>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me something..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;

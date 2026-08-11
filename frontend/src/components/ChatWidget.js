import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import ReactMarkdown from 'react-markdown';
import { TbMessageChatbot } from 'react-icons/tb';
import {
  FaRegUser,
  FaTrashAlt,
  FaPaperPlane,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const maxMessageLength = 1000;
const requestTimeoutMs = 15000;
const maxRetries = 1;
const initialMessage = {
  sender: 'bot',
  text: 'Hi! Ask me anything about Mohammed’s portfolio.',
};

const ChatWidget = ({ isOpen }) => {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const messagesEndRef = useRef(null);

  const requestChat = async (message) => {
    if (!apiBaseUrl) throw new Error('Chat is not configured for this deployment.');

    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMs);

      try {
        const response = await fetch(`${apiBaseUrl.replace(/\/$/, '')}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
          signal: controller.signal,
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'The chatbot request failed.');
        return data.response || 'Sorry, I could not get a response.';
      } catch (error) {
        lastError = error.name === 'AbortError'
          ? new Error('The chatbot took too long to respond.')
          : error;
        if (attempt < maxRetries) continue;
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    throw lastError;
  };

  const handleSend = async (message = input, { isRetry = false } = {}) => {
    const trimmedMessage = message.trim();
    setInputError('');
    if (trimmedMessage === '' || isLoading) return;
    if (trimmedMessage.length > maxMessageLength) {
      setInputError(`Keep your message under ${maxMessageLength} characters.`);
      return;
    }

    if (isRetry) {
      setMessages((prev) => prev.filter(msg => msg.retryMessage !== trimmedMessage));
    } else {
      setMessages((prev) => [...prev, { sender: 'user', text: trimmedMessage }]);
    }
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await requestChat(trimmedMessage);
      setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, {
        sender: 'bot',
        text: `I couldn't reach the chatbot. ${error.message}`,
        type: 'error',
        retryMessage: trimmedMessage,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([initialMessage]);
    setInput('');
    setInputError('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div
      className={`chat-widget-wrapper ${isCollapsed ? 'collapsed' : ''}`}
      role="dialog"
      aria-label="Mohammed portfolio chatbot"
    >
      <div className="chat-header">
        <div>
          <span className="chat-status-dot" aria-hidden="true"></span>
          <span className="chat-title">Mohammed Support</span>
        </div>
        <button
          className="chat-collapse"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand chatbot' : 'Collapse chatbot'}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="chat-widget">
          <div className="chat-messages" aria-live="polite" aria-busy={isLoading}>
            {messages.map((msg, index) => (
              <div key={`${msg.sender}-${index}`} className={`chat-message ${msg.sender} ${msg.type || ''}`}>
                {msg.sender === 'bot' && (
                  <div className="chat-avatar" aria-hidden="true">
                    <TbMessageChatbot className="chat-icon" />
                  </div>
                )}
                <div className="chat-bubble" role={msg.type === 'error' ? 'alert' : undefined}>
                  {msg.sender === 'bot' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
                  {msg.retryMessage && (
                    <button
                      className="chat-retry"
                      onClick={() => handleSend(msg.retryMessage, { isRetry: true })}
                      disabled={isLoading}
                    >
                      Retry
                    </button>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="chat-avatar" aria-hidden="true">
                    <FaRegUser className="chat-icon" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && <div className="chat-loading" role="status">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={(event) => { event.preventDefault(); handleSend(); }}>
            <label className="sr-only" htmlFor="chat-input">Ask the portfolio chatbot</label>
            <button type="button" onClick={handleClear} className="chat-clear" aria-label="Clear chat" title="Clear chat" disabled={isLoading}>
              <FaTrashAlt />
            </button>
            <input
              id="chat-input"
              type="text"
              placeholder="Ask something..."
              value={input}
              maxLength={maxMessageLength}
              aria-describedby="chat-input-help"
              aria-invalid={Boolean(inputError)}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="chat-send" aria-label="Send message" disabled={isLoading || !input.trim()}>
              <FaPaperPlane />
            </button>
            <span id="chat-input-help" className="sr-only">
              {inputError || `${input.length} of ${maxMessageLength} characters`}
            </span>
          </form>
          {inputError && <p className="chat-input-error" role="alert">{inputError}</p>}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

import React, {useState} from 'react';
import './Chatbot.css'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can i assist you today?' },
  ]);

  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    setMessages([...messages, {sender: 'user', text: inputText}]);

    setTimeout(() => {
      setMessages((prevMessages) => [
      ...prevMessages, 
        {sender: 'bot', text: `You said: "${inputText}"`}, 
      ]);
    }, 1000);

    setInputText('');
  };

  return (
    <div>
      {/* Chat Icon */}
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>🗨</div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chat-window">

            {/* Header */}
            <div className="chat-header">
              <span>Chatbot</span>
              <button onClick={() => setIsOpen(false)}>⨯</button>
            </div>
          
            {/* History */}
            <div className="chat-history">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`message ${msg.sender === 'bot' ? 'bot' : 'user'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

          {/* Input */}
          <div className="input-area">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Chatbot;

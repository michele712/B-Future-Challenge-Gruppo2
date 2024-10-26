import React, {useState} from 'react';
import './Chatbot.css'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can i assist you today?' },
  ]);

  const [inputText, setInputText] = useState('');

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
    <div className="chatbot-container">
      <div className="chat-window">
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
      </div>
    </div>
  );
};

export default Chatbot;

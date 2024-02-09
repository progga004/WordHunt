import React, { useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      setMessages([...messages, { text: message, sender: 'you' }]);
      setMessage('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl flex flex-col justify-between flex-1 max-h-[600px]">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold mb-2">Chat</h3>
        <div className="flex-grow overflow-auto p-3 bg-gray-100 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 flex ${msg.sender === 'you' ? 'justify-start' : 'justify-end'}`}>
              <div className="text-white text-sm py-2 px-4 rounded-lg" style={{ backgroundColor: msg.sender === 'you' ? '#4CAF50' : '#2196F3' }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <form className="flex" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-l-lg border-2 border-r-0 border-gray-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

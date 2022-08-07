import React, { useState } from "react";
import io from 'socket.io-client'

const socket = io('http://localhost:8000')

socket.on('connect', ()=> console.log('[IO] Connect = > New connection'))

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          message: message,
        },
      ]);
      setMessage("");
      console.log(messages);
    }
  };

  const handleInputChange = (event) => setMessage(event.target.value);

  return (
    <main>
      <header>
        <form id="form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            id="msg"
            // autofocus
            // autocomplete="off"
            onChange={handleInputChange}
            placeholder="Digite a mensagem"
            value={message}
          />
          <button type="submit">Enviar</button>
        </form>
      </header>
      <ul id="messages">
        {messages.map((msg) => (
          <li key={msg.id}>{msg.message}</li>
        ))}
      </ul>
    </main>
  );
};

export default Chat;

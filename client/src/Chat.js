import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import { v4 as uuidv4 } from "uuid";

const myId = uuidv4()

const socket = io("http://localhost:8000", {
  withCredentials: true,
  transports: ["websocket"],
});

socket.on('connect', ()=> console.log('[IO] Connect = > New connection'))

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleNewMessage = newMessage => setMessages([...messages, newMessage])
    socket.on('webchat', handleNewMessage)
    return ()=> socket.off('webchat', handleNewMessage)
  }, [messages])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit("webchat", {
        id: messages.length + 1,
        message: message,
      });
      setMessage("");
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

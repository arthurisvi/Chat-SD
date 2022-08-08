import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const myId = uuidv4();

const socket = io("0.tcp.sa.ngrok.io:19545", {
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
        id: myId,
        message: message,
      });
      setMessage("");
    }
  };

  const handleInputChange = (event) => setMessage(event.target.value);

  return (
    <main className="container">
      <div>
        <div className="nav">
          <img class = "img-perfil" src="https://i.ibb.co/z2JkkQN/image.png" alt ="sd"/>
          <strong>Sistemas Distribuídos - 2022.1</strong>
        </div>
        <ul className="list">
          {messages.map((m, index) => (
            <li
              className={`list__item list__item--${
                m.id === myId ? "mine" : "other"
              }`}
              key={index}
            >
              <span
                className={`message message--${
                  m.id === myId ? "mine" : "other"
                }`}
              >
                {m.message}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          className="form__field"
          onChange={handleInputChange}
          placeholder="Mensagem"
          type="text"
          value={message}
        />
        {/* <div class="buttonMic"></div> */}
      </form>
    </main>
  );
};

export default Chat;

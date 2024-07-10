import React, { useEffect, useState } from "react";
import "../styles/chatStyles.css"

function ChatComponent({ socket }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  function onSubmit(e) {
    e.preventDefault();
    socket.emit("message", {
      text: message,
      id: socket.id,
    });
    setMessage("");
  }

  useEffect(() => {
    socket.on("messageResponse", (message) => {
      console.log(messageList);
      setMessageList([...messageList, message]);
    });
  }, [messageList]);
  const color = "red";
  const otherColor = "cyan";

  return (
    <>
      <h1>Mic testing one two</h1>
      <div className="message-list">
        {messageList.map((messageitem, index) => (
          <li
            style={{ color: socket.id === messageitem.id ? color : otherColor }}
            key={index}
          >
            {messageitem.text}
          </li>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          name="chat"
          id="chat"
          value={message}
        />
        <button type="submit">Send </button>
      </form>
    </>
  );
}

export default ChatComponent;

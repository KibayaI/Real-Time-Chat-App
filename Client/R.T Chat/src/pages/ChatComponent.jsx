import React, { useEffect, useState } from "react";
import "../styles/chatStyles.css";
import { Link } from "react-router-dom";

function ChatComponent({ socket }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userName, setUserName] = useState("anonymous");

  function onSubmit(e) {
    e.preventDefault();
    socket.emit("message", {
      text: message,
      id: socket.id,
      userName: userName,
      timeStamp: new Date(),
    });
    setMessage("");
  }

  useEffect(() => {
    socket.on("messageResponse", (message) => {
      setMessageList([...messageList, message]);
      
      // localStorage.setItem("messages", JSON.stringify(messageList));
      // console.log(JSON.parse(localStorage.getItem("messages")));
    });
  }, [messageList]);

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  return (
      <div className="chat-page">
        <input type="text" onChange={handleUserName} />

        {/* <h1>3 8 1 20 _ 1 19 19: {userName}</h1> */}
        <div className="message-list">
          {messageList.map((messageitem, index) => {
            const textStyle =
              socket.id === messageitem.id
                ? {
                    marginLeft: "auto",
                    marginRight: "0px",
                    backgroundColor: "rgba(0, 174, 255, 0.979)",
                  }
                : {
                    marginRight: "auto",
                    marginLeft: "0px",
                    backgroundColor: "rgba(169, 169, 169, 0.377)",
                  };

            return (
              <div className="message">
                <li style={textStyle} key={index}>
                  {messageitem.text}
                </li>
                {socket.id !== messageitem.id ? (
                  <p style={textStyle} className="userStyle">
                    {messageitem.userName} {messageitem.timeStamp}
                  </p>
                ) : (
                  ""
                )}
              </div>
            );
          })}
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
      </div>
  );
}

export default ChatComponent;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chatStyles.css";
import { useSelector } from "react-redux";

function ChatComponent({ socket }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();
  const receiver = useSelector((state) => state.receiver.receiverData);

  console.log({ receiver: receiver });

  function onSubmit(e) {
    e.preventDefault();
    const sentMessage = {
      text: message,
      to: receiver.userId,
    };
    socket.emit("private_message", sentMessage);

    setMessageList([...messageList, sentMessage]);

    setMessage("");

    // if (message !== "") {
    //   socket.to(room).emit("message", {
    //     text: message,
    //     from: socket.id,
    //     // to: selectedUser.id,
    //     timeStamp: new Date(),
    //   });
    // }
  }

  useEffect(() => {
    socket.on("private_message", (response) => {
      console.log(response);
      setMessageList([...messageList, response]);
    });
    // socket.on("messageResponse", (message) => {
    //   setMessageList([...messageList, message]);
    // });
  });

  const [upload, setUpload] = useState("upload-hide");

  return (
    <div className="chat-page">
      <div className="header">
        <button onClick={() => navigate(-1)}>
          <i className="fa fa-chevron-left"></i>
        </button>
        <h2>{receiver.userName}</h2>
      </div>
      <div key="index" className="message-list">
        {messageList.map((messageitem) => {
          const textStyle =
            socket.userName === messageitem.from ? "sender" : "receiver";

          return (
            <div key={messageitem.timeStamp} className="message">
              <li className={textStyle}>{messageitem.text}</li>
              {/* {socket.userId !== messageitem.userId ? (
                <p>{messageitem.timeStamp}</p>
              ) : (
                ""
              )} */}
            </div>
          );
        })}
      </div>

      <div className={upload}>
        <form
          className={upload}
          preventDefault
          action="http://localhost:3000/upload"
          method="POST"
          enctype="multipart/form-data"
        >
          <input type="file" name="file" required />
          <button type="button">
            <i className="fa fa-upload"></i>
          </button>
        </form>
      </div>

      <div>
      <form className="text-form" onSubmit={onSubmit}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          name="chat"
          id="chat"
          value={message}
        />

        <button onClick={() => setUpload("upload-show")}>
          <i className="fa fa-paperclip"></i>
        </button>
        <button type="submit">
          <i className="fa fa-paper-plane"></i>
          {""}
        </button>
      </form>
      </div>
    </div>
  );
}

export default ChatComponent;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import { socket } from "../socket";
import { v4 as uuid } from "uuid";
import { setMessageList } from "../features/message/messageSlice";
import moment from "moment";

function Body() {
  const receiver = useSelector((state) => state.receiver.receiverData);
  const messageList = useSelector((state) => state.messageList.messageList);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const scroll = useRef();

  const tone = new Audio("../src/assets/received girl.mp3");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("receivedMessage", (receivedMsg) => {
      tone.play();
      if (receivedMsg.from === receiver.id) {
        setReceivedMessage(receivedMsg);
      }
    });
  }, []);

  useEffect(() => {
    receivedMessage &&
      dispatch(setMessageList([...messageList, receivedMessage]));
  }, [receivedMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="chat-body">
      {receiver !== undefined && (
        <>
          <div className="messages">
            <div className="message-list">
              {messageList.length > 0
                ? messageList.map((messageitem) => {
                    return (
                      <div
                        ref={scroll}
                        key={uuid()}
                        className={`message 
                     ${
                       messageitem.from === currentUser.id
                         ? "sender"
                         : "receiver"
                     }`}
                      >
                        <li>{messageitem.text}</li>
                        <p>{moment(messageitem.updatedAt).fromNow()}</p>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <div className="input-field">
            <Input />
          </div>
        </>
      )}
    </div>
  );
}

export default Body;

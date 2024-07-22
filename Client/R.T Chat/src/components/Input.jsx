import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessageList } from "../features/message/messageSlice";
import Picker from "emoji-picker-react";

import { socket } from "../socket";

function Input() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const messageList = useSelector((state) => state.messageList.messageList);
  const receipient = useSelector((state) => state.receiver.receiverData);
  const attach = useRef();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  async function onSubmit(event) {
    event.preventDefault();

    if (message.trim() !== "") {
      const messageInfo = {
        from: currentUser.id,
        to: receipient.id,
        text: message,
      };

      socket.emit("sentMessage", messageInfo);

      const addMessage = await fetch("http://localhost:4000/message", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageInfo),
      });

      console.log(await addMessage.json());

      dispatch(setMessageList([...messageList, messageInfo]));

      setMessage("");
    }
  }

  const handleImageUpload = (event) => {
    event.preventDefault();
    attach.current.click();
  };

  return (
    <>
      {/* <Picker /> */}

      <form id="form" encType="multipart/form-data">
        <input type="file" id="file" ref={attach} hidden />

      </form>

      <form className="text-form" onSubmit={onSubmit}>
        <div className="end">
          <input
            className="input-field"
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            name="chat"
            id="chat"
            value={message}
          />

          <button
            onClick={handleImageUpload}
            type="button"
            className="attach-btn form-btn"
          >
            <i className="fa fa-paperclip"></i>
          </button>
          <button type="submit" className="submit-btn form-btn">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </>
  );
}

export default Input;

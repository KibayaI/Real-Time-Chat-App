import React, { useEffect } from "react";
import "../styles/chatStyles.css";
import Header from "../components/Header";
import Contacts from "../components/Contacts";
import Body from "../components/Body";
import { socket } from "../socket";
import { useSelector } from "react-redux";

function TestChat() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const receipient = useSelector((state) => state.receiver.receiverData);

  useEffect(() => {
    socket.emit("addUser", currentUser.id);
  }, []);

  return (
    <>
      <div className="chat-page">
        <Header />
        <div className="chat-container">
          <div className="contacts">
            <Contacts />
          </div>
          {receipient !== undefined && (
            <div>
              <Body />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TestChat;

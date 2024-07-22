import React, { useEffect, useState } from "react";
import "../styles/contactStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { setReceiver } from "../features/user/receiverSlice";
import { setMessageList } from "../features/message/messageSlice";

function Contacts() {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const receipient = useSelector((state) => state.receiver.receiverData);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function getAllUsers() {
      const users = await fetch("http://localhost:4000/user").then((users) =>
        users.json()
      );
      const receipients = users.filter(
        (receipients) => receipients.id !== user.id
      );
      setContacts(receipients);
    }

    getAllUsers();
  }, []);

  useEffect(() => {
    async function getMessages() {
      dispatch(setMessageList([]));

      const messages = await fetch("http://localhost:4000/messages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: currentUser,
          to: receipient,
        }),
      }).then((mes) => mes.json());

      const sortedMessages = messages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      dispatch(setMessageList(sortedMessages));
    }
    getMessages();
  }, [receipient]);

  function selectUser(selected_user) {
    localStorage.setItem("receipient", JSON.stringify(selected_user));
    dispatch(setReceiver(selected_user));
  }

  return (
    <div>
      {receipient === undefined &&
        contacts.map((user) => (
          <div
            key={user.id}
            className="receipients"
            onClick={() => selectUser(user)}
          >
            <img
              src="../src/assets/profile.jpeg"
              alt={`${user.userName} profile pic`}
            />
            <li className="contact">{user.username}</li>
          </div>
        ))}
    </div>
  );
}

export default Contacts;

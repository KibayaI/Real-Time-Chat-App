import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../styles/globalStyles.css";
import "../styles/dashboardStyles.css";
import ErrorElement from "../ErrorElement";
import { socket } from "../socket";
import { setReceiver } from "../features/user/receiverSlice";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const user_name = localStorage.getItem("user_name");

  const dispatch = useDispatch();

  const [onlineUsers, setOnlineUsers] = useState([]);
  
  const receivers = JSON.parse(localStorage.getItem("receiver"));

  console.log(receivers);

  useEffect(() => {
    socket.on("users", (user) => {
      // console.log(user);
      setOnlineUsers(user);
      localStorage.setItem("receiver", JSON.stringify(user));
    });

    async function listUsers() {
      const all_users = await fetch("http://localhost:3000/user").then(
        (users) => users.json()
      );
      setUsers(all_users);
      setFilteredUsers(all_users);
    }

    listUsers();
  }, []);

  function onSearch(event) {
    const filtered = users.filter((filteredUser) =>
      filteredUser.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  }

  function chat(userId) {
    // const roomName = onlineUsers[0].userId
    const receiver = onlineUsers.find((user) => user.userId === userId);
    dispatch(setReceiver(receiver));
    // socket.emit("join_room", roomName);
    console.log(receiver);
    navigate("/chat");
  }

  return (
    <div className="dashboard">
      {user_name !== null ? (
        <>
          <nav>
            <div className="company-name">R.T. 4514 &nbsp; {user_name}</div>
            <div className="search">
              <input type="text" placeholder="Search..." onChange={onSearch} />
            </div>
          </nav>

          <ul>
            {receivers ? (
              receivers.map((user) => {
                return (
                  <div className="users" key={user.userId}>
                    <img
                      src="../src/assets/profile.jpeg"
                      alt={`${user.userName} profile pic`}
                    />
                    <li onClick={() => chat(user.userId)}>
                      {user.userName} {user.userId}
                    </li>
                  </div>
                );
              })
            ) : (
              <label className="error">The user doesn't exist</label>
            )}
            {/* 
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                return (
                  <div className="users" key={user.id}>
                    <img
                      src="../src/assets/profile.jpeg"
                      alt={`${user.name} profile pic`}
                    />
                    <li onClick={chat}>{user.name}</li>
                  </div>
                );
              })
            ) : (
              <label className="error">The user doesn't exist</label>
            )} */}
          </ul>
        </>
      ) : (
        <ErrorElement ErrorMessage={`Login in first to access the App`} />
      )}

      {/* <label>{onlineUsers}</label> */}

      <Link to={"/"}> go home</Link>
      {/* <ul>
        {onlineUsers.map((user) => (
          <li>{user.userName}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Dashboard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../styles/chatStyles.css";
import { setReceiver } from "../features/user/receiverSlice";

function Header() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const receipient = useSelector((state) => state.receiver.receiverData);

  const navigate = useNavigate();

  function back() {
    dispatch(setReceiver(undefined));
    // localStorage.removeItem("user")
    // navigate("/");
  }

  return (
    <div className="header">
      {receipient !== undefined ? (
        <>
          <button onClick={back}>
            <i className="fa fa-chevron-left"></i>
          </button>
          <h2>{receipient.username}</h2>
        </>
      ) : (
        <h2>{user.username}</h2>
      )}
    </div>
  );
}

export default Header;

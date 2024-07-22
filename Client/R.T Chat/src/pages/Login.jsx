import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/globalStyles.css";
import { socket } from "../socket";
import TestChat from "./TestChat";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [logFields, setLogfields] = useState({
    email: "",
    password: "",
  });
  const [eye, setEye] = useState("eye");

  function onFIeldChange(e) {
    if (e.target.name === "emailField") {
      setLogfields({
        email: e.target.value,
        password: logFields.password,
      });
    } else {
      setLogfields({
        email: logFields.email,
        password: e.target.value,
      });
    }
    setError("");
  }

  async function login(e) {
    e.preventDefault();

    const user = await fetch(
      `http://localhost:4000/user/${JSON.stringify(logFields)}`
    ).then((user) => user.json());

    if (!user.error) {
      socket.auth = { userName: user.data.username };
      localStorage.setItem("user", JSON.stringify(user.data));
      navigate("/testChat");
    } else {
      setError("Incorrect credentials...try again!!");
    }
  }
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {!currentUser ? (
        <div className="entry login-page">
          <form onSubmit={login}>
            <div className="form-fields">
              <label htmlFor="textInput">Email</label>
              <input
                id="emailField"
                name="emailField"
                type="email"
                required
                placeholder="Email"
                value={logFields.email}
                onChange={onFIeldChange}
              />
            </div>

            <div className="form-fields">
              <label htmlFor="passwordField">Password</label>
              <input
                type="password"
                id="passwordField"
                name="passwordField"
                required
                placeholder="Password"
                value={logFields.password}
                onChange={onFIeldChange}
              />
              <i className={`hide-show fa fa-${eye}`} onClick={show}></i>
            </div>
            <label className="slant error">{error}</label>

            <button>Login</button>
            <br />
            <label className="slant">
              Don't have an account?&nbsp;
              <Link to="/signUp">Sign Up</Link>
            </label>
          </form>
        </div>
      ) : (
        <TestChat />
      )}
    </>
  );
  function show() {
    const pass = document.getElementById("passwordField");

    if (pass.type === "password") {
      pass.type = "text";
      setEye("eye");
    } else {
      pass.type = "password";
      setEye("eye-slash");
    }
  }
}

export default Login;

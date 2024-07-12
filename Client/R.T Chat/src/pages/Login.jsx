import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/globalStyles.css";

function Login() {
  const navigate = useNavigate();
  
  const showPass = (
    <FontAwesomeIcon className="coffee" icon={faEye} onClick={show} />
  );
  const hidePass = (
    <FontAwesomeIcon icon={faEyeSlash} onClick={show} className="coffee" />
  );
  
  const [eye, setEye] = useState(hidePass.props.icon)

  async function login(e) {
    e.preventDefault();

    // await fetch("http://localhost:3000/user/",)
    
    navigate("/chat");
  }

  return (
    <div className="entry login-page">
      <form onSubmit={login}>
        <div className="form-fields">
          <label htmlFor="textInput">Username</label>
          <input id="textInput" type="text" required placeholder="Username" />
        </div>

        <div className="form-fields">
          <label htmlFor="passwordField">Password</label>
          <input
            type="password"
            id="passwordField"
            required
            placeholder="Password"
          />
          <FontAwesomeIcon className="coffee" icon={eye} onClick={show} />
        </div>

        <button>Login</button>
        <br />
        <label className="account">
          Don't have an account?&nbsp;
          <Link to="/signUp">Sign Up</Link>
        </label>
      </form>
    </div>
  );
  function show() {
    const pass = document.getElementById("passwordField");

    if (pass.type === "password") {
      pass.type = "text";
      setEye(showPass.props.icon)
    } else {
      pass.type = "password";
      setEye(hidePass.props.icon);

    }
  }
}

export default Login;

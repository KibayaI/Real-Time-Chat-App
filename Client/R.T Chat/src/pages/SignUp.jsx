import React, { useState } from "react";
import "../styles/globalStyles.css";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [regDetails, setRegDetails] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function onFIeldChange(e) {
    if (e.target.name === "usernameField") {
      setRegDetails({
        username: e.target.value,
        email: regDetails.email,
        gender: regDetails.gender,
        password: regDetails.password,
      });
    } else if (e.target.name === "emailField") {
      setRegDetails({
        username: regDetails.username,
        email: e.target.value,
        gender: regDetails.gender,
        password: regDetails.password,
      });
      setError("");
    } else if (e.target.name === "genderField") {
      setRegDetails({
        username: regDetails.username,
        email: regDetails.email,
        gender: e.target.value,
        password: regDetails.password,
      });
    } else if (e.target.name === "passwordField") {
      setRegDetails({
        username: regDetails.username,
        email: regDetails.email,
        gender: regDetails.gender,
        password: e.target.value,
      });
    }
  }

  async function register(e) {
    e.preventDefault();

    try {
      const user = await fetch("http://localhost:4000/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regDetails),
      }).then((user) => user.json());

      if (!user.error) {
        console.log("post success!!");
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/testChat");
        console.log(localStorage.getItem("user"));
      } else {
        setError("Email Address already in use!!!");
        console.log(user);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="entry">
      <form onSubmit={register}>
        <div className="form-fields">
          <label htmlFor="textInput">UserName</label>
          <input
            id="username"
            name="usernameField"
            type="text"
            required
            placeholder="Name"
            defaultValue={regDetails.username}
            onChange={onFIeldChange}
          />
        </div>

        <div className="form-fields">
          <label htmlFor="emailField">Email</label>
          <input
            id="emailField"
            name="emailField"
            type="email"
            required
            placeholder="Email"
            value={regDetails.email}
            onChange={onFIeldChange}
          />
        </div>
        <label className="error slant">{error}</label>

        <div className="form-fields">
          <label htmlFor="genderField">Gender</label>
          <input
            type="text"
            id="genderField"
            name="genderField"
            required
            placeholder="Gender"
            value={regDetails.gender}
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
            value={regDetails.password}
            onChange={onFIeldChange}
          />
        </div>
        <button>Sign Up</button>
        <br />

        <label className="slant">
          Already have an account?&nbsp;
          <Link to="/">Log In</Link>
        </label>
      </form>
    </div>
  );
}

export default SignUp;

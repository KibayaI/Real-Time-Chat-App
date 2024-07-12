import React, { useState } from "react";
import "../styles/globalStyles.css";
import { Link, useNavigate } from "react-router-dom";


function SignUp() {
  const [regDetails, setRegDetails] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
  });
  const navigate = useNavigate()

  function onFIeldChange(e) {
    if (e.target.name === "textInput") {
      setRegDetails({
        name: e.target.value,
        email: regDetails.email,
        gender: regDetails.gender,
        password: regDetails.password,
      });
    } else if (e.target.name === "emailField") {
      setRegDetails({
        name: regDetails.name,
        email: e.target.value,
        gender: regDetails.gender,
        password: regDetails.password,
      });
    } else if (e.target.name === "genderField") {
      setRegDetails({
        name: regDetails.name,
        email: regDetails.email,
        gender: e.target.value,
        password: regDetails.password,
      });
    } else {
      setRegDetails({
        name: regDetails.name,
        email: regDetails.email,
        gender: regDetails.gender,
        password: e.target.value,
      });
    }
  }

  async function register(e) {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regDetails),
      });
      console.log("post success!!");
      navigate("/chat")
    } catch (err) {
      console.log(err);
    }
    console.log(regDetails);
  }

  return (
    <div className="entry">
      <form onSubmit={register}>
        <div className="form-fields">
          <label htmlFor="textInput">name</label>
          <input
            id="textInput"
            name="textInput"
            type="text"
            required
            placeholder="name"
            value={regDetails.name}
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

        <label className="account">
          Already have an account?&nbsp;
          <Link to="/">Log In</Link>
        </label>
      </form>
    </div>
  );
}

export default SignUp;

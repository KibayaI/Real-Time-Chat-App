import React, { useState } from "react";

function Login() {
  const [userName, setUserName] = useState("anonymous");

  function handleUserName(e) {
    setUserName(e.target.value);
  }
  return (
    <>
      <input type="text" onChange={handleUserName} />
    </>
  );
}

export default Login;

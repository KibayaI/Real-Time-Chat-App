import "./App.css";
import ChatComponent from "./pages/ChatComponent.jsx";
import Login from "./pages/Login.jsx";
import { socket } from "./socket.js";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ErrorElement from "./ErrorElement.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} errorElement={<ErrorElement />} />

          <Route
            path="/chat"
            element={<ChatComponent socket={socket} />}
            errorElement={<ErrorElement />}
          />

          <Route
            path="/signUp"
            element={<SignUp />}  
            errorElement={<ErrorElement />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

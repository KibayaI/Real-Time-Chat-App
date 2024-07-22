import "./App.css";
import ChatComponent from "./pages/ChatComponent.jsx";
import Login from "./pages/Login.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ErrorElement from "./ErrorElement.jsx";
import SignUp from "./pages/SignUp.jsx";
import TestChat from "./pages/TestChat.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signUp"
            element={<SignUp />}
            errorElement={<ErrorElement />}
          />

          <Route path="/" element={<Login />} errorElement={<ErrorElement />} />

          <Route path="/testChat" element={<TestChat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

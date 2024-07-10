import "./App.css";
import ChatComponent from "./pages/ChatComponent.jsx";
import { socket } from "./socket.js";

function App() {
  return (
    <>
      <ChatComponent socket={socket} />
    </>
  );
}

export default App;

import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import "dotenv/config";

import userRouter from "./router/userRoutes.mjs";
import fileRouter from "./router/fileRoutes.mjs";
import messageRouter from "./router/messageRoutes.mjs";

const app = express();
const PORT = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(messageRouter);
app.use(fileRouter);


const onlineUsers = new Map();

io.on("connection", (socket) => {

  console.log(`👍 ${socket.id} just connected!!`);

  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
  })

  socket.on("sentMessage", (message) => {
    const receipient = onlineUsers.get(message.to);
    socket.to(receipient).emit("receivedMessage", message);
  });

  socket.on("disconnect", () => {
    console.log(`❌ ${socket.id} just disconnected`);
  });
});

server.listen(PORT, () => console.log("Server running like bolt on", PORT));

// // socketManager.js
// const onlineUsers = new Map();

// function addUser(userId, socketId) {
//   onlineUsers.set(userId, socketId);
// }

// function getUserSocket(userId) {
//   return onlineUsers.get(userId);
// }

// function removeUser(socketId) {
//   // Find the userId associated with the socketId
//   for (let [userId, id] of onlineUsers.entries()) {
//     if (id === socketId) {
//       onlineUsers.delete(userId);
//       break;
//     }
//   }
// }

// function handleConnection(socket) {
//   socket.on("add-user", (userId) => {
//     addUser(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const recipientSocketId = getUserSocket(data.to);
//     if (recipientSocketId) {
//       socket.to(recipientSocketId).emit("msg-recieve", data.msg);
//     }
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });
// }

// module.exports = {
//   handleConnection,
// };

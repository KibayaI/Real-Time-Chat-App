import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log(`👍 ${socket.id} just connected!!`);
  
  socket.on("message", (message) => {
    io.emit("messageResponse", message);
  });

  socket.on("disconnect", () =>
    console.log(`❌ ${socket.id} just disconnected`)
  );
});

server.listen(PORT, () => console.log("Server running like bolt on", PORT));

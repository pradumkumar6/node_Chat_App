const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`💬 server on port ${PORT}`));

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

let socketsConnected = new Set();

io.on("connection", onConnected);

function onConnected(socket) {
  console.log("Socket connected", socket.id);
  socketsConnected.add(socket.id);
  io.emit("clients-total", socketsConnected.size);

  socket.on("join", (username) => {
    socket.username = username; // Store the username in the socket object
    io.emit("user connected", username);
    console.log(`${username} has joined`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
    socketsConnected.delete(socket.id);
    io.emit("clients-total", socketsConnected.size);
    if (socket.username) {
      io.emit("user disconnected", socket.username); // Use the stored username
    }
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("chat-message", data);
  });

  socket.on("feedback", (data) => {
    socket.broadcast.emit("feedback", data);
  });
}

//asjduisasdjghsajhacscsd csasjhhsasdbas xvcs cjksa cjkbdsajkdjkbsadsalkn

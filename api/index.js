const express = require("express");
const cors = require("cors");
let users = [];
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:19006",
    methods: ["GET", "POST"],
  },
});

const port = 3001;
const addUser = (userName, roomId) => {
  users.push({
    username: userName,
    roomID: roomId,
  });
};
const removeUser = (userName, roomId) => {
  users = users.filter((user) => user.username != userName);
};
const getRoomUsers = (roomId) => {
  return users.filter((user) => user.roomID == roomId);
};
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello worlds");
});

io.on("connection", (socket) => {
  console.log("Someone connected");
  socket.on("join-room", ({ roomId, userName }) => {
    console.log(`User Joined room ${roomId} with the name ${userName}`);
    socket.join(roomId);
    addUser(userName, roomId);
    socket.to(roomId).emit("user-connected", userName);
    io.to(roomId).emit("all-users", getRoomUsers(roomId));

    socket.on("user-disconnected", () => {
      console.log(`${userName} just left room ${roomId}`);
      socket.leave(roomId);
      removeUser(userName, roomId);
      io.to(roomId).emit("all-users", getRoomUsers(roomId));
    });

    socket.on("disconnect", () => {
      console.log(`${userName} just left room ${roomId}`);
      socket.leave(roomId);
      removeUser(userName, roomId);
      io.to(roomId).emit("all-users", getRoomUsers(roomId));
    });
  });
});

server.listen(port, () => console.log("API initiated"));

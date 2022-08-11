import express from "express";
import cors from "cors";
import { ExpressPeerServer } from "peer";
import routes from "./routes.js";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
let listeners = [];
const app = express();
const server = http.Server(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:19006",
    methods: ["GET", "POST"],
  },
});

const port = 3001;
app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use("/rooms", routes);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
});

app.use("/peerjs", peerServer);

peerServer.on("connection", () => console.log("peer is open"));
io.on("connection", (socket) => {
  console.log("Someone connected");
  socket.on("join-room", ({ userId, roomId, userName, isListen }) => {
    console.log(`User Joined room ${roomId} with the name ${userName}`);
    socket.join(roomId);
    if (isListen) addUser(userId, userName, roomId);

    socket.on("connection-request", (roomId, userId) => {
      socket.to(roomId).emit("user-connected", userId);
    });
    io.to(roomId).emit("all-listeners", getRoomListeners(roomId));

    socket.on("user-disconnected", () => {
      console.log(`${userName} just left room ${roomId}`);
      socket.leave(roomId);
      if (isListen) removeUser(userId);
      socket.to(roomId).emit("other-user-disconnected", userId);
      io.to(roomId).emit("all-listeners", getRoomListeners(roomId));
    });

    socket.on("disconnect", () => {
      console.log(`${userName} just Disconnected`);
      socket.leave(roomId);
      if (isListen) removeUser(userId);
      socket.to(roomId).emit("other-user-disconnected", userId);
      io.to(roomId).emit("all-listeners", getRoomListeners(roomId));
    });

    socket.on("end", () => {
      socket.disconnect(0);
    });
  });
});

server.listen(port, () => console.log("API initiated"));

const addUser = (userId, userName, roomId) => {
  listeners.push({
    userId: userId,
    username: userName,
    roomID: roomId,
  });
};
const removeUser = (userId) => {
  listeners = listeners.filter((user) => user.userId != userId);
};
const getRoomListeners = (roomId) => {
  return listeners.filter((user) => user.roomID == roomId);
};

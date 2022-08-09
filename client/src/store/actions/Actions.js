import { io } from "socket.io-client";
import Peer from "react-native-peerjs";

import {
  MY_VIDEO_STREAM,
  MY_AUDIO_STREAM,
  JOIN_ROOM,
  ADD_VIDEO_STREAM,
  ADD_AUDIO_STREAM,
  ADD_REMOTE_VIDEO_STREAM,
  ADD_REMOTE_AUDIO_STREAM,
  AUDIO,
  VIDEO,
  FETCH_ROOM_USERS,
} from "../constants";

const API_URI = `http://10.0.0.16:3001/`;
const socket = io(`${API_URI}`, { forceNew: true });

const peerServer = new Peer(undefined, {
  host: "10.0.0.16",
  secure: false,
  port: 3001,
  path: "/peerjs",
});
let userIIDD;
peerServer.on("open", (id) => {
  console.log(id + `hELL yEAH It works`);
  userIIDD = id;
});
peerServer.on("error", (error) => console.log(error));
socket.on("error", (error) => console.log(error + `socket error`));

export const join_Room =
  ({ type, roomId, userName, stream }) =>
  async (dispatch) => {
    try {
      //if (type == VIDEO) dispatch({ type: MY_VIDEO_STREAM, payload: stream });
      //  else if (type == AUDIO) {
      dispatch({ type: MY_VIDEO_STREAM, payload: stream });
      // peerServer.on("open", (userId) => {
      socket.emit("join-room", {
        userId: userIIDD,
        roomId: roomId,
        userName: userName,
      });
      // });

      socket.on("user-connected", (userId) => {
        if (userId != userIIDD) {
          //Already in room and suddenly someone joins
          const call = peerServer.call(userId, stream);
          call.on("stream", (remoteVideoStream) => {
            console.log("recived stream from new user");
            console.log(remoteVideoStream);
            dispatch({
              type: ADD_REMOTE_VIDEO_STREAM,
              payload: remoteVideoStream,
            });
          });
        }
      });
      socket.emit("connection-request", roomId, userIIDD);
      peerServer.on("call", (call) => {
        //Joined the room where there is already people in it.
        call.answer(stream);
        call.on("stream", (Stream) => {
          console.log("recived stream from old user");
          console.log(Stream);
          dispatch({ type: ADD_VIDEO_STREAM, payload: Stream });
        });
      });
    } catch (err) {}
  };

export const get_users = () => async (dispatch) => {
  socket.on("all-users", (users) => {
    dispatch({ type: FETCH_ROOM_USERS, payload: users });
  });
};

export const disconnectFromRoom = (userName) => async (dispatch) => {
  socket.emit("user-disconnected");
  peerServer.close();
};

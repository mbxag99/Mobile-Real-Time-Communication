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
///peerServer.on("error", (error) => console.log(error));
socket.on("error", (error) => console.log(error + `socket error`));

export const join_Room =
  ({ type, roomId, userName, stream }) =>
  async (dispatch) => {
    try {
      if (type == VIDEO) dispatch({ type: MY_VIDEO_STREAM, payload: stream });
      else if (type == AUDIO) {
        console.log("before dispatch");
        dispatch({ type: MY_AUDIO_STREAM, payload: stream });
        console.log("after dispatch");
        // peerServer.on("open", (userId) => {
        console.log("Going to socket");
        socket.emit("join-room", {
          userId: userIIDD,
          roomId: roomId,
          userName: userName,
        });
        // });

        socket.on("user-connected", (userId) => {
          const call = peerServer.call(userId, stream);
          call.on("stream", (remoteAudioStream) => {
            if (remoteAudioStream)
              dispatch({
                type: ADD_REMOTE_AUDIO_STREAM,
                payload: remoteAudioStream,
              });
          });
        });

        peerServer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (Stream) => {
            dispatch({ type: ADD_AUDIO_STREAM, payload: Stream });
          });
        });
      }
    } catch (err) {}
  };

export const get_users = () => async (dispatch) => {
  socket.on("all-users", (users) => {
    dispatch({ type: FETCH_ROOM_USERS, payload: users });
  });
};

export const disconnectFromRoom = () => async (dispatch) => {
  socket.emit("user-disconnected");
};

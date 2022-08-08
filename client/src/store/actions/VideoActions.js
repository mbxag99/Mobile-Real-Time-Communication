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
} from "../constants";

export const API_URI = `http://10.0.0.16:3001/`;
export const socket = io(`${API_URI}`, { forceNew: true });

const peerServer = new Peer(undefined, {
  host: "10.0.0.16",
  secure: false,
  port: 3001,
  path: "/peerjs",
});

peerServer.on("open", (id) => console.log(id));
peerServer.on("error", (error) => console.log(error));
socket.on("error", (error) => console.log(error));

export const join_Room =
  ({ type, roomId, userName, stream }) =>
  async (dispatch) => {
    try {
      if (type == VIDEO) dispatch({ type: MY_VIDEO_STREAM, payload: stream });
      else if (type == AUDIO) {
        dispatch({ type: MY_AUDIO_STREAM, payload: stream });
        peerServer.on("open", (userId) => {
          socket.emit("join-room", (userId, roomId, userName));
        });

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

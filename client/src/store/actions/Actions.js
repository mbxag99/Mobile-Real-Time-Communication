import { io } from "socket.io-client";
import Peer from "react-native-peerjs";
import axios from "react-native-axios";
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
  REMOVE_VIDEO_STREAM,
  FLUSH,
  LISTENER,
  FETCH_ROOM_LISTENERS,
  FETCH_ALL_ROOMS,
  CHAT_NEW_MESSAGE,
  START_LOADING,
} from "../constants";
import { flushSync } from "react-dom";

const API_URI = `http://10.0.0.16:3001/`;
let socket = io(`${API_URI}`, { forceNew: true });

let peerServer = new Peer(undefined, {
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
/*peerServer.on("close", () => {
  console.log("Making New");
  peerServer = new Peer(undefined, {
    host: "10.0.0.16",
    secure: false,
    port: 3001,
    path: "/peerjs",
  });
});*/
socket.on("error", (error) => console.log(error + `socket error`));
export const join_Room =
  ({ type, roomId, userName, stream }) =>
  async (dispatch) => {
    try {
      if (type != LISTENER)
        dispatch({ type: MY_VIDEO_STREAM, payload: stream });
      dispatch(user_joined_room(roomId));
      socket.emit("join-room", {
        userId: userIIDD,
        roomId: roomId,
        userName: userName,
        isListen: type == LISTENER ? true : false,
      });

      socket.on("user-connected", (userId) => {
        if (userId != userIIDD) {
          //Already in room and suddenly someone joins
          console.log("calling the new commer");
          let call;
          if (type != LISTENER) call = peerServer.call(userId, stream);
          else call = peerServer.call(userId);
          console.log(call);
          call?.on("stream", (remoteVideoStream) => {
            dispatch({
              type: ADD_REMOTE_VIDEO_STREAM,
              payload: { userPeerID: userId, Stream: remoteVideoStream },
            });
          });
        }
      });
      socket.emit("connection-request", roomId, userIIDD);
      peerServer.on("call", (call) => {
        //Joined the room where there is already people in it.
        if (type != LISTENER) call.answer(stream);
        else call.answer();
        call?.on("stream", (Stream) => {
          dispatch({
            type: ADD_VIDEO_STREAM,
            payload: { userPeerID: call.peer, Stream: Stream },
          });
        });
      });

      socket.on("other-user-disconnected", (disconnectedUser) => {
        console.log("Yep Removing");
        dispatch({
          type: REMOVE_VIDEO_STREAM,
          payload: { userPeerID: disconnectedUser },
        });
      });

      socket.on("message-recieved", ({ value, username }) => {
        console.log("recieved");
        dispatch({
          type: CHAT_NEW_MESSAGE,
          payload: { user: username, message: value },
        });
      });

      // socket.on("user-options-update", (options) => {});
    } catch (err) {}
  };

export const get_listeners = () => async (dispatch) => {
  socket.on("all-listeners", (users) => {
    dispatch({ type: FETCH_ROOM_LISTENERS, payload: users });
  });
};

export const disconnectFromRoom = () => async (dispatch) => {
  dispatch({ type: FLUSH });
  peerServer.destroy();
  peerServer = new Peer(undefined, {
    host: "10.0.0.16",
    secure: false,
    port: 3001,
    path: "/peerjs",
  });
  peerServer.on("open", (newId) => {
    userIIDD = newId;
    console.log(`New Peer ID ${newId}`);
    socket.emit("user-disconnected");
    socket.emit("end");
    socket = io(`${API_URI}`, { forceNew: true });
  });
};

export const create_new_room = (RoomData) => async (dispatch) => {
  try {
    await axios
      .post(`${API_URI}rooms/create_new_room`, RoomData)
      .then((response) => {
        console.log(response.data);
      });
  } catch (error) {
    console.log(error);
  }
};

export const get_all_rooms = (data) => async (dispatch) => {
  try {
    dispatch({ type: "START_ROOM_LOADING" });
    await axios.post(`${API_URI}rooms/get_all_rooms`, data).then((response) => {
      console.log(response.data);
      dispatch({ type: FETCH_ALL_ROOMS, payload: response.data });
    });
    dispatch({ type: "END_ROOM_LOADING" });
  } catch (error) {
    console.log(error);
  }
};

export const user_joined_room = (roomID) => async (dispatch) => {
  try {
    console.log("Going ooututttt" + roomID);
    await axios
      .patch(`${API_URI}rooms/user_joined_room`, { roomID: roomID })
      .then((response) => {
        dispatch(get_all_rooms());
      });
  } catch (error) {
    console.log(error + "Potttaaaa");
  }
};

export const user_quit_room = (roomID) => async (dispatch) => {
  try {
    await axios
      .patch(`${API_URI}rooms/user_quit_room`, { roomID: roomID })
      .then((response) => {
        dispatch(get_all_rooms());
      });
  } catch (error) {
    console.log(error);
  }
};

export const send_message_to_room = (value) => async (dispatch) => {
  socket.emit("message", { value: value });
};

export const new_video_options = (options) => async (dispatch) => {
  socket.emit("new_video_options", options);
};

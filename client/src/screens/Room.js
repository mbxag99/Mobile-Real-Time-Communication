import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-elements";
import { Icon, Avatar } from "react-native-elements";
import { io } from "socket.io-client";
import Peer from "react-native-peerjs";
import ChooseName from "../components/ChooseName";
import {
  disconnectFromRoom,
  get_listeners,
  get_users,
  join_Room,
} from "../store/actions/Actions";
import { RTCView, mediaDevices } from "react-native-webrtc";
import { VIDEO, AUDIO, LISTENER } from "../store/constants";
import { useDispatch, useSelector } from "react-redux";

export default function Room({ navigation, route }) {
  const [justJoined, setJustJoined] = useState(true);
  const [name, setName] = useState("?");
  const [asListener, setAsListener] = useState(false);
  const { RoomListeners } = useSelector((state) => state.ListenReducer);
  const { myVideoStream, VideoStreams, RemoteVideoStreams, Loading } =
    useSelector((state) => state.MediaReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!justJoined && !asListener) {
      myFUN();
    } else if (!justJoined && asListener)
      dispatch(
        join_Room({
          type: LISTENER,
          roomId: route.params.id,
          userName: name,
        })
      );
    dispatch(get_listeners());
  }, [justJoined]);

  const myFUN = () => {
    try {
      let isFront = true;
      mediaDevices.enumerateDevices().then((sourceInfos) => {
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (
            sourceInfo.kind == "videoinput" &&
            sourceInfo.facing == (isFront ? "front" : "environment")
          ) {
            videoSourceId = sourceInfo.deviceId;
          }
        }
        mediaDevices
          .getUserMedia({
            audio: true,
            video: {
              mandatory: {
                minWidth: 200,
                minHeight: 200,
                minFrameRate: 30,
              },
              facingMode: isFront ? "user" : "environment",
              optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
            },
          })
          .then((stream) => {
            dispatch(
              join_Room({
                type: VIDEO,
                roomId: route.params.id,
                userName: name,
                stream: stream,
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      });
      dispatch(get_users());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    return () => {
      console.log("Unmounted");
      dispatch(disconnectFromRoom());
      //socket.emit("user-disconnected");
    };
  }, []);

  return (
    <>
      {justJoined ? (
        <ChooseName
          NameSitter={setName}
          StateSitter={setJustJoined}
          asListener={asListener}
          setAsListener={setAsListener}
        />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              display: "flex",
              flex: 0.4,
              backgroundColor: "#73dcff",
            }}
          >
            <Text>Chatting {route.params.id}</Text>
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {!asListener ? (
                <RTCView
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: "black",
                  }}
                  streamURL={myVideoStream?.toURL()}
                />
              ) : null}
              {RemoteVideoStreams.map((RVS, index) => (
                <RTCView
                  key={index}
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: "black",
                  }}
                  streamURL={RVS.Stream.toURL()}
                />
              ))}
              {VideoStreams.map((VS, index) => (
                <RTCView
                  key={index + RemoteVideoStreams.length}
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: "black",
                  }}
                  streamURL={VS.Stream.toURL()}
                />
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              display: "flex",
              flex: 0.6,
              backgroundColor: "white",
            }}
          >
            <Text>Listening</Text>
            <ScrollView
              contentContainerStyle={{
                flex: 0.8,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {[...Array(RoomListeners.length)].map((user, index) => (
                <Avatar
                  key={index}
                  rounded
                  icon={{ name: "user", type: "font-awesome" }}
                  activeOpacity={0.7}
                  containerStyle={{ backgroundColor: "purple" }}
                  title={user?.username}
                />
              ))}
            </ScrollView>
            <View
              style={{
                position: "relative",
                backgroundColor: "#ff0080",
              }}
            ></View>
          </View>
        </View>
      )}
    </>
  );
}

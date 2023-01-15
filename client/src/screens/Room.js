import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Icon, Avatar } from "react-native-elements";
import { io } from "socket.io-client";
import Peer from "react-native-peerjs";
import ChooseName from "../components/ChooseName";
import {
  disconnectFromRoom,
  get_listeners,
  join_Room,
  user_joined_room,
  user_quit_room,
} from "../store/actions/Actions";
import { RTCView, mediaDevices } from "react-native-webrtc";
import { VIDEO, AUDIO, LISTENER, FLUSH_ROOM_CHAT } from "../store/constants";
import { useDispatch, useSelector } from "react-redux";
import InCallManager from "react-native-incall-manager";
import ChatComponent from "../components/ChatComponent";
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
export default function Room({ navigation, route }) {
  const [justJoined, setJustJoined] = useState(true);
  const [name, setName] = useState("?");
  const [asListener, setAsListener] = useState(false);
  const { RoomListeners } = useSelector((state) => state.ListenReducer);
  const { myVideoStream, VideoStreams, RemoteVideoStreams, Loading } =
    useSelector((state) => state.MediaReducer);

  const [streamLongPressed, setStreamLongPressed] = useState();
  const [myStreamStatus, setMyStreamStatus] = useState({
    video: true,
    audio: true,
  });

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
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    return () => {
      if (!justJoined) {
        console.log("Unmounted");
        dispatch(disconnectFromRoom());
        dispatch(user_quit_room(route.params.id));
        dispatch({ type: FLUSH_ROOM_CHAT });
      }
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
        <ScrollView
          horizontal
          style={{ flex: 1 }}
          snapToInterval={Dimensions.get("window").width}
          bounces
          decelerationRate={"fast"}
          snapToAlignment="center"
        >
          <View
            style={{
              height: WINDOW_HEIGHT - 100,
              width: WINDOW_WIDTH,
              backgroundColor: "white",
              justifyContent: "flex-start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                display: "flex",
                flex: 0.6,
                backgroundColor: "#4CAF50",
                padding: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "#419c45",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 20 }}>Chatting about</Text>
                <Text style={{ fontSize: 23, color: "rgba(60, 49, 127, 1)" }}>
                  {" "}
                  {route.params.title}
                </Text>
              </View>
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
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <TouchableOpacity
                      onLongPress={() => {
                        if (streamLongPressed?.index == -1)
                          setStreamLongPressed();
                        else setStreamLongPressed({ index: -1 });
                      }}
                    >
                      <RTCView
                        style={{
                          width: 200,
                          height: 200,
                          backgroundColor: "black",
                        }}
                        streamURL={myVideoStream?.toURL()}
                      />
                    </TouchableOpacity>
                    {streamLongPressed != null &&
                    streamLongPressed.index == -1 ? (
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          backgroundColor: "rgba(0, 0, 0, .3)",
                          height: 30,
                          width: 200,
                        }}
                      >
                        <Button
                          onPress={() => {
                            setMyStreamStatus((prev) =>
                              prev.video == true
                                ? {
                                    ...prev,
                                    video: false,
                                  }
                                : {
                                    ...prev,
                                    video: true,
                                  }
                            );
                          }}
                        />
                        <Button
                          onPress={() => {
                            setMyStreamStatus((prev) =>
                              prev.audio == true
                                ? {
                                    ...prev,
                                    audio: false,
                                  }
                                : {
                                    ...prev,
                                    audio: true,
                                  }
                            );
                          }}
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}
                {RemoteVideoStreams.map((RVS, index) => (
                  <TouchableOpacity
                    onLongPress={() => {
                      setStreamLongPressed({ index: index, kind: "RVS" });
                      console.log("long");
                    }}
                  >
                    <RTCView
                      key={index}
                      style={{
                        width: 200,
                        height: 200,
                        backgroundColor: "black",
                      }}
                      streamURL={RVS.Stream.toURL()}
                    />
                  </TouchableOpacity>
                ))}
                {VideoStreams.map((VS, index) => (
                  <TouchableOpacity
                    onLongPress={() => {
                      setStreamLongPressed({ index: index, kind: "VS" });
                      console.log("long");
                    }}
                  >
                    <RTCView
                      key={index + RemoteVideoStreams.length}
                      style={{
                        width: 200,
                        height: 200,
                        backgroundColor: "black",
                      }}
                      streamURL={VS.Stream.toURL()}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            {/* add right arrow icon that is connected between these sections*/}
            <View
              style={{
                padding: 10,
                display: "flex",
                alignItems: "flex-end",
                zIndex: 1,
                backgroundColor: "rgba(100, 49, 250, 1)",
                width: "10%",
                position: "absolute",
                // put this in the middle of the screen
                top: WINDOW_HEIGHT / 2 - 10,
                right: 0,
              }}
            >
              <Icon name="comments" type="font-awesome" color="white" />
              <Icon
                name="arrow-right"
                type="font-awesome"
                color="white"
                size={20}
              />
            </View>
            <View
              style={{
                display: "flex",
                flex: 0.4,
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  padding: 5,
                  backgroundColor: "#f2eded",
                  borderRadius: 5,
                  borderColor: "grey",
                  borderWidth: 0.1,
                  width: "25%",
                }}
              >
                Listening
              </Text>
              <ScrollView
                contentContainerStyle={{
                  flex: 0.8,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  margin: 10,
                  //alignItems: "",
                }}
              >
                {[...Array(RoomListeners.length)].map((user, index) => (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      key={index}
                      rounded
                      icon={{ name: "user", type: "font-awesome" }}
                      activeOpacity={0.7}
                      containerStyle={{ backgroundColor: "purple" }}
                      title={name[0]}
                      size="medium"
                    />
                    <Text style={{ fontSize: 20, color: "black" }}>{name}</Text>
                  </View>
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
          <ChatComponent />
        </ScrollView>
      )}
    </>
  );
}

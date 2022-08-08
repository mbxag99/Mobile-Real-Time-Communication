import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Text } from "react-native-elements";
import { io } from "socket.io-client";
import Peer from "react-native-peerjs";
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
import { RTCView, mediaDevices } from "react-native-webrtc";

export default function RoomVideoChat() {
  useEffect(() => {
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
          audio: false,
          video: {
            mandatory: {
              minWidth: 500,
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? "user" : "environment",
            optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
          },
        })
        .then((stream) => {
          this.props.joinRoom(stream);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ width: WINDOW_WIDTH }}>
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "green" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
      </ScrollView>
    </View>
  );
}

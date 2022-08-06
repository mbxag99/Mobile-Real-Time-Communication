import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Text } from "react-native-elements";
import { io } from "socket.io-client";
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

export default function RoomVideoChat() {
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

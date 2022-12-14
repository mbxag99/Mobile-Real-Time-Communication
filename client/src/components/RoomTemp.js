import React, { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import Room from "../screens/Room";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight || 0;
export default function RoomTemp({
  navigation,
  id,
  caption,
  numParticipants,
  tags,
  color,
  image,
}) {
  return (
    <View
      style={{
        height: WINDOW_HEIGHT - 100,
        width: WINDOW_WIDTH,
      }}
    >
      {color == null || color == "" ? (
        <ImageBackground
          resizeMode="cover"
          source={{ uri: image }}
          blurRadius={8}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <FAST
            navigation={navigation}
            id={id}
            caption={caption}
            numParticipants={numParticipants}
            tags={tags}
          />
        </ImageBackground>
      ) : (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            backgroundColor: color,
          }}
        >
          <FAST
            navigation={navigation}
            id={id}
            caption={caption}
            numParticipants={numParticipants}
            tags={tags}
          />
        </View>
      )}
    </View>
  );
}

function FAST({ navigation, id, caption, numParticipants, tags }) {
  return (
    <>
      <Text
        style={{
          backgroundColor: "rgba(52, 52, 52, 0.2)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {id}
      </Text>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ backgroundColor: "rgba(3, 232, 249, 0.3)" }}>
          Caption: {caption}
        </Text>
        <Text style={{ backgroundColor: "rgba(3, 232, 249, 0.3)" }}>
          #Participants: {numParticipants}
        </Text>
        <Text style={{ backgroundColor: "rgba(3, 232, 249, 0.3)" }}>
          TAGS: {tags}
        </Text>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "rgba(52, 52, 52, 0.8)" }}
        onPress={() => navigation.navigate("Room", { id: id })}
      >
        <Icon size={100} name="pointer" type="evilicon" color="#517fa4" />
      </TouchableOpacity>
    </>
  );
}

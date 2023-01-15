import React, { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import Room from "../screens/Room";

const classes = StyleSheet.create({
  room_overview: {
    width: "100%",
    height: "100%",
  },

  room_overview_content: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  room_overview_texts: {
    margin: 10,
    flex: 2,
    justifyContent: "flex-end",
  },
  room_overview_text: {
    color: "white",
    fontSize: 30,
  },
  room_overview_button: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
});

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight || 0;
export default function RoomTemp({
  navigation,
  id,
  caption,
  numParticipants,
  title,
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
          blurRadius={1}
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
            title={title}
          />
        </ImageBackground>
      ) : (
        <View style={{ ...classes.room_overview, backgroundColor: color }}>
          <FAST
            navigation={navigation}
            id={id}
            caption={caption}
            numParticipants={numParticipants}
            title={title}
          />
        </View>
      )}
    </View>
  );
}

function FAST({ navigation, id, caption, numParticipants, title }) {
  return (
    <View style={classes.room_overview_content}>
      <View style={classes.room_overview_texts}>
        <Text style={classes.room_overview_text}>{caption}</Text>
        <View style={{ display: "flex", flexDirection: "row", margin: 10 }}>
          <Icon
            size={40}
            name="person"
            type="ionicon"
            color="#517fa4"
            style={{ marginRight: 10 }}
          />
          <Text style={classes.room_overview_text}>
            10{/*numParticipants*/}
          </Text>
        </View>
      </View>
      <View style={classes.room_overview_button}>
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(52, 52, 52, 0.8)",
            height: 50,
            marginRight: 160,
            marginBottom: 100,
          }}
          onPress={() => navigation.navigate("Room", { id: id, title: title })}
        >
          <Icon size={50} name="enter" type="antdesign" color="#517fa4" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

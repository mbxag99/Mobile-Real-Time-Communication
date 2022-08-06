import React, { useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-detect"; //https://github.com/glepur/react-native-swipe-gestures
import RoomTemp from "./RoomTemp";
const DATA = [
  {
    id: 1,
    caption: "Cute dog shaking hands #cute #puppy",
    image: "https://wallpaperaccess.com/full/1669289.jpg",
    numParticipants: 0,
    tags: ["shooting", "vox"],
  },
  {
    id: 2,
    caption: "cure",
    tags: ["teachers", "texas", "fuck"],
    numParticipants: 2,
    image: "https://wallpaperaccess.com/thumb/266770.jpg",
  },
  {
    id: 3,
    numParticipants: 3,
    caption: "Brown little puppy #cute #puppy",
    tags: ["Song #3"],
    image: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 4,
    numParticipants: 4,
    caption: "Brown little puppy #cute #puppy",
    tags: ["Song #3"],
    image: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 5,
    numParticipants: 5,
    caption: "Brown little puppy #cute #puppy",
    tags: ["Song #3"],
    image: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 6,
    numParticipants: 6,
    caption: "Brown little puppy #cute #puppy",
    tags: ["Song #3"],
    image: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
];
export default function Content({ navigation }) {
  const [status, setStatus] = useState("first");
  const config = {
    velocityThreshold: 0,
    directionalOffsetThreshold: 70,
  };

  return (
    <FlatList
      data={DATA}
      renderItem={(item, index) => (
        <RoomTemp
          navigation={navigation}
          id={item.item.id}
          caption={item.item.caption}
          numParticipants={item.item.numParticipants}
          tags={item.item.tags}
          image={item.item.image}
        />
      )}
      keyExtractor={(item) => item.id}
      snapToAlignment="center"
      decelerationRate={"fast"}
      snapToInterval={Dimensions.get("window").height - 100}
      bounces
    />
  );
}

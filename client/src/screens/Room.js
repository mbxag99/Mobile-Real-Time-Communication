import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-elements";
import { Icon, Avatar } from "react-native-elements";
import { io } from "socket.io-client";
import { Peer } from "peerjs";
import ChooseName from "../components/ChooseName";

const APIurl = "http://10.0.0.16:3001/";
const socket = io(`${APIurl}` /*, { transports: ["websocket"] }*/);

export default function Room({ navigation, route }) {
  const [justJoined, setJustJoined] = useState(true);
  const [name, setName] = useState("?");
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    if (!justJoined) {
      socket.emit("join-room", { roomId: route.params.id, userName: name });
      socket.on("all-users", (users) => {
        console.log(users);
        setRoomUsers(users);
      });
    }
  }, [justJoined]);

  useEffect(() => {
    return () => {
      console.log("Unmounted");
      socket.emit("user-disconnected");
    };
  }, []);

  return (
    <>
      {justJoined ? (
        <ChooseName NameSitter={setName} StateSitter={setJustJoined} />
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
              flex: 0.3,
              backgroundColor: "#73dcff",
            }}
          >
            <Text>Chatting {route.params.id}</Text>
            <ScrollView
              contentContainerStyle={{
                flex: 0.8,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {[...Array(roomUsers.length)].map(() => (
                <Avatar
                  rounded
                  icon={{ name: "user", type: "font-awesome" }}
                  activeOpacity={0.7}
                  containerStyle={{
                    backgroundColor: "purple",
                    borderColor: "green",
                  }}
                />
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              display: "flex",
              flex: 0.7,
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
              {[...Array(roomUsers.length)].map((user, index) => (
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
            >
              <Icon
                name="heartbeat"
                type="font-awesome"
                onPress={() => {
                  navigation.navigate("RoomVideoChat"), { id: route.params.id };
                }}
              ></Icon>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

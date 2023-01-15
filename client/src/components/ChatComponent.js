import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { send_message_to_room } from "../store/actions/Actions";
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
export default function ChatComponent() {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  const { RoomChat, ChatLoading } = useSelector(
    (state) => state.RoomChatReducer
  );

  return (
    <View
      style={{
        height: WINDOW_HEIGHT - 100,
        width: WINDOW_WIDTH,
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(52, 52, 52, 0.8)",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
        behavior="padding"
      >
        <ScrollView
          contentContainerStyle={{
            borderWidth: 10,
            borderColor: "rgba(52, 52, 52, 0.8)",
            width: WINDOW_WIDTH,
            backgroundColor: "#303030",
            padding: 10,
          }}
        >
          {RoomChat.map((chatter, Index) => (
            <View key={Index} style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 30, color: "#212121" }}>
                {chatter.user}:
              </Text>
              <Text
                style={{
                  color: /* rand color for each */ `rgb(${
                    Math.random() * 100
                  },0,0)`,
                  fontSize: 30,
                }}
              >
                {" "}
                {chatter.message}
              </Text>
            </View>
          ))}
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          /* keyboardVerticalOffset={100} */
          keyboardVerticalOffset={20}
          style={{
            width: WINDOW_WIDTH,
            backgroundColor: "rgba(52, 52, 52, 0.8)",
          }}
        >
          <Input
            onSubmitEditing={() => {
              if (inputText.length > 0) {
                dispatch(send_message_to_room(inputText));
                setInputText("");
              }
            }}
            style={{
              width: WINDOW_WIDTH,
              backgroundColor: "white",
              padding: 10,
            }}
            placeholder="Chat"
            leftIcon={{
              type: "font-awesome",
              name: "comment",
              color: "white",
            }}
            rightIcon={
              <Icon
                name="send"
                color="white"
                onPress={() => {
                  if (inputText.length > 0) {
                    dispatch(send_message_to_room(inputText));
                    setInputText("");
                  }
                }}
              />
            }
            rightIconContainerStyle={{
              height: 50,
              width: 50,
              backgroundColor: "rgba(52, 52, 52, 0.8)",
            }}
            value={inputText}
            onChangeText={(value) => {
              setInputText(value);
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

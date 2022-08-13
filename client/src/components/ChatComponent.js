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
          backgroundColor: "#4c69a5",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
        behavior="padding"
      >
        <ScrollView
          contentContainerStyle={{
            borderWidth: 5,
            borderColor: "grey",
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT - 175,
          }}
        >
          {RoomChat.map((chatter) => (
            <>
              <Text>{chatter.user} :</Text>
              <Text style={{ color: "red" }}>{chatter.message}</Text>
            </>
          ))}
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            width: WINDOW_WIDTH,
            backgroundColor: "grey",
          }}
        >
          <Input
            placeholder="Chat"
            leftIcon={{
              type: "font-awesome",
              name: "comment",
            }}
            rightIcon={
              <Button
                onPress={() => {
                  dispatch(send_message_to_room(inputText));
                  setInputText("");
                }}
              />
            }
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

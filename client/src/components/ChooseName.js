import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import { CheckBox } from "@rneui/themed";

export default function ChooseName({
  NameSitter,
  StateSitter,
  asListener,
  setAsListener,
}) {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        alignContent: "center",
        backgroundColor: "black",
      }}
    >
      <Input
        style={{ color: "white", fontSize: 30 }}
        placeholder="Choose a Name"
        onChangeText={(value) => NameSitter(value)}
      />
      <CheckBox
        containerStyle={{
          backgroundColor: "black",
          borderColor: "black",
        }}
        textStyle={{
          color: "white",
          fontSize: 20,
        }}
        center
        title="Enter as a listener"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={asListener}
        onPress={() => {
          setAsListener((jj) => !jj);
        }}
      />
      <Button
        title="Join"
        onPress={() => {
          StateSitter(false);
        }}
      />
    </View>
  );
}

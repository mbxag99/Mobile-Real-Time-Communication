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
      }}
    >
      <Input
        placeholder="Choose Name"
        onChangeText={(value) => NameSitter(value)}
      />
      <CheckBox
        center
        title="Enter as listener"
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

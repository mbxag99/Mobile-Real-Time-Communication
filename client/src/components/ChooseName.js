import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";

export default function ChooseName({ NameSitter, StateSitter }) {
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
      <Button
        title="Join"
        onPress={() => {
          StateSitter(false);
        }}
      />
    </View>
  );
}

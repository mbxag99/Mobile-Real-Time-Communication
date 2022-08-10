import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Icon,
  Avatar,
  Chip,
  Input,
  Image,
  CheckBox,
} from "react-native-elements";
import { ColorPicker } from "react-native-btr";
export default function Create_New_Room() {
  const [tags, setTags] = useState([]);
  const [desription, setDiscription] = useState("");
  const [backImg, setBackImg] = useState("");
  const [checked, setChecked] = useState({ what: "Color", statuss: true });
  const [selectedColor, setSelectedColor] = useState("");
  function setColor(color) {
    setSelectedColor(color);
  }
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Input placeholder="Tags" />
        <Input placeholder="Description" />
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            center
            title="Background as Color"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked.statuss}
            onPress={() => {
              setChecked((prev) => ({ what: "Color", statuss: true }));
            }}
          />
          <CheckBox
            center
            title="Background as Image"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={!checked.statuss}
            onPress={() => {
              setChecked((prev) => ({ what: "image", statuss: false }));
            }}
          />
        </View>
        {checked.what == "Color" ? (
          <ColorPicker selectedColor={selectedColor} onSelect={setColor} />
        ) : (
          <Input placeholder="Background Image URL" />
        )}
      </View>
      <Button title={"Submit"} />
    </View>
  );
}

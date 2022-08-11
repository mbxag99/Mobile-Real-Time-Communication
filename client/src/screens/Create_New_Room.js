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
import { useDispatch, useSelector } from "react-redux";
import { create_new_room, get_all_rooms } from "../store/actions/Actions";

export default function Create_New_Room() {
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [desription, setDiscription] = useState("");
  const [backImg, setBackImg] = useState(null);
  const [checked, setChecked] = useState({ what: "Color", statuss: true });
  const [selectedColor, setSelectedColor] = useState(null);

  function setColor(color) {
    setSelectedColor(color);
  }

  const create_room = () => {
    const data = {
      tags: tags,
      description: desription,
      color: selectedColor,
      img: backImg,
    };
    console.log("HUH");
    dispatch(create_new_room(data));
    dispatch(get_all_rooms());
  };
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
        <Input placeholder="Tags" onChangeText={(value) => setTags(value)} />
        <Input
          placeholder="Description"
          onChangeText={(value) => setDiscription(value)}
        />
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
          <Input
            placeholder="Background Image URL"
            onChangeText={(value) => setBackImg(value)}
          />
        )}
      </View>
      <Button title={"Submit"} onPress={() => create_room()} />
    </View>
  );
}

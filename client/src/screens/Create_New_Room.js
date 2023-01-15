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
import DropDownPicker from "react-native-dropdown-picker";
import colorpicker from "../../assets/color-picker.png";
import clapboard from "../../assets/clapboard.png";

export default function Create_New_Room({ navigation }) {
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [desription, setDiscription] = useState("");
  const [backImg, setBackImg] = useState(null);
  const [checked, setChecked] = useState({ what: "Color", statuss: true });
  const [selectedColor, setSelectedColor] = useState(null);
  const [category, setCategory] = useState([
    { label: "Science", value: "Science" },
    { label: "Socials", value: "Socials" },
    { label: "Economics", value: "Economics" },
    { label: "Trading", value: "Trading" },
    { label: "Software", value: "Software" },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [video, setVideo] = useState(null);

  function setColor(color) {
    setSelectedColor(color);
  }

  const create_room = () => {
    const data = {
      title: tags,
      description: desription,
      color: selectedColor,
      img: backImg,
      video: video,
      category: value,
      numParticipants: 0,
    };
    console.log("data", data);
    dispatch(create_new_room(data));
    dispatch(get_all_rooms());
    navigation.navigate("Home");
  };
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-evenly",
          height: "70%",
        }}
      >
        <Input
          style={{ color: "white" }}
          placeholder="Title"
          onChangeText={(value) => setTags(value)}
        />
        <Input
          style={{ color: "white" }}
          placeholder="Description"
          onChangeText={(value) => setDiscription(value)}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          Background
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image source={colorpicker} style={{ width: 25, height: 25 }} />
            <CheckBox
              containerStyle={{
                backgroundColor: "black",
                borderColor: "black",
              }}
              textStyle={{
                color: "white",
                fontSize: 16,
              }}
              center
              title="Color"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={checked.statuss}
              onPress={() => {
                setChecked((prev) => ({ what: "Color", statuss: true }));
                setBackImg(null);
              }}
            />
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image source={clapboard} style={{ width: 25, height: 25 }} />
            <CheckBox
              containerStyle={{
                backgroundColor: "black",
                borderColor: "black",
              }}
              textStyle={{
                color: "white",
                fontSize: 15,
              }}
              center
              title="Image/Video"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={!checked.statuss}
              onPress={() => {
                setChecked((prev) => ({ what: "image", statuss: false }));
                setSelectedColor(null);
              }}
            />
          </View>
        </View>
        {checked.what == "Color" ? (
          <ColorPicker selectedColor={selectedColor} onSelect={setColor} />
        ) : (
          <Input
            style={{ color: "white" }}
            placeholder="Background Image/Video URL"
            onChangeText={(value) => setBackImg(value)}
          />
        )}

        <DropDownPicker
          placeholder="Select Category"
          open={open}
          value={value}
          items={category}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setCategory}
          theme="DARK"
          multiple={true}
          mode="BADGE"
          badgeDotColors={[
            "#e76f51",
            "#00b4d8",
            "#e9c46a",
            "#e76f51",
            "#8ac926",
            "#00b4d8",
            "#e9c46a",
          ]}
          containerStyle={{
            width: "90%",
            marginLeft: 20,
            marginRight: 10,
            marginTop: 10,
          }}
        />
      </View>
      <Button
        buttonStyle={{
          //"bluish",
          backgroundColor: "rgba(0, 100, 100, 0.5)",
          borderColor: "white",
          borderWidth: 1,
          borderRadius: 10,
          width: "90%",
          marginLeft: 20,
          marginRight: 10,
          marginTop: 150,
        }}
        title={"Create"}
        onPress={() => create_room()}
      />
    </View>
  );
}

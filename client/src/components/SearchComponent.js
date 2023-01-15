import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";

export default function SearchComponent({ setHardLoading, setCurrSubj }) {
  const [category, setCategory] = useState([
    { label: "General", value: "All" },
    { label: "Science", value: "Science" },
    { label: "Socials", value: "Socials" },
    { label: "Economics", value: "Economics" },
    { label: "Trading", value: "Trading" },
    { label: "Software", value: "Software" },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [filter, setFilter] = useState("");
  const [out, setOut] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [customCateArr, setCustomCateArr] = useState([]);

  useEffect(() => {
    setCurrSubj(out);
  }, [out]);

  return !collapsed ? (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 70,
        justifyContent: "space-around",
        height: 300,
        position: "absolute",
      }}
    >
      <Input
        placeholder="Custom Category"
        onChange={(e) => {
          setFilter(e.nativeEvent.text);
        }}
        onKeyPress={(e) => {
          if (
            e.nativeEvent.key === " " ||
            e.nativeEvent.key === "," ||
            e.nativeEvent.key === "Enter"
          ) {
            setCustomCateArr([...customCateArr, filter]);
            setFilter("");
          }
        }}
      />
      <DropDownPicker
        items={category}
        open={open}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setCategory}
        placeholder="Select a category"
        multiple={true}
        mode="BADGE"
        theme="DARK"
      />
      {/* apply filter */}
      <Button
        title="Apply Filter"
        onPress={() => {
          console.log("value", value);
          console.log("customCateArr", customCateArr);
          setOut([...value, ...customCateArr]);
          setCollapsed(true);
        }}
        style={{
          borderRadius: 10,
        }}
      />
    </View>
  ) : (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 70,
        position: "absolute",
        width: "100%",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
          marginTop: 5,
        }}
      >
        Filter
      </Text>
      <Icon
        color={"white"}
        name="arrow-down"
        type="font-awesome"
        onPress={() => setCollapsed(false)}
      />
    </View>
  );
}

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-detect"; //https://github.com/glepur/react-native-swipe-gestures
import { useDispatch, useSelector } from "react-redux";
import { get_all_rooms } from "../store/actions/Actions";
import RoomTemp from "./RoomTemp";
import SearchComponent from "./SearchComponent";

const DATA = [
  {
    id: 1,
    caption: "Cute dog shaking hands #cute #puppy",
    image: "https://wallpaperaccess.com/full/1669289.jpg",
    numParticipants: 0,
    tags: ["shooting", "vox"],
  },
  {
    id: 2,
    caption: "cure",
    tags: ["teachers", "texas", "fuck"],
    numParticipants: 2,
    image: "https://wallpaperaccess.com/thumb/266770.jpg",
  },
  {
    id: 3,
    numParticipants: 3,
    caption: "Brown little puppy #cute #puppy",
    tags: ["Song #3"],
    image: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 4,
    numParticipants: 4,
    caption: "Brown little puppy #cute #puppy",
    tags: ["Song #3"],
    image: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 5,
    numParticipants: 5,
    caption: "Brown little puppy #cute #puppy",
    tags: ["Song #3"],
    image: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
  {
    id: 6,
    numParticipants: 6,
    caption: "Brown little puppy #cute #puppy",
    tags: ["Song #3"],
    image: "https://wallpaperaccess.com/thumb/384178.jpg",
  },
];
export default function Content({ navigation }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("first");
  const [currSubj, setCurrSubj] = useState("All");
  const [selected, setSelected] = useState("FYP");
  const [hardLoading, setHardLoading] = useState(true);
  const [searchPop, setSearchPop] = useState(false);
  const config = {
    velocityThreshold: 0,
    directionalOffsetThreshold: 70,
  };
  const { Rooms, LoadingRooms } = useSelector((state) => state.RoomReducer);

  useEffect(() => {
    if (!LoadingRooms) setHardLoading(false);
  }, [LoadingRooms]);

  useEffect(() => {
    dispatch(get_all_rooms({ category: currSubj }));
  }, []);

  useEffect(() => {
    dispatch(get_all_rooms({ category: currSubj }));
  }, [currSubj]);

  return (
    <>
      <View
        style={{
          height: 80,
          position: "absolute",
          top: 0,
          zIndex: 1,
          backgroundColor: /* transparent */ "rgba(255,255,255,0.04)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          padding: 10,
          width: "100%",
        }}
      >
        {/*<ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: 10,
            height: 40,
            padding: 5,
          }}
        >
          <Text
            style={{
              ...styles.subject,
              backgroundColor:
                currSubj == "Science" ? "rgba(255,255,255,0.3)" : "transparent",
              color: currSubj == "Science" ? "black" : "gray",
            }}
            onPress={() => {
              setCurrSubj("Science");
              setHardLoading(true);
              dispatch(get_all_rooms({ category: "Science" }));
            }}
          >
            Science
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
            }}
          >
            |{" "}
          </Text>
          <Text
            style={{
              ...styles.subject,
              backgroundColor:
                currSubj == "Software"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              color: currSubj == "Software" ? "black" : "gray",
            }}
            onPress={() => {
              setCurrSubj("Software");
              setHardLoading(true);
              dispatch(get_all_rooms({ category: "Software" }));
            }}
          >
            Software
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
            }}
          >
            |{" "}
          </Text>
          <Text
            style={{
              ...styles.subject,
              backgroundColor:
                currSubj == "Socials" ? "rgba(255,255,255,0.3)" : "transparent",
              color: currSubj == "Socials" ? "black" : "gray",
            }}
            onPress={() => {
              setCurrSubj("Socials");
              setHardLoading(true);
              dispatch(get_all_rooms({ category: "Socials" }));
            }}
          >
            Socials
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
            }}
          >
            |{" "}
          </Text>
          <Text
            style={{
              ...styles.subject,
              backgroundColor:
                currSubj == "Economics"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              color: currSubj == "Economics" ? "black" : "gray",
            }}
            onPress={() => {
              setCurrSubj("Economics");
              setHardLoading(true);
              dispatch(get_all_rooms({ category: "Economics" }));
            }}
          >
            Economics
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
            }}
          >
            |{" "}
          </Text>
          <Text
            style={{
              ...styles.subject,
              backgroundColor:
                currSubj == "Trading" ? "rgba(255,255,255,0.3)" : "transparent",
              color: currSubj == "Trading" ? "black" : "gray",
            }}
            onPress={() => {
              setCurrSubj("Trading");
              setHardLoading(true);
              dispatch(get_all_rooms({ category: "Trading" }));
            }}
          >
            Trading
          </Text>
        </ScrollView>*/}
        <View>
          {/* for you icon */}
          <Text
            style={{
              color: selected == "FYP" ? "white" : "gray",
              fontSize: 25,
            }}
            onPress={() => {
              setSelected("FYP");
              dispatch(get_all_rooms({ category: "All" }));
              setSearchPop(false);
            }}
          >
            For You
          </Text>
          {selected == "FYP" ? (
            <View
              style={{
                backgroundColor: "white",
                marginTop: 5,
                height: 3,
                width: 50,
                borderRadius: 10,
                left: 20,
              }}
            ></View>
          ) : null}
        </View>
        <View style={{ marginLeft: 5 }}>
          <Icon
            name="search"
            type="feather"
            color={selected == "Search" ? "white" : "gray"}
            size={30}
            onPress={() => {
              setSelected("Search");
              setSearchPop(true);
              dispatch(get_all_rooms({ category: "" }));
            }}
          />
          {selected == "Search" ? (
            <View
              style={{
                backgroundColor: "white",
                marginTop: 5,
                height: 3,
                width: 20,
                borderRadius: 10,
                left: 10,
              }}
            ></View>
          ) : null}
        </View>
      </View>
      {searchPop ? (
        <SearchComponent
          setHardLoading={setHardLoading}
          setCurrSubj={setCurrSubj}
        />
      ) : null}
      {hardLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : !hardLoading && Rooms.length > 0 ? (
        <View>
          <FlatList
            data={Rooms}
            onEndReached={() => {
              console.log("Gerr " + currSubj);
              //setHardLoading(true);
              setStatus("second");
              // dispatch(get_all_rooms({ category: currSubj }));
            }}
            renderItem={(item, index) => (
              <RoomTemp
                key={index}
                navigation={navigation}
                id={item.item.ID}
                caption={item.item.description}
                numParticipants={item.item.numParticipants | 0}
                title={item.item.title}
                color={item.item.color}
                image={item.item.img}
              />
            )}
            snapToAlignment="center"
            decelerationRate={"fast"}
            snapToInterval={Dimensions.get("window").height - 100}
            bounces
            onContentSizeChange={() => {
              console.log("content size changed");
              //dispatch(get_all_rooms({ category: currSubj }));
              // setHardLoading(true);
            }}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: "black",
              fontSize: 25,
              color: "white",
              alignItems: "center",
              alignContent: "center",
              width: "100%",
            }}
          >
            There are no rooms
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  subject: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    padding: 2,
  },
});

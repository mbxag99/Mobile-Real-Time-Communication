import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Room from "./src/screens/Room";
import Index from "./src/screens/Index";
import RoomTemp from "./src/components/RoomTemp";
import { useDispatch } from "react-redux";
import { get_all_rooms } from "./src/store/actions/Actions";
const Stack = createNativeStackNavigator();

const IndexScreenNavigator = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.addListener("tabPress", (e) => {
      console.log("registered");
      dispatch(get_all_rooms({ category: "Science" }));
    });
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
};
export { IndexScreenNavigator };

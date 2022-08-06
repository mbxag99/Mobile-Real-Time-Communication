import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Room from "./src/screens/Room";
import Index from "./src/screens/Index";
import RoomTemp from "./src/components/RoomTemp";
import RoomVideoChat from "./src/screens/RoomVideoChat";
const Stack = createNativeStackNavigator();

const IndexScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="Room" component={Room} />
      <Stack.Screen name="RoomVideoChat" component={RoomVideoChat} />
    </Stack.Navigator>
  );
};
export { IndexScreenNavigator };

import {
  StatusBar,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import Index from "./src/screens/Index";
import { IndexScreenNavigator } from "./CustomNavigation";
import Create_New_Room from "./src/screens/Create_New_Room";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Room from "./src/screens/Room";
import { Icon } from "react-native-elements";
import { connect, useDispatch } from "react-redux";
import { get_all_rooms } from "./src/store/actions/Actions";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const dispatch = useDispatch();
  // React-Native,Redux,nodejs,expressjs,peerjs,socket io,NoSQL database(lokijs)
  return (
    <>
      <StatusBar backgroundColor={"black"} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarHideOnKeyboard: true,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === "Home") iconName = focused ? "home" : "home-outline";
                else if (rn === "New Room")
                  iconName = focused ? "add-circle" : "add-circle-outline";

                // You can return any component that you like here!
                return (
                  <Icon
                    name={iconName}
                    type="ionicon"
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarStyle: {},
            })}
            initialRouteName="Home"
          >
            <Tab.Screen name="Home" component={IndexScreenNavigator} />
            <Tab.Screen name="New Room" component={Create_New_Room} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Room from "./src/screens/Room";
import RoomVideoChat from "./src/screens/RoomVideoChat";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === "Home") iconName = focused ? "home" : "home-outline";

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
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

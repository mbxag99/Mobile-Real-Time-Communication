import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

import Content from "../components/Content.js";
export default function Index({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Content navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { Tabs } from "expo-router";
import { Colors } from "react-native-ui-lib";

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.$textDefault,
        tabBarStyle: {
          backgroundColor: Colors.$backgroundDefault,
          borderTopWidth: 0,
        },
      }}
    />
  );
}

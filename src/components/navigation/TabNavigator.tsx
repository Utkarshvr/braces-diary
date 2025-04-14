import { useAppearanceSchemeStore } from "@/store/AppearanceSchemeStore";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "react-native-ui-lib";

export default function TabNavigator() {
  // const sc = useColorScheme(); // just to ensure this always re-render while changing color mode
  // console.log(sc, " ", Colors.$backgroundDefault);
  useAppearanceSchemeStore();

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

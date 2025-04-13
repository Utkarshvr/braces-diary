import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native-ui-lib";

export default function RootLayout() {
  useColorScheme(); // just to ensure this always re-render while changing color mode
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          height: "100%",
          width: "100%",
          backgroundColor: Colors.$backgroundDefault,
        },
      ]}
    >
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.$backgroundDefault },
          headerTintColor: Colors.$textDefault,

          headerShown: false,
        }}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

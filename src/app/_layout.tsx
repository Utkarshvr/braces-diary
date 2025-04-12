import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "react-native-ui-lib";
Colors.setScheme("default");

export default function RootLayout() {
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
        }}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

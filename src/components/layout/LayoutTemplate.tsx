import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native-ui-lib";

export default function LayoutTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {children}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

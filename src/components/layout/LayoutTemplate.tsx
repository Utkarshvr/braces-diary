import { useAppearanceSchemeStore } from "@/store/AppearanceSchemeStore";
import { StatusBar } from "expo-status-bar";
import { Appearance, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native-ui-lib";

export default function LayoutTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  // const sc = useColorScheme(); // just to ensure this always re-render while changing color mode
  // console.log(sc, " ", Colors.$backgroundDefault);
  // console.log(Appearance.getColorScheme(), " ", Colors.$backgroundDefault);
  useAppearanceSchemeStore();
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

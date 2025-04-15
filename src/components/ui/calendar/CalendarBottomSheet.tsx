import { useAppearanceSchemeStore } from "@/store/AppearanceSchemeStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors, Text } from "react-native-ui-lib";

export default function CalendarBottomSheet() {
  useAppearanceSchemeStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        snapPoints={["30%", "80%"]}
        backgroundStyle={{ backgroundColor: Colors.$backgroundNeutralLight }}
        handleIndicatorStyle={{
          backgroundColor: Colors.$backgroundNeutralMedium,
        }}
      >
        <BottomSheetView style={{ flex: 1, padding: 16, alignItems: "center" }}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

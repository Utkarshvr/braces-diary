import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native-ui-lib";

export default function CalendarBottomSheet() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet snapPoints={["30%", "100%"]}>
        <BottomSheetView style={{ flex: 1, padding: 16, alignItems: "center" }}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

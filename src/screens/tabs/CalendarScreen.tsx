import { View } from "react-native-ui-lib";
import CalendarView from "@/components/ui/calendar/CalendarView";
import CalendarBottomSheet from "@/components/ui/calendar/CalendarBottomSheet";

export default function CalendarScreen() {
  return (
    <View flex bg-$backgroundDefault>
      {/* Calendar: Select date */}
      <CalendarView />

      {/* Bottom Sheet */}
      <CalendarBottomSheet />
    </View>
  );
}

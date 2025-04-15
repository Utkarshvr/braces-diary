import { View, Colors } from "react-native-ui-lib";
import { useAppearanceSchemeStore } from "@/store/AppearanceSchemeStore";
import MyCalendar from "./MyCalendar";

export default function CalendarView() {
  // TODO: Fix theme being still
  const { colorScheme } = useAppearanceSchemeStore();
  console.log("Rerendered: ", colorScheme);

  return (
    <View>
      <MyCalendar
        hideExtraDays
        theme={{
          // Background & Text Color
          calendarBackground: Colors.$backgroundDefault,
          dayTextColor: Colors.$textDefault,
          monthTextColor: Colors.$textDefault,
          arrowColor: Colors.$textDefault,
          selectedDayBackgroundColor: Colors.$textDefault,

          selectedDayTextColor: "#000",
          todayBackgroundColor: Colors.$backgroundNeutral,

          todayTextColor: "#00adff",

          // Font Family
          textDayFontFamily: "montRegular",
          textMonthFontFamily: "montBold",
          todayButtonFontFamily: "montRegular",
          textDayHeaderFontFamily: "montRegular",
        }}
      />
    </View>
  );
}

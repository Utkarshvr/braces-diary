import { View } from "react-native";
import { Calendar } from "react-native-ui-lib/src/incubator";

export default function CalendarView() {
  return (
    <View>
      <Calendar data={[{ start: 1, end: 2, id: "2" }]} />
    </View>
  );
}

import { Colors, Text, View } from "react-native-ui-lib";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function BracesDurationScreen() {
  const [duration, setDuration] = useState({
    start: new Date().toDateString(),
    end: new Date("05-04-2027").toDateString(),
  });

  const [datePickerState, setDatePickerState] = useState<{
    type: "start" | "end";
    isOpen: boolean;
    value: Date;
  }>({
    type: "start",
    isOpen: false,
    value: new Date(),
  });

  const toggleDatePicker = () =>
    setDatePickerState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));

  function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (event.type === "set") {
      setDuration((prev) => ({
        ...prev,
        [datePickerState.type]: selectedDate?.toDateString(),
      }));
    }
    // else {
    //   toggleDatePicker();
    // }
  }

  console.log(datePickerState.isOpen);

  return (
    <View flex bg-$backgroundDefault padding-16>
      <Text $textNeutral montBold font-xl>
        Braces Duration
      </Text>

      <View marginT-8 row style={{ justifyContent: "space-between" }} center>
        <View>
          <Text font-sm>Start Time</Text>
          <TouchableOpacity
            onPress={() => {
              setDatePickerState({
                isOpen: true,
                type: "start",
                value: new Date(duration.start) || new Date(),
              });
            }}
          >
            <View padding-8 bg-$backgroundNeutral style={{ borderRadius: 8 }}>
              <Text montBold>{duration.start}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Horizontal line joining the two blocks */}
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: Colors.$backgroundNeutralIdle, // or any color you want
            marginHorizontal: 8, // spacing between the blocks
            marginTop: 16, // align with boxes vertically if needed
          }}
        />
        <View>
          <Text font-sm>End Time</Text>
          <TouchableOpacity
            onPress={() => {
              setDatePickerState({
                isOpen: true,
                type: "end",
                value: new Date(duration.end) || new Date(),
              });
            }}
          >
            <View padding-8 bg-$backgroundNeutral style={{ borderRadius: 8 }}>
              <Text montBold>{duration.end}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {datePickerState.isOpen && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={datePickerState.value}
          onChange={onDateChange}
        />
      )}
    </View>
  );
}

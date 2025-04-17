import { Button, Colors, Text, View } from "react-native-ui-lib";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useSessionStore } from "@/store/SessionStore";
import { supabase } from "@/lib/supabase";
import { UserInfoType } from "@/types/supabase-table-types";

type Props = {};

export default function BracesDurationForm({}: Props) {
  const today = new Date();
  const twoYearsLater = new Date(
    new Date().setFullYear(today.getFullYear() + 2)
  );

  const [duration, setDuration] = useState({
    start: today.toDateString(),
    end: twoYearsLater.toDateString(),
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

  function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (event.type === "set") {
      console.log(selectedDate);
      setDuration((prev) => ({
        ...prev,
        [datePickerState.type]: selectedDate?.toDateString(),
      }));
    }
    setDatePickerState({
      type: "start",
      isOpen: false,
      value: new Date(),
    });
  }

  const { userInfo, setUserInfo } = useSessionStore();
  useEffect(() => {
    if (!userInfo) return;
    console.log(today, today.toDateString(), twoYearsLater.toDateString());

    setDuration({
      start: userInfo.braces_start_date || today.toDateString(),
      end: userInfo.braces_end_date || twoYearsLater.toDateString(),
    });
  }, [userInfo]);

  const [isSavingInfo, setIsSavingInfo] = useState(false);

  async function saveInfo() {
    setIsSavingInfo(true);
    const updatedDuration = {
      braces_start_date: new Date(duration.start),
      braces_end_date: new Date(duration.end),
    };
    console.log({
      updatedDuration,

      start: duration.start,
      end: duration.end,
    });

    const { error } = await supabase
      .from("users")
      .update(updatedDuration)
      .eq("id", userInfo?.id);

    if (error) return console.log(error);

    setUserInfo({
      ...userInfo,
      braces_start_date: duration.start,
      braces_end_date: duration.end,
    } as UserInfoType);

    setIsSavingInfo(false);
  }

  const isDurationDifferent =
    duration.start !== userInfo?.braces_start_date ||
    duration.end !== userInfo?.braces_end_date;

  return (
    <View gap-s4>
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
              <Text montBold>
                {duration.start.split(" ").slice(1).join(" ") ||
                  "Select start date"}
              </Text>
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
              <Text montBold>
                {duration.end.split(" ").slice(1).join(" ") ||
                  "Select end date"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {isDurationDifferent && (
        <Button
          label={isSavingInfo ? "" : "Save"}
          size="medium"
          bg-$backgroundNeutralMedium
          color={Colors.$textNeutral}
          onPress={saveInfo}
          disabled={!isDurationDifferent}
          disabledBackgroundColor={Colors.$backgroundNeutral}
        >
          {isSavingInfo && <ActivityIndicator size={"small"} />}
        </Button>
      )}
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

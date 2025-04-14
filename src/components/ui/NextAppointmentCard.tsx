import { Button, Colors, Text, View } from "react-native-ui-lib";

export default function NextAppointmentCard() {
  return (
    <View gap-s4 bg-$backgroundElevated padding-12 style={{ borderRadius: 12 }}>
      <View>
        <Text $textNeutralHeavy montSemiBold font-xl>
          Next Appointment
        </Text>
      </View>

      <View gap-s1>
        <Text $textNeutral montBold font-xl>
          15 April, Tuseday | 12:00 PM
        </Text>
      </View>
    </View>
  );
}

import { Button, Colors, Text, View } from "react-native-ui-lib";

export default function NextAppointmentCard() {
  return (
    <View bg-$backgroundElevated padding-12 style={{ borderRadius: 12 }}>
      <View>
        <Text $textNeutral montSemiBold font-lg>
          Next Appointment
        </Text>
      </View>

      <View gap-s1>
        <Text $textGeneral montBold font-xl >
          15 April, Tuseday | 12:00 PM
        </Text>
      </View>
    </View>
  );
}

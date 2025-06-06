import { useSessionStore } from "@/store/SessionStore";
import { Button, Colors, Text, View } from "react-native-ui-lib";

export default function ClinicCard() {
  const { userInfo } = useSessionStore();
  const clinic_name = userInfo?.clinic_info?.clinic_name;
  const clinic_note = userInfo?.clinic_info?.notes;
  const doctor_name = userInfo?.clinic_info?.doctor_name;

  return (
    <View gap-s2 bg-$backgroundElevated padding-12 style={{ borderRadius: 12 }}>
      <View>
        <Text $textNeutral montSemiBold font-lg>
          {clinic_name}
        </Text>
        {clinic_note && (
          <Text $textNeutral font-sm>
            {clinic_note}
          </Text>
        )}
      </View>

      <View gap-s1>
        <Text $textGeneral montMedium font-md>
          Dr. {doctor_name}
        </Text>

        <View row gap-s2 center style={{ alignSelf: "center" }}>
          <Button
            label="Send Email"
            backgroundColor={Colors.$backgroundElevatedLight}
            color={Colors.$textDefault}
            montReg
            font-md
            style={{ borderRadius: 12 }}
          />
          <Button
            label="Call Doctor"
            backgroundColor={Colors.$backgroundElevatedLight}
            color={Colors.$textDefault}
            montReg
            font-md
            style={{ borderRadius: 12 }}
          />
        </View>
      </View>
    </View>
  );
}

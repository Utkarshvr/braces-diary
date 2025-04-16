import { Text, View } from "react-native-ui-lib";
import BackBtn from "./BackBtn";

export default function ScreenHeader({ label }: { label: string }) {
  return (
    <View row gap-s2 centerV>
      <BackBtn />
      <Text $textNeutral montBold font-xl>
        {label}
      </Text>
    </View>
  );
}

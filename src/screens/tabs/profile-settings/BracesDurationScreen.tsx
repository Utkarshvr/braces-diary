import ScreenHeader from "@/components/common/ScreenHeader";
import BracesDurationForm from "@/components/form/BracesDurationForm";
import { View } from "react-native-ui-lib";

export default function BracesDurationScreen() {
  return (
    <View flex bg-$backgroundDefault padding-16>
      <ScreenHeader label="Braces Duration" />
      <BracesDurationForm />
    </View>
  );
}

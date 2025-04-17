import { KeyboardAwareScrollView, View } from "react-native-ui-lib";
import ScreenHeader from "@/components/common/ScreenHeader";
import ProfileInfoForm from "@/components/form/ProfileInfoForm";

export default function ProfileInfoScreen() {
  return (
    <View flex bg-$backgroundDefault padding-16>
      <ScreenHeader label="Your Profile" />

      {/* Profile Info Form */}
      <KeyboardAwareScrollView>
        <ProfileInfoForm />
      </KeyboardAwareScrollView>
    </View>
  );
}

import { KeyboardAwareScrollView, Text, View } from "react-native-ui-lib";
import ScreenHeader from "@/components/common/ScreenHeader";
import ProfileInfoForm from "@/components/form/ProfileInfoForm";

type Props = { isOnBoarding?: boolean };

export default function ProfileInfoScreen({ isOnBoarding = false }: Props) {
  return (
    <View flex bg-$backgroundDefault padding-16>
      <ScreenHeader label="Your Profile" />
      {isOnBoarding && (
        <Text $textNeutral font-sm>
          Please enter your name and details to complete onboarding.
        </Text>
      )}

      {/* Profile Info Form */}
      <KeyboardAwareScrollView>
        <ProfileInfoForm isOnBoarding={isOnBoarding} />
      </KeyboardAwareScrollView>
    </View>
  );
}

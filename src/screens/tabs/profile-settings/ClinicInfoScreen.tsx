import ScreenHeader from "@/components/common/ScreenHeader";
import ClinicInfoForm from "@/components/form/ClinicInfoForm";
import { View } from "react-native-ui-lib";

export default function ClinicInfoScreen() {
  return (
    <View flex bg-$backgroundDefault padding-16>
      <ScreenHeader label="Clinic Information" />
      <ClinicInfoForm />
    </View>
  );
}

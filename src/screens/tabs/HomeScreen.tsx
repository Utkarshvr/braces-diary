import { Colors, Text, View } from "react-native-ui-lib";
import ClinicCard from "@/components/ui/ClinicCard";
import NextAppointmentCard from "@/components/ui/NextAppointmentCard";
import NavLink from "@/components/ui/NavLink";
import { Ionicons } from "@expo/vector-icons";
import { useSessionStore } from "@/store/SessionStore";

export default function HomeScreen() {
  const { userInfo } = useSessionStore();
  const user_name = userInfo?.name;

  return (
    <View gap-s5 flex bg-$backgroundDefault padding-16>
      {user_name && (
        <Text $textDefault montSemiBold font-2xl>
          Hey {user_name}
        </Text>
      )}

      {/* <ProgressBar/> */}

      {/* NextAppointment Card */}
      <NextAppointmentCard />

      {/* Clinic & Doctor Card */}
      <ClinicCard />

      {/* Braces Timeline */}
      <NavLink
        icon={<Ionicons name="home" color={Colors.$iconDefault} size={18} />}
        label="Braces Timeline"
        // TODO: Change link
        link="/timeline"
      />
    </View>
  );
}

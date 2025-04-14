import { Button, Colors, Text, View } from "react-native-ui-lib";
import { supabase } from "@/lib/supabase";
import ClinicCard from "@/components/ui/ClinicCard";
import NextAppointmentCard from "@/components/ui/NextAppointmentCard";
import NavLink from "@/components/ui/NavLink";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const user_name = "Utkarsh";

  return (
    <View gap-s5 flex bg-$backgroundDefault padding-16>
      <Text $textDefault montSemiBold font-2xl>
        Hey {user_name}
      </Text>

      {/* <ProgressBar/> */}

      {/* NextAppointment Card */}
      <NextAppointmentCard />

      {/* Clinic & Doctor Card */}
      <ClinicCard />

      {/* Braces Timeline */}
      <NavLink
        icon={<Ionicons name="home" color={Colors.$iconDefault} size={18} />}
        label="Braces Timeline"
        link="/timeline"
      />

      {/* <Button onPress={() => supabase.auth.signOut()} label="Signout" /> */}
    </View>
  );
}

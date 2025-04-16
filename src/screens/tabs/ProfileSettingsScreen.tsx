import NavLink from "@/components/ui/NavLink";
import { navLinks } from "@/constants/profile-settings/profile-settings-constants";
import { Text, View } from "react-native-ui-lib";

export default function ProfileSettingsScreen() {
  return (
    <View flex bg-$backgroundDefault padding-16>
      <Text $textNeutral montBold font-xl>
        Settings
      </Text>

      {navLinks.map((link) => (
        <NavLink
          key={link.label}
          label={link.label}
          link={link.link}
          type={link.type}
          icon={link.icon}
        />
      ))}
    </View>
  );
}

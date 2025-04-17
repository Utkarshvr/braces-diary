import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Href } from "expo-router";
import { Colors } from "react-native-ui-lib";

export type NavLinkProp = {
  icon: React.ReactNode;
  label: string;
  link: Href;
  type?: "primary" | "secondary";
};

export const navLinks: NavLinkProp[] = [
  {
    label: "Profile Info",
    link: "/(tabs)/profile-settings/profile-info",
    type: "secondary",
    icon: <Ionicons name="person" color={Colors.$iconNeutral} size={18} />,
  },
  {
    label: "Braces Duration",
    link: "/(tabs)/profile-settings/braces-duration",
    type: "secondary",
    icon: (
      <MaterialCommunityIcons
        name="tooth"
        color={Colors.$iconNeutral}
        size={18}
      />
    ),
  },
  {
    label: "Doctor & Clinic Info",
    link: "/(tabs)/profile-settings/clinic-info",
    type: "secondary",
    icon: (
      <FontAwesome5
        name="clinic-medical"
        color={Colors.$iconNeutral}
        size={16}
      />
    ),
  },
  {
    label: "Notifications",
    link: "/(tabs)/profile-settings/braces-duration",
    type: "secondary",
    icon: (
      <Ionicons name="notifications" color={Colors.$iconNeutral} size={18} />
    ),
  },
];

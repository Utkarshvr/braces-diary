import { NavLinkProp } from "@/constants/profile-settings/profile-settings-constants";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";

export default function NavLink({
  icon,
  label,
  link,
  type = "primary",
}: NavLinkProp) {
  const isSec = type === "secondary";

  return (
    <TouchableOpacity
      gap-s4
      row
      centerV
      bg-$backgroundElevated={isSec ? false : true}
      // {...(!isSec && { "padding-12": true })}
      style={{
        borderRadius: isSec ? 0 : 12,
        padding: isSec ? 0 : 12,
        paddingVertical: 12,
        justifyContent: "space-between",
      }}
      // TODO:
      // onTouchEnd={() => router.push(link)}
    >
      <View gap-s2 row centerV>
        {icon}
        <Text style={{}} $textNeutral montSemiBold font-md>
          {label}
        </Text>
      </View>
      <Ionicons
        name="caret-forward-outline"
        color={Colors.$iconNeutral}
        size={20}
      />
    </TouchableOpacity>
  );
}

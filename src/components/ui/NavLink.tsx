import { Ionicons } from "@expo/vector-icons";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";

export default function NavLink({
  icon,
  label,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  link: "/timeline";
}) {
  return (
    <TouchableOpacity
      gap-s4
      row
      centerV
      bg-$backgroundElevated
      padding-12
      style={{ borderRadius: 12, justifyContent: "space-between" }}
      // TODO:
      // onTouchEnd={() => router.push(link)}
    >
      <View gap-s1 row centerV>
        {icon}
        <Text style={{}} $textNeutral montSemiBold font-md>
          {label}
        </Text>
      </View>
      <Ionicons
        name="caret-forward-outline"
        color={Colors.$iconDefault}
        size={20}
      />
    </TouchableOpacity>
  );
}

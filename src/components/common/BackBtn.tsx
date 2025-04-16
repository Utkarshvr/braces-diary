import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors, TouchableOpacity } from "react-native-ui-lib";

export default function BackBtn() {
  if (router.canGoBack())
    return (
      <TouchableOpacity
        // bg-$backgroundNeutralLight
        onPress={() => router.back()}
        center
        style={{ borderRadius: 999 }}
        padding-8
      >
        <Ionicons name="arrow-back" color={Colors.$iconNeutral} size={18} />
      </TouchableOpacity>
    );
}

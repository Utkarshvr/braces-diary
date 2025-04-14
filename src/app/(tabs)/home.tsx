import { Button, Text, View } from "react-native-ui-lib";
import { supabase } from "@/lib/supabase";

export default function index() {
  return (
    <View gap-s5 flex bg-$backgroundDefault>
      <Text $textDefault>index</Text>

      <Button onPress={() => supabase.auth.signOut()} label="Signout" />
    </View>
  );
}

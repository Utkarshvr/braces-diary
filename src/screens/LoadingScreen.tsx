import { Colors, LoaderScreen, View } from "react-native-ui-lib";

export default function LoadingScreen() {
  return (
    <View gap-s5 centerV flex bg-$backgroundDefault>
      <LoaderScreen
        messageStyle={{ color: Colors.$textNeutral }}
        message={"Message goes here"}
        color={Colors.$textNeutral}
      />
    </View>
  );
}

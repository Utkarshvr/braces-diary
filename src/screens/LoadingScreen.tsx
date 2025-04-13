import { Colors, LoaderScreen, View } from "react-native-ui-lib";

export default function LoadingScreen({ message }: { message?: string }) {
  return (
    <View gap-s5 centerV flex bg-$backgroundDefault>
      <LoaderScreen
        messageStyle={{ color: Colors.$textNeutral }}
        message={message}
        color={Colors.$textNeutral}
      />
    </View>
  );
}

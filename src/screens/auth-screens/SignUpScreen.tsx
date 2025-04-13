import { useRef, useState } from "react";
import {
  View,
  Text,
  TextField,
  Button,
  Assets,
  TextFieldRef,
} from "react-native-ui-lib";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const googleIcon = Assets.getAssetByPath("icons.google");

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Refs to TextFields
  const emailRef = useRef<TextFieldRef>(null);
  const passwordRef = useRef<TextFieldRef>(null);

  // Animation

  const shakeX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));
  const triggerShake = () => {
    shakeX.value = withSequence(
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(-6, { duration: 50 }),
      withTiming(6, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  const handleSignup = () => {
    const isEmailValid = emailRef.current?.validate();
    const isPasswordValid = passwordRef.current?.validate();

    if (!isEmailValid || !isPasswordValid) {
      triggerShake();
      return;
    }

    console.log("Signup with:", { email, password });
    // Proceed with signup
  };

  return (
    <View flex padding-16 bg-$backgroundDefault gap-s5>
      <Text montBold font-2xl $textDefault>
        Signup
      </Text>

      <View gap-s2>
        <Animated.View style={animatedStyle}>
          <TextField
            ref={emailRef}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            enableErrors
            validate={["required", "email"]}
            validationMessage={["Email is required", "Invalid email"]}
            floatingPlaceholder
            fieldStyle={{ borderBottomWidth: 1, borderColor: "#ccc" }}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        </Animated.View>
        <Animated.View style={animatedStyle}>
          <TextField
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            enableErrors
            validate={[
              "required",
              (value) => (value ? value.length >= 6 : false),
            ]}
            validationMessage={[
              "Password is required",
              "Min 6 characters required",
            ]}
            floatingPlaceholder
            fieldStyle={{ borderBottomWidth: 1, borderColor: "#ccc" }}
            returnKeyType="done"
            onSubmitEditing={handleSignup}
          />
        </Animated.View>

        <Button
          label="Signup"
          bg-blue50
          montBold
          white
          onPress={handleSignup}
        />
      </View>

      <Button
        label="Login with Google"
        bg-white
        black
        style={{ marginTop: 20 }}
        iconSource={googleIcon}
        iconStyle={{ width: 24, height: 24 }}
        onPress={() => console.log("Login with Google")}
      />
    </View>
  );
}

import { Eye, EyeOff } from "lucide-react-native"; // Or use any icon library you prefer
import { useRef, useState } from "react";
import {
  View,
  Text,
  TextField,
  Button,
  Assets,
  TextFieldRef,
  TouchableOpacity,
} from "react-native-ui-lib";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  SharedValue,
} from "react-native-reanimated";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { Alert } from "react-native";

const googleIcon = Assets.getAssetByPath("icons.google");

export default function SignInScreen() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password Visibility Toggle
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  // Refs to TextFields
  const emailRef = useRef<TextFieldRef>(null);
  const passwordRef = useRef<TextFieldRef>(null);

  // Animation
  const emailShake = useSharedValue(0);
  const passwordShake = useSharedValue(0);

  const shakeAnim = (sharedVal: SharedValue<number>) => {
    sharedVal.value = withSequence(
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(-6, { duration: 50 }),
      withTiming(6, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  const emailStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: emailShake.value }],
  }));

  const passwordStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: passwordShake.value }],
  }));

  const handleSignin = () => {
    const isEmailValid = emailRef.current?.validate();
    const isPasswordValid = passwordRef.current?.validate();

    if (!isEmailValid) shakeAnim(emailShake);
    if (!isPasswordValid) shakeAnim(passwordShake);

    if (isEmailValid && isPasswordValid) {
      // Sign In Process
      signInWithEmail();
    }
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View flex padding-16 bg-$backgroundDefault gap-s5>
      {/* TODO: Replace with app_name & logo*/}
      <Text montBold font-2xl $textDefault>
        Logo | AppName
      </Text>

      <View>
        <View gap-s2>
          <Animated.View style={emailStyle}>
            <TextField
              disabled={loading}
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
          <Animated.View style={passwordStyle}>
            <TextField
              disabled={loading}
              ref={passwordRef}
              placeholder="Password"
              secureTextEntry={!showPassword}
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
              onSubmitEditing={handleSignin}
              trailingAccessory={
                <View paddingH-8 centerV onTouchEnd={togglePassword}>
                  {showPassword ? (
                    <EyeOff size={18} color="#999" />
                  ) : (
                    <Eye size={18} color="#999" />
                  )}
                </View>
              }
            />
          </Animated.View>

          <Button
            disabled={loading}
            label="Login"
            bg-blue50
            montBold
            white
            onPress={handleSignin}
          />
        </View>

        <View row center marginT-8>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => router.navigate("/(auth-screens)/signup")}
          >
            <Text blue50 montBold>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button
        label="Continue with Google"
        bg-white
        black
        style={{ marginTop: 20 }}
        iconSource={googleIcon}
        iconStyle={{ width: 24, height: 24 }}
        onPress={() => console.log("Login with Google")}
        disabled={loading}
      />
    </View>
  );
}

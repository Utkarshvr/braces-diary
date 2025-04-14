import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Initialize theme
import "@/config/theme/initTheme";
import { useFonts } from "@expo-google-fonts/montserrat";
import fonts from "@/config/theme/fonts";
import { Slot } from "expo-router";
import AuthHandler from "@/components/handlers/AuthHandler";

SplashScreen.preventAutoHideAsync();

export default function _layout() {
  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <>
      <Slot />
      <AuthHandler />
    </>
  );
}

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import LoadingScreen from "@/screens/LoadingScreen";

// Initialize theme
import "@/config/theme/initTheme";
import RootLayout from "@/components/layout/RootLayout";
import { useFonts } from "@expo-google-fonts/montserrat";
import fonts from "@/config/theme/fonts";

SplashScreen.preventAutoHideAsync();

export default function _layout() {
  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return <LoadingScreen />;

  return <RootLayout />;
}

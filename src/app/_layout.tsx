import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import LoadingScreen from "@/screens/LoadingScreen";

// Initialize theme
import "@/config/theme/initTheme";
import RootLayout from "@/components/layout/RootLayout";
import { useFonts } from "@expo-google-fonts/montserrat";
import fonts from "@/config/theme/fonts";

import { useSessionStore } from "@/store/SessionStore";
import { supabase } from "@/lib/supabase";
import { Redirect, router, Slot, useSegments } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function _layout() {
  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Supabase Login
  const segments = useSegments();

  const { isInitializing, getSession, session, setSession, setIsInitializing } =
    useSessionStore();

  useEffect(() => {
    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("auth state changed: ", session);
      setSession(session);
      setIsInitializing(false);
    });
  }, []);

  console.log(session, isInitializing);

  useEffect(() => {
    if (isInitializing) return;

    const inTabsGroup = segments[0] === "(tabs)";
    if (session && !inTabsGroup) router.replace("/(tabs)");
    else if (!session) router.replace("/(auth-screens)/signin");
  }, [session, isInitializing]);

  // if (isInitializing || !fontsLoaded) return <LoadingScreen />;

  // if (session) <Redirect href={"/(tabs)"} />;

  return <Slot />;
}

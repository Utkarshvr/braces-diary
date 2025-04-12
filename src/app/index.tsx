import LoadingScreen from "@/screens/LoadingScreen";
import { useEffect } from "react";
import { useSessionStore } from "@/store/SessionStore";
import { supabase } from "@/lib/supabase";
import { Redirect, router, useSegments } from "expo-router";

export default function Index() {
  // Supabase Login
  const segments = useSegments();

  const { isInitializing, getSession, session, setSession, setIsInitializing } =
    useSessionStore();

  useEffect(() => {
    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("isInit -> FALSE!");
      setIsInitializing(false);
    });
  }, []);

  console.log(session?.expires_in, isInitializing);

  useEffect(() => {
    if (isInitializing) return;

    const inAuthGroup = segments[0] === "(auth-screens)";
    if (session && inAuthGroup) router.replace("/(tabs)");
    else if (!session) router.replace("/(auth-screens)/signin");
  }, [session, isInitializing]);

  if (isInitializing) return <LoadingScreen />;

  if (session) <Redirect href={"/(tabs)"} />;

  return null;
}

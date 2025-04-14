import { useSessionStore } from "@/store/SessionStore";
import { supabase } from "@/lib/supabase";
import { router, useSegments } from "expo-router";
import { useEffect } from "react";

export default function AuthHandler() {
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

  // console.log(session, isInitializing);

  useEffect(() => {
    if (isInitializing) return;

    const inTabsGroup = segments[0] === "(tabs)";
    if (session && !inTabsGroup) router.replace("/(tabs)");
    else if (!session) router.replace("/(auth-screens)/signin");
  }, [session, isInitializing]);

  return null;
}

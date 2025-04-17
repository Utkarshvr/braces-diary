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
      // console.log("auth state changed: ", session);
      setSession(session);
      setIsInitializing(false);
    });
  }, []);

  // console.log(session, isInitializing);

  useEffect(() => {
    if (isInitializing) return;

    if (!session) router.replace("/(auth-screens)/signin");

    if (session) {
      // Get current user info from "users" table
      (async () => {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();
        // If user info is present
        if (data) {
          // Check whether it has "name"
          if (data.name) {
            // Let it go, all good
            const inTabsGroup = segments[0] === "(tabs)";
            if (session && !inTabsGroup) router.replace("/(tabs)/home");
          } else {
            // Send it to add a name
            router.replace("/(auth)/profile-info");
          }
        } else {
          // Send it to add a name
          router.replace("/(auth)/profile-info");
        }
      })();
    }
  }, [session, isInitializing]);

  return null;
}

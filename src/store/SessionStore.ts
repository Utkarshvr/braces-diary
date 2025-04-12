import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface SessionState {
  session: Session | null;
  setSession: (session: Session | null) => void;

  isInitializing: boolean;
  setIsInitializing: (condition: boolean) => void;

  getSession: () => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  session: null,
  setSession: (session) => set(() => ({ session })),

  isInitializing: true,
  setIsInitializing: (condition: boolean) =>
    set((state) => ({ isInitializing: condition })),

  getSession: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session });
    });
  },
}));

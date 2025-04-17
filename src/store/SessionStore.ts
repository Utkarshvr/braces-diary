import { supabase } from "@/lib/supabase";
import { UserInfoType } from "@/types/supabase-table-types";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface SessionState {
  session: Session | null;
  setSession: (session: Session | null) => void;

  isInitializing: boolean;
  setIsInitializing: (condition: boolean) => void;

  getSession: () => void;

  userInfo: UserInfoType | null;
  setUserInfo: (userInfo: UserInfoType) => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  session: null,

  setSession: (session) => set(() => ({ session })),

  isInitializing: true,
  setIsInitializing: (condition: boolean) =>
    set((state) => ({ isInitializing: condition })),

  getSession: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session });

    if (session?.user) {
      const { data: clinic_info_data } = await supabase
        .from("clinic-info")
        .select("*")
        .eq("user_id", session?.user.id)
        .single();

      if (clinic_info_data) {
        set((state) => {
          console.log({
            clinic_info_data,
            NEW_USER_INFO: {
              ...state.userInfo,
              clinic_info: clinic_info_data,
            },
          });
          return {
            userInfo: {
              ...state.userInfo,
              clinic_info: clinic_info_data,
            } as UserInfoType,
          };
        });
      }
    }
  },

  userInfo: null,
  setUserInfo: (userInfo: UserInfoType) => set((state) => ({ userInfo })),
}));

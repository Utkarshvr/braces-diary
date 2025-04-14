import { ColorSchemeName } from "react-native";
import { create } from "zustand";

interface AppearanceSchemeState {
  colorScheme: ColorSchemeName;
  setColorScheme: (colorScheme: ColorSchemeName) => void;
}

export const useAppearanceSchemeStore = create<AppearanceSchemeState>()(
  (set) => ({
    colorScheme: null,
    setColorScheme: (colorScheme: ColorSchemeName) =>
      set(() => ({ colorScheme })),
  })
);

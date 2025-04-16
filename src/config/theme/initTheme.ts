import { Assets, Colors, ThemeManager, Typography } from "react-native-ui-lib";
Colors.setScheme("default");

Typography.loadTypographies({
  // FONT FAMILY
  montThin: { fontFamily: "montThin" },
  montExtraLight: { fontFamily: "montExtraLight" },
  montLight: { fontFamily: "montLight" },
  montReg: { fontFamily: "montRegular" },
  montMedium: { fontFamily: "montMedium" },
  montSemiBold: { fontFamily: "montSemiBold" },
  montBold: { fontFamily: "montBold" },
  montExtraBold: { fontFamily: "montExtraBold" },
  montBlack: { fontFamily: "montBlack" },

  // FONT SIZES
  "font-xs": { fontSize: 10 },
  "font-sm": { fontSize: 12 },
  "font-md": { fontSize: 14 },
  "font-base": { fontSize: 16 },
  "font-lg": { fontSize: 18 },
  "font-xl": { fontSize: 20 },
  "font-2xl": { fontSize: 24 },
  "font-3xl": { fontSize: 30 },
  "font-4xl": { fontSize: 36 },
  "font-5xl": { fontSize: 48 },
});

ThemeManager.setComponentTheme("Text", {
  montReg: true,
  $textDefault: true,
});

ThemeManager.setComponentTheme("Button", {
  montBold: true,
});

ThemeManager.setComponentTheme("Textfield", {
  montReg: true,
});

// ICONS
Assets.loadAssetsGroup("icons", {
  google: require("../../assets/icons/google.png"),
});

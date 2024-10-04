import { useMemo, type PropsWithChildren } from "react";
import {
  PaperProvider,
  Text,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { useGlobalContext } from "./GlobalProvider";
import { useColorScheme } from "react-native";

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { appTheme } = useGlobalContext();
  const colorScheme = useColorScheme();
  const theme = useMemo(() => {
    if (appTheme === "dark") return MD3DarkTheme;
    if (appTheme === "light") return MD3LightTheme;
    if (appTheme === "system") {
      return colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
    }
    return MD3DarkTheme;
  }, [appTheme]);

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}

import { GlobalProvider } from "@/contexts/GlobalProvider";
import { Stack } from "expo-router";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <PaperProvider theme={MD3DarkTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </GlobalProvider>
  );
}

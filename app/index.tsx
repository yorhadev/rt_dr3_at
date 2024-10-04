import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Surface, useTheme, Text } from "react-native-paper";
import { Redirect, router } from "expo-router";
import MyButton from "@/components/MyButton";
import { useGlobalContext } from "@/contexts/GlobalProvider";

export default function App() {
  const theme = useTheme();
  const minHeight = Dimensions.get("window").height;
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      minHeight: minHeight,
    },
    title: {
      fontWeight: 900,
      textAlign: "center",
    },
    subtitle: {
      paddingHorizontal: 32,
      textAlign: "center",
    },
    accent: {
      color: theme.colors.primary,
      fontWeight: 900,
    },
  });

  const { isLoggedIn } = useGlobalContext();

  if (isLoggedIn) return <Redirect href="/(tabs)/home" />;

  return (
    <SafeAreaView>
      <ScrollView>
        <Surface style={styles.container}>
          <Text style={styles.title} variant="displayMedium">
            Discover Endless Possibilities with{" "}
            <Text style={styles.accent}>Moviefy</Text>
          </Text>
          <Text style={styles.subtitle}>
            Embark on a journey of limitless exploration with Moviefy
          </Text>
          <MyButton mode="contained" onPress={() => router.push("/sign-in")}>
            Continue with Email
          </MyButton>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

import { router } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const theme = useTheme();
  const minHeight = Dimensions.get("window").height;
  const styles = StyleSheet.create({
    safeAreaView: {
      backgroundColor: theme.colors.background,
      minHeight: minHeight,
    },
    scrollView: {
      height: "100%",
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
      minHeight: minHeight,
      gap: 32,
    },
    title: {
      color: theme.colors.onBackground,
      fontSize: 48,
      fontWeight: 900,
      textAlign: "center",
    },
    subtitle: {
      color: theme.colors.onBackground,
      textAlign: "center",
      paddingHorizontal: 32,
    },
    accent: {
      color: theme.colors.primary,
    },
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Discover Endless Possibilities with{" "}
            <Text style={styles.accent}>Moviefy</Text>
          </Text>
          <Text style={styles.subtitle}>
            Embark on a journey of limitless exploration with Moviefy
          </Text>
          <Button mode="contained" onPress={() => router.push("/sign-in")}>
            Continue with Email
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

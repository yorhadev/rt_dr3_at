import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Dimensions, StyleSheet, View, Alert } from "react-native";
import { Text, Surface, useTheme } from "react-native-paper";
import { useState } from "react";
import MyTextInput from "@/components/MyTextInput";
import MyDivider from "@/components/MyDivider";
import MyButton from "@/components/MyButton";
import { Link, router } from "expo-router";
import firebaseService from "@/services/firebase";

export default function SignUp() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  async function handleSubmit() {
    setLoading(true);
    const response = await firebaseService.createUser(name, email, password);
    setLoading(false);
    if (response.status !== 200) {
      Alert.alert(response.message);
    } else {
      router.replace("/(tabs)/home");
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Surface style={styles.container}>
          <Text style={styles.title} variant="titleMedium">
            Sign up to Moviefy
          </Text>
          <MyDivider style={styles.divider} />
          <View style={styles.form}>
            <MyTextInput
              mode="outlined"
              label="Name"
              value={name}
              disabled={loading}
              onChangeText={(text) => setName(text)}
            />
            <MyTextInput
              mode="outlined"
              label="Email"
              value={email}
              disabled={loading}
              onChangeText={(text) => setEmail(text)}
            />
            <MyTextInput
              mode="outlined"
              label="Password"
              value={password}
              disabled={loading}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <MyButton
              mode="contained"
              style={styles.formButton}
              disabled={loading}
              onPress={handleSubmit}
            >
              Sign Up
            </MyButton>
            <Text style={styles.formRedirect}>
              Already have an account?{" "}
              <Link
                href="/(auth)/sign-in"
                style={{ color: theme.colors.primary }}
              >
                Sign in
              </Link>
            </Text>
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

const minHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    minHeight: minHeight,
    padding: 16,
  },
  title: {
    fontWeight: 700,
  },
  divider: {
    marginVertical: 32,
  },
  form: {
    gap: 16,
  },
  formButton: {
    marginTop: 16,
  },
  formRedirect: {
    textAlign: "center",
  },
});

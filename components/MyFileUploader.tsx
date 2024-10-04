import { StyleSheet, TouchableOpacity } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MyFileUploader({ onPress }: any) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Surface style={styles.surface} elevation={2}>
        <Text style={styles.text}>
          <FontAwesome name="upload" size={24} color={theme.colors.onSurface} />
          {"  "}
          Choose a file
        </Text>
      </Surface>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 32,
    borderRadius: 4,
  },
  text: {
    textAlign: "center",
  },
});

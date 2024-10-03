import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    surface: {
      backgroundColor: theme.colors.surface,
    },
    onSurface: {
      color: theme.colors.onSurface,
    },
  });

  return (
    <View style={styles.surface}>
      <Text style={styles.onSurface}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}

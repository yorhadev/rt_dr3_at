import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTheme } from "react-native-paper";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

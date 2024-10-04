import { Image, StyleSheet } from "react-native";

interface MyImagePreviewProps {
  uri: string;
}

export default function MyImagePreview({ uri }: MyImagePreviewProps) {
  return (
    <Image
      style={styles.previewContainer}
      source={{ uri }}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    borderRadius: 4,
    minHeight: 250,
  },
});

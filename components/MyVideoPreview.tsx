import { Video, ResizeMode } from "expo-av";
import { StyleSheet } from "react-native";

interface MyVideoPreviewProps {
  uri: string;
}

export default function MyVideoPreview({ uri }: MyVideoPreviewProps) {
  return (
    <Video
      style={styles.previewContainer}
      source={{ uri }}
      resizeMode={ResizeMode.COVER}
    />
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    borderRadius: 4,
    minHeight: 250,
  },
});

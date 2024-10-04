import MyButton from "@/components/MyButton";
import MyFileUploader from "@/components/MyFileUploader";
import MyTextInput from "@/components/MyTextInput";
import firebaseService from "@/services/firebase";
import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Alert } from "react-native";
import { Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import MyVideoPreview from "@/components/MyVideoPreview";
import MyImagePreview from "@/components/MyImagePreview";
import { createTables, insertData } from "@/services/database";

export default function Create() {
  const [title, setTitle] = useState("");

  const [video, setVideo] = useState<any>(null);

  const [thumbnail, setThumbnail] = useState<any>(null);

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const currentUser = firebaseService.auth.currentUser;

  async function openPicker(fileType: string) {
    if (fileType !== "image" && fileType !== "video") return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        fileType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) return;
    if (fileType === "image") setThumbnail(result.assets?.[0] || null);
    if (fileType === "video") setVideo(result.assets?.[0] || null);
  }

  async function createBlob(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }

  async function onSubmit() {
    if (!title || !video || !thumbnail || !description) {
      return Alert.alert("Please fill in all the fields");
    }
    setLoading(true);
    const thumbnailBlob = await createBlob(thumbnail.uri);
    const videoBlob = await createBlob(video.uri);
    const [thumbnailResponse, videoResponse] = await Promise.all([
      firebaseService.uploadFile(thumbnail.fileName, "images", thumbnailBlob),
      firebaseService.uploadFile(video.fileName, "videos", videoBlob),
    ]);
    if (thumbnailResponse.status === 200 && videoResponse.status === 200) {
      const data = {
        title: title,
        thumbnail: thumbnailResponse.data,
        video: videoResponse.data,
        description: description,
        author: currentUser?.displayName,
        createdAt: String(new Date().getTime()),
      };
      const response = await insertData("posts", data);
      if (response.status !== 200) Alert.alert(response.message);
    }
    setTitle("");
    setVideo(null);
    setThumbnail(null);
    setDescription("");
    setLoading(false);
  }

  useEffect(() => {
    const initDatabase = async () => {
      await createTables();
    };
    initDatabase();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <Surface style={styles.container}>
          <View style={styles.form}>
            <View style={styles.formInput}>
              <Text style={styles.fontBold} variant="bodyLarge">
                Video Title
              </Text>
              <MyTextInput
                mode="outlined"
                label="Title"
                placeholder="Give your video a title..."
                value={title}
                disabled={loading}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.fontBold} variant="bodyLarge">
                Upload Video
              </Text>
              {video ? (
                <MyVideoPreview uri={video.uri} />
              ) : (
                <MyFileUploader onPress={() => openPicker("video")} />
              )}
            </View>
            <View style={styles.formInput}>
              <Text style={styles.fontBold} variant="bodyLarge">
                Thumbnail Image
              </Text>
              {thumbnail ? (
                <MyImagePreview uri={thumbnail.uri} />
              ) : (
                <MyFileUploader onPress={() => openPicker("image")} />
              )}
            </View>
            <View style={styles.formInput}>
              <Text style={styles.fontBold} variant="bodyLarge">
                Video Description
              </Text>
              <MyTextInput
                mode="outlined"
                label="Description"
                placeholder="Give your video a description..."
                value={description}
                disabled={loading}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <MyButton
              style={styles.formButton}
              mode="contained"
              disabled={loading}
              onPress={onSubmit}
            >
              Submit & Publish
            </MyButton>
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

const minHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    minHeight: minHeight,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  form: {
    gap: 32,
  },
  formInput: {
    gap: 4,
  },
  formButton: {
    marginTop: 16,
  },
  fontBold: {
    fontWeight: 700,
  },
});

import MyAvatarIcon from "@/components/MyAvatarIcon";
import MyAvatarImage from "@/components/MyAvatarImage";
import MyDivider from "@/components/MyDivider";
import firebaseService from "@/services/firebase";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import MyTextInput from "@/components/MyTextInput";
import MyButton from "@/components/MyButton";
import MySegmentedButtons from "@/components/MySegmentedButtons";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { router } from "expo-router";

export default function Profile() {
  const currentUser = firebaseService.auth.currentUser;

  const { appTheme, setAppTheme } = useGlobalContext();

  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL);

  const [displayName, setDisplayName] = useState(currentUser?.displayName);

  const [loading, setLoading] = useState(false);

  async function openPicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) return;
    setPhotoURL(result.assets?.[0].uri);
  }

  async function createBlob(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }

  async function updateProfile() {
    setLoading(true);
    const photoURLBlob = await createBlob(photoURL || "");
    const { data: photoURI } = await firebaseService.uploadFile(
      `${displayName}-${new Date().getTime()}`,
      "profiles",
      photoURLBlob
    );
    const response = await firebaseService.updateUserProfile(
      currentUser,
      displayName,
      photoURI
    );
    if (response.status !== 200) {
      Alert.alert("Error", response.message);
    }
    setLoading(false);
  }

  async function handleSignOut() {
    await firebaseService.signOut();
    router.push("/");
  }

  return (
    <SafeAreaView>
      <Surface style={styles.container}>
        <View>
          <Text variant="headlineLarge" style={styles.textBold}>
            Profile {appTheme}
          </Text>
          <MyDivider style={{ marginVertical: 16 }} />
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={openPicker} disabled={loading}>
              {photoURL ? (
                <MyAvatarImage source={{ uri: photoURL || "" }} size={250} />
              ) : (
                <MyAvatarIcon icon="plus" size={250} />
              )}
            </TouchableOpacity>
          </View>
          <MyTextInput
            style={styles.marginTop}
            mode="outlined"
            label="Name"
            value={displayName || ""}
            disabled={loading}
            onChangeText={(text) => setDisplayName(text)}
          />
          <MyButton
            style={styles.marginTop}
            mode="contained"
            disabled={loading}
            onPress={updateProfile}
          >
            Update
          </MyButton>
        </View>
        <View>
          <Text variant="headlineLarge" style={styles.textBold}>
            Settings
          </Text>
          <MyDivider style={{ marginVertical: 16 }} />
          <View style={styles.settingsConteiner}>
            <View>
              <Text variant="bodyLarge" style={{ marginBottom: 16 }}>
                Theme
              </Text>
              <MySegmentedButtons
                value={appTheme}
                onValueChange={setAppTheme}
                buttons={[
                  {
                    value: "system",
                    label: "System",
                  },
                  {
                    value: "light",
                    label: "Light",
                  },
                  {
                    value: "dark",
                    label: "Dark",
                  },
                ]}
              />
            </View>
            <MyButton onPress={handleSignOut}>Sign Out</MyButton>
          </View>
        </View>
      </Surface>
    </SafeAreaView>
  );
}

const minHeight = Dimensions.get("window").height * 0.9;

const styles = StyleSheet.create({
  container: {
    minHeight: minHeight,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 32,
  },
  textBold: {
    fontWeight: 700,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  settingsConteiner: {
    gap: 32,
  },
  marginTop: {
    marginTop: 32,
  },
  avatarPlusIcon: {},
});

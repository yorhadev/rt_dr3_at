import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Surface, Text, useTheme } from "react-native-paper";
import firebaseService from "@/services/firebase";
import MyTextInput from "@/components/MyTextInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MyButton from "@/components/MyButton";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const currentUser = firebaseService.auth.currentUser;

  async function onRefresh() {
    setRefreshing(true);
    //TODO: refresh
    setRefreshing(false);
  }

  return (
    <SafeAreaView>
      <Surface style={styles.container}>
        <FlatList
          data={[{ id: "1" }, { id: "2" }]}
          // data={[]}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => <Text>{item?.id}</Text>}
          ListHeaderComponent={
            <View>
              <Text variant="bodyLarge">Welcome Back</Text>
              <Text variant="headlineLarge" style={styles.userName}>
                {currentUser?.displayName || "displayName"}
              </Text>
              <MyTextInput
                style={styles.searchInput}
                mode="outlined"
                label="Search"
                placeholder="Search for a video topic"
              />
              <Text variant="bodyLarge">Latest Videos</Text>
              <FlatList
                style={styles.latestList}
                data={[{ id: "1" }, { id: "2" }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text>{item.id}</Text>}
                horizontal
              ></FlatList>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyComponentContainer}>
              <Text
                style={[styles.textCenter, styles.textBold]}
                variant="headlineSmall"
              >
                <FontAwesome
                  name="play-circle"
                  size={24}
                  color={theme.colors.onBackground}
                />{" "}
                No Videos Found
              </Text>
              <Text style={styles.textCenter} variant="bodyLarge">
                Be the first one to upload a video
              </Text>
              <MyButton style={styles.createButton} mode="contained">
                Create video
              </MyButton>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Surface>
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
  userName: {
    fontWeight: 700,
  },
  searchInput: {
    marginTop: 16,
    marginBottom: 32,
  },
  latestList: {
    marginBottom: 32,
  },
  emptyComponentContainer: {
    gap: 4,
  },
  textCenter: {
    textAlign: "center",
  },
  textBold: {
    fontWeight: 700,
  },
  createButton: {
    marginTop: 16,
  },
});

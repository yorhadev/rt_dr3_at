import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Surface, Text, useTheme } from "react-native-paper";
import firebaseService from "@/services/firebase";
import MyTextInput from "@/components/MyTextInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MyButton from "@/components/MyButton";
import { createTables, selectData } from "@/services/database";
import MyVideoCard from "@/components/MyVideoCard";
import MyLatestList from "@/components/MyLatestList";
import { router } from "expo-router";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState<any>([]);

  const theme = useTheme();

  const currentUser = firebaseService.auth.currentUser;

  async function onRefresh() {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }

  async function fetchData() {
    const response = await selectData("posts");
    if (response.status === 200) setData(response.data);
  }

  useEffect(() => {
    const initDatabase = async () => {
      await createTables();
    };
    initDatabase();
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <Surface style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item?.uid}
          renderItem={({ item }) => (
            <MyVideoCard
              title={item.title}
              thumbnail={item.thumbnail}
              video={item.video}
              description={item.description}
              author={item.author}
            />
          )}
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
              <MyLatestList posts={data} />
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
              <MyButton
                style={styles.createButton}
                mode="contained"
                onPress={() => router.push("/(tabs)/create")}
              >
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

const minHeight = Dimensions.get("window").height * 0.9;

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

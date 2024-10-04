import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Surface, Text, TextInput, useTheme } from "react-native-paper";
import MyTextInput from "@/components/MyTextInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MyButton from "@/components/MyButton";
import { createTables, selectDataByTitle } from "@/services/database";
import MyVideoCard from "@/components/MyVideoCard";

import { router, useLocalSearchParams, usePathname } from "expo-router";

export default function Search() {
  const { query } = useLocalSearchParams();

  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState<any>([]);

  const [queryInput, setQueryInput] = useState(
    Array.isArray(query) ? "" : query
  );

  const pathname = usePathname();

  const theme = useTheme();

  async function onRefresh() {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }

  async function fetchData() {
    const response = await selectDataByTitle("posts", queryInput);
    if (response.status === 200) setData(response.data);
  }

  async function handleOnPress() {
    if (!queryInput) {
      return Alert.alert(
        "Missing query",
        "Please input something to search results across database"
      );
    }
    if (pathname.startsWith("/search")) {
      router.setParams({ query: queryInput });
    } else {
      router.push(`/search/${queryInput}`);
    }
    await fetchData();
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
              <Text variant="bodyLarge">Search Results</Text>
              <Text variant="headlineLarge" style={styles.userName}>
                {query}
              </Text>
              <MyTextInput
                style={styles.searchInput}
                mode="outlined"
                label="Search"
                placeholder="Search for a video topic"
                value={queryInput}
                onChangeText={(text) => setQueryInput(text)}
                right={
                  <TextInput.Icon icon="magnify" onPress={handleOnPress} />
                }
              />
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

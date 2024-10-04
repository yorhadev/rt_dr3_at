import { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Avatar, Card, Surface, Text } from "react-native-paper";
import { Video, ResizeMode } from "expo-av";

const PlayIcon = (props: any) => <Avatar.Icon {...props} icon="play" />;

export default function MyLatestList({ posts = [] }: any) {
  const latests = posts.slice(0, 3);

  return (
    <FlatList
      style={{ marginBottom: 32 }}
      data={latests}
      keyExtractor={(item) => item.uid}
      renderItem={({ item }) => <MyItem item={item} />}
      horizontal
    ></FlatList>
  );
}

function MyItem({ item }: any) {
  const [play, setPlay] = useState(false);

  return (
    <View>
      {!play && (
        <TouchableOpacity
          style={{ margin: 16, position: "relative" }}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={{ width: 250, height: 250 }}
          />
          <View style={styles.playIcon}>
            <PlayIcon />
          </View>
        </TouchableOpacity>
      )}
      {play && (
        <Video
          style={{
            width: 250,
            height: 250,
            margin: 16,
            backgroundColor: "black",
          }}
          source={{ uri: item.video }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  playIcon: {
    opacity: 0.7,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

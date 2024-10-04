import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { Video, ResizeMode } from "expo-av";
import MyButton from "./MyButton";

interface MyVideoCardProps {
  title: string;
  thumbnail: string;
  video: string;
  description: string;
  author: string;
}

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="video" />;
const PlayIcon = (props: any) => <Avatar.Icon {...props} icon="play" />;

export default function MyVideoCard({
  title,
  thumbnail,
  video,
  description,
  author,
}: MyVideoCardProps) {
  const [play, setPlay] = useState(false);

  return (
    <Card style={styles.card} mode="contained">
      <Card.Title title={title} subtitle={author} left={LeftContent} />
      {!play && (
        <TouchableOpacity
          style={styles.cardContent}
          onPress={(e) => setPlay(true)}
        >
          <Card.Content>
            <Card.Cover source={{ uri: thumbnail }} />
          </Card.Content>
          <View style={styles.playIcon}>
            <PlayIcon />
          </View>
        </TouchableOpacity>
      )}
      {play && (
        <Card.Content>
          <Video
            style={{
              height: 250,
              backgroundColor: "black",
            }}
            source={{ uri: video }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status: any) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        </Card.Content>
      )}
      <Card.Actions style={styles.cardActions}>
        <MyButton>Edit</MyButton>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
  },
  cardContent: {
    position: "relative",
  },
  cardActions: {
    marginVertical: 8,
  },
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
  fontBold: {
    fontWeight: 700,
  },
});

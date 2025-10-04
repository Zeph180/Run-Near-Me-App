import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import ActionButton, { Action } from "@/components/ActionButton";
import { AppText, colorMap } from "@/components/AppText";
import { AuthContext } from "@/utils/authContext";
import { useApiMutation } from "@/hooks/useApi";
import { postService } from "@/Services/api/PostService";
import { RequestReact } from "@/types/Requests/Post/PostRequests";

type PostContentProps = {
  author: string;
  profileImage: any;
  postImage?: any;
  timestamp: string;
  location?: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  postId: string;
};

const PostContent: React.FC<PostContentProps> = ({
  author,
  profileImage,
  postImage,
  timestamp,
  location,
  content,
  likesCount,
  commentsCount,
  postId,
}) => {
  const { account } = useContext(AuthContext);
  const { mutate: react } = useApiMutation((data) => postService.react(data));
  const [likes, setLikes] = React.useState<number>(likesCount);

  async function handleReaction(postId: string) {
    console.log("Liked");
    let reactRequest: RequestReact = {
      postId: postId,
      isLike: true,
      runnerId: account?.runnerId ?? "",
    };

    try {
      setLikes((prevLikes) => prevLikes + 1);
      const response = await react(reactRequest);
      console.log("reaction response :", response);
      if (response?.statusCode !== 200 || !response?.data.reacted) {
        setLikes((prevLikes) => Math.max(prevLikes - 2));
      }
    } catch (error) {
      console.log(error);
      setLikes((prevLikes) => Math.max(prevLikes - 1, 0));
    }
  }

  const postActions: Action[] = [
    {
      icon: "thumb-up",
      label: `${likes} Likes`,
      iconColor: "lime",
      onPress: () => handleReaction(postId),
    },
    {
      icon: "comment",
      label: `${commentsCount} Comments`,
      onPress: () => console.log("Commented"),
    },
    {
      icon: "share-variant",
      label: "Share",
      onPress: () => console.log("Shared"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <View style={styles.userRow}>
            <AppText>{author}</AppText>
            <AppText>...</AppText>
          </View>
          <View style={styles.timestampWrapper}>
            <AppText>
              {timestamp}
              {location ? ` · ${location}` : ""}
            </AppText>
          </View>
        </View>
      </View>

      {/* Post Text */}
      <View style={styles.postTextWrapper}>
        <AppText>{content}</AppText>
      </View>

      {/* Post Image */}
      {postImage && (
        <Image
          source={{ uri: postImage }}
          style={styles.postImage}
          resizeMode="contain"
        />
      )}

      <View
        style={{
          flexDirection: "row",
          columnGap: 20,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            minWidth: 140,
            justifyContent: "space-between",
          }}
        >
          <ActionButton action={postActions[0]} />
          <ActionButton action={postActions[1]} />
        </View>
        <ActionButton action={postActions[2]} />
      </View>
    </View>
  );
};

export default PostContent;

const styles = StyleSheet.create({
  container: {
    borderColor: colorMap.offWhite,
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    paddingBottom: 9,
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 70,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  timestampWrapper: {
    marginTop: 2,
  },
  postTextWrapper: {
    marginVertical: 10,
  },
  postImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginVertical: 10,
  },
});

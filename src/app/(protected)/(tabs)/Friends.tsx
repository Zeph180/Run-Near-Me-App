import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import FormInput from "@/components/FormInput";
import { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import TabSwitcher from "@/components/TabSwitcher";
import { AppText } from "@/components/AppText";
import PostContent from "@/components/Post";
import { RequestGetPosts } from "@/types/Requests/Post/PostRequests";
import { postService } from "@/Services/api/PostService";
import { useApiMutation } from "@/hooks/useApi";
import { Post } from "@/types/responses/Post/PostResponses";
import { AuthContext } from "@/utils/authContext";

export default function Friends() {
  const { account } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchValue, setSearchValue] = useState();

  const {
    mutate: postRequest,
    isLoading,
    error,
  } = useApiMutation((data) => postService.getPosts(data));

  async function getPosts() {
    let postsRequest: RequestGetPosts = {
      isAdmin: true,
      pageNumber: 10,
      pageSize: 10,
      runnerId: account?.runnerId ?? "",
    };

    try {
      const result = await postRequest(postsRequest);
      if (!result) {
        return;
      }
      if (!result?.success) {
        return;
      }
      setPosts(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const tabs = [
    {
      label: "Posts",
      content: (
        <View>
          <AppText>Posts Content</AppText>
          <View>
            {posts.map((post) => (
              <PostContent
                key={post.postId}
                author={post.poster.nickName}
                profileImage={require("../../../../assets/profile.jpg")}
                timestamp={post.createdAt}
                content={post.caption}
                location={post.location ?? ""}
                likesCount={post.likesCount}
                commentsCount={post.comments.length}
                postId={post.postId}
                {...(post.imageUrl ? { postImage: post.imageUrl } : {})}
              />
            ))}
          </View>
        </View>
      ),
    },
    {
      label: "Requests",
      content: (
        <View>
          <AppText>Requests Content</AppText>
        </View>
      ),
    },
    {
      label: "Leaderboard",
      content: (
        <View>
          <AppText>Leader Boards</AppText>
        </View>
      ),
    },
  ];

  return (
    <AppLinearGradient>
      <PageHeading
        heading="Friends"
        hasNotification={true}
        description="See what your friends have achieved and get inspired"
      />
      <ScrollView>
        <FormInput
          // label="Email"
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="What are you looking for today?"
          secureTextEntry={false}
          autoCapitalize="none"
          // error={errors.email}
          keyboardType="email-address"
          // editable={!isLoading}
          style={{ width: "100%" }}
        />

        <TabSwitcher
          tabs={tabs}
          initialTab={0}
          onTabChange={(index, tab) => getPosts()}
        />
      </ScrollView>
    </AppLinearGradient>
  );
}

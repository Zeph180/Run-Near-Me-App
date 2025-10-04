import { AppLinearGradient } from "@/components/AppLinearGradient";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { PageHeading } from "@/components/PageHeading";
import { AppText } from "@/components/AppText";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/Constants/Colors";
import { useContext, useState } from "react";
import FormInput from "@/components/FormInput";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@/components/Button";
import { useApiMutation } from "@/hooks/useApi";
import { postService } from "@/Services/api/PostService";
import { CreatePostRequest, RNFile } from "@/types/Requests/Post/PostRequests";
import { AuthContext } from "@/utils/authContext";
import { router } from "expo-router";

export default function NewPost() {
  const [caption, setCaption] = useState("");
  const [inputHeight, setInputHeight] = useState(0);
  const [selectedImage, setSelectedImage] = useState<RNFile | null>(null);
  const { account } = useContext(AuthContext);
  const {
    mutate: postRequest,
    isLoading,
    error,
  } = useApiMutation((data) => postService.createPost(data));

  const handlePost = async () => {
    let postRequestData: CreatePostRequest = {
      longitude: "0",
      latitude: "0",
      location: "Kyanja",
      caption: caption,
      postFile: selectedImage,
      runnerId: account?.runnerId ?? "",
    };

    try {
      console.log("Post request : ", postRequestData);
      const response = await postService.createPost(postRequestData);
      if (!response) {
        return;
      }
      if (!response?.success) {
        return;
      }
      console.log(response);
      router.replace("/Friends");
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!",
        );
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 13],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];

        const imageFile: RNFile = {
          uri: asset.uri,
          name: asset.fileName ?? "",
          type: asset.type ?? "",
        };

        setSelectedImage(imageFile);
      }
    } catch (error) {
      console.log("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const takePhoto = async () => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera is required!",
        );
        return;
      }

      // Take photo
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 13],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];

        const imageFile: RNFile = {
          uri: asset.uri,
          name: asset.fileName ?? "",
          type: asset.type ?? "",
        };

        setSelectedImage(imageFile);
      }
    } catch (error) {
      console.log("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const handleImagePress = () => {
    Alert.alert("Select Image", "Choose how you want to add an image", [
      { text: "Camera", onPress: takePhoto },
      { text: "Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <AppLinearGradient style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <PageHeading
            heading="New Post"
            hasNotification={false}
            description="What have you achieved today?"
          />
          <View style={styles.content}>
            <FormInput
              value={caption}
              placeholder="Write something great..."
              secureTextEntry={false}
              autoCapitalize="none"
              keyboardType="default"
              editable={!isLoading}
              onChangeText={setCaption}
              multiline={true}
              style={[styles.textInput, { height: Math.max(120, inputHeight) }]}
              onContentSizeChange={(e) =>
                setInputHeight(e.nativeEvent.contentSize.height)
              }
            />

            {selectedImage ? (
              <View style={styles.imageContainer}>
                <View style={styles.imageHeader}>
                  <TouchableOpacity onPress={removeImage}>
                    <MaterialIcons
                      name="cancel"
                      size={24}
                      color={Colors.lime}
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: selectedImage.uri }}
                  resizeMode="cover"
                  style={styles.selectedImage}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.imagePlaceholder}
                onPress={handleImagePress}
              >
                <MaterialIcons name="add-a-photo" size={48} color="#999" />
                <AppText>Tap to add an image</AppText>
              </TouchableOpacity>
            )}

            <Button
              title="Post"
              onPress={handlePost}
              theme="lime"
              style={{ marginTop: 20 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
  },
  textInput: {
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    marginTop: 20,
  },
  imageHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  selectedImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 13,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  placeholderText: {
    marginTop: 12,
    color: "#999",
    fontSize: 16,
  },
});

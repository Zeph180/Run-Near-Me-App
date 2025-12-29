import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Button, Image, View } from "react-native";

const MediaPicker: React.FunctionComponent = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const action = {
    icon: "camera",
    label: "tt",
    iconColor: "lime",
    onPress: () => pickImage(),
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} />}
    </View>
  );
};

export default MediaPicker;

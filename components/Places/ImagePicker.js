import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Need camera access to take images");
      return false;
    }

    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (!image.canceled) {
        setPickedImage(image.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        ) : (
          <Text>Its your favorite place. Take a pic!!</Text>
        )}
      </View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary50,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

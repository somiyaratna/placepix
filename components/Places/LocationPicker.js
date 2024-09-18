import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getMapPreview } from "../../util/location";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Need location access to get your location");
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      const location = await getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function pickOnMapHandler() {}
  return (
    <View>
      {pickedLocation ? (
        <View style={styles.mapPreview}>
          <Image
            style={styles.image}
            source={{
              uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
            }}
          />
        </View>
      ) : (
        <Text>No location picked yet</Text>
      )}

      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocationHandler}>
          Locate Me
        </OutlinedButton>
        <OutlinedButton icon={"map"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    height: 200,
    width: "100%",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 8,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

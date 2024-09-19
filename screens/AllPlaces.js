import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = ({ route }) => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currPlaces) => [route.params.place, ...currPlaces]);
    }
  }, [isFocused, route]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;

const styles = StyleSheet.create({});

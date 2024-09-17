import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const OutlinedButton = ({ onPress, icon, children }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons
        name={icon}
        size={24}
        color={Colors.primary100}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary100,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary100,
  },
});

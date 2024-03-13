import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const WelcomeBtn = ({ title, onPress,style }) => {
  return (
    <TouchableOpacity style={[styles.button,style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default WelcomeBtn;

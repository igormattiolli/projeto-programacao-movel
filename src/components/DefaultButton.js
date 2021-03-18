import React from "react";
import { View, Text, StyleSheet } from "react-native";
const DefaultButton = ({ label }) => {
  return (
    <View style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00A1E7",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 55,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "ShadowsIntoLight",
  },
});

export default DefaultButton;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DefaultButton = ({ label }) => (
  <View>
    <TouchableOpacity style={style.button}>
      <Text style={style.text}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
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

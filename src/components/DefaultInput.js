import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const DefaultInput = ({ label, labelPlaceHolder, value, secureText }) => (
  <View style={style.view}>
    <TextInput
      value={value}
      style={style.viewInput}
      placeholder={labelPlaceHolder}
      secureTextEntry={secureText}
    ></TextInput>
    <Text style={style.text}>{label}</Text>
  </View>
);

const style = StyleSheet.create({
  view: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
  },
  viewInput: {
    borderWidth: 2,
    borderColor: "#00A1E7",
    borderRadius: 8,
    padding: 4,
    paddingStart: 20,
    paddingEnd: 20,
    width: 300,
    height: 55,
  },
  text: {
    color: "#00A1E7",
    fontSize: 22,
    position: "absolute",
    alignSelf: "flex-start",
    top: -14,
    left: 25,
    paddingBottom: 4,
    backgroundColor: "#FFFFFF",
    fontFamily: "ShadowsIntoLight",
  },
});

export default DefaultInput;

import React, { Component } from "react";
import DefaultInput from "../components/DefaultInput";
import DefaultButton from "../components/DefaultButton";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import HeaderDrawNav from "../components/headerDrawnNav";

export default class Tag extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <StatusBar />
        <View style={styles.container}>
          <View style={styles.containerBackGround}>
            <View style={styles.containerDefault}>
              <Text style={styles.textTitle}>Cadastro de tags</Text>
            </View>
            <View style={styles.containerDefault}>
              <DefaultInput
                label="Tag"
                labelPlaceHolder="Insira o nome da tag"
              />
            </View>
            <View style={styles.containerDefault}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Menu");
                }}
              >
                <DefaultButton label="Confirmar" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0D0D0",
    width: "100%",
    height: Math.round(Dimensions.get("screen").height),
    padding: 10,
  },
  containerBackGround: {
    backgroundColor: "#FFFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDefault: {
    marginVertical: 10,
  },
  textTitle: {
    fontSize: 30,
    color: "#00A1E7",
    fontFamily: "ShadowsIntoLight",
  },
  textNewTag: {
    fontSize: 22,
    color: "#00A1E7",
    marginLeft: 10,
    fontFamily: "ShadowsIntoLight",
  },
  buttonNewTag: {
    flexDirection: "row",
    alignItems: "center",
    width: 150,
  },
});

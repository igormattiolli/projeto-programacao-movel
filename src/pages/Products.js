import React, { Component } from "react";
import DefaultInput from "../components/DefaultInput";
import DefaultButton from "../components/DefaultButton";
import TagModal from "../components/TagModal";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default class Products extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { flag } = this.props.route.params;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerBackGround}>
            <View style={styles.containerDefault}>
              {flag ? (
                <Text style={styles.textTitle}>Editar produto</Text>
              ) : (
                <Text style={styles.textTitle}>Cadastro de Produto</Text>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.textImage}>Enviar imagem de produto</Text>
              <View style={styles.containerImage}>
                <AntDesign name="pluscircle" size={50} color="#00A1E7" />
              </View>
            </View>
            <View style={styles.containerDefault}>
              <DefaultInput
                label="Nome"
                labelPlaceHolder="Insira o nome do produto"
              />
            </View>
            <View style={styles.containerDefault}>
              <DefaultInput
                label="Marca"
                labelPlaceHolder="Insira a marca do produto"
              />
            </View>
            <View style={styles.containerDefault}>
              <DefaultInput
                label="Quantidade"
                labelPlaceHolder="Insira a quantidade do produto"
              />
            </View>
            <TagModal />
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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0D0D0",
    width: "100%",
    padding: 10,
  },
  containerBackGround: {
    backgroundColor: "#FFFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDefault: {
    marginVertical: 15,
  },
  textTitle: {
    fontSize: 30,
    color: "#00A1E7",
    fontFamily: "ShadowsIntoLight",
  },
  textImage: {
    color: "#00A1E7",
    fontSize: 15,
    fontFamily: "ShadowsIntoLight",
  },
  containerImage: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#E5E5E5",
  },
});

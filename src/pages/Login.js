import React from "react";
import Logo from "../../assets/logo.png";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import DefaultButton from "../components/DefaultButton";
import DefaultInput from "../components/DefaultInput";

export default function Login({ loadFont }) {
  return (
    <ScrollView>
      {loadFont ? (
        <View style={styles.container}>
          <View style={styles.containerTitleEasy}>
            <Text style={styles.textTitle}>Easy</Text>
          </View>
          <View style={styles.containerTitleStock}>
            <Text style={styles.textTitle}>Stock</Text>
          </View>
          <Image style={styles.containerImage} source={Logo} />
          <View style={styles.containerDefault}>
            <DefaultInput
              label="E-mail"
              labelPlaceHolder="Insira o seu E-mail"
            />
          </View>
          <View style={styles.containerDefault}>
            <DefaultInput label="Senha" labelPlaceHolder="Insira a sua Senha" />
          </View>
          <View style={styles.containerDefault}>
            <DefaultButton label="Entrar" />
          </View>
          <View style={styles.containerDefault}>
            <Text style={styles.textRegister}>
              Não tem uma conta? Cadastre-se aqui.
            </Text>
          </View>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDefault: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textRegister: {
    fontFamily: "ShadowIntoLight",
    color: "#00A1E7",
    textDecorationLine: "underline",
  },
  textTitle: {
    fontFamily: "ShadowIntoLight",
    color: "#00A1E7",
    fontSize: 30,
  },
  containerTitleEasy: {
    width: 100,
    margin: 20,
  },
  containerTitleStock: {
    width: 100,
    alignItems: "flex-end",
  },
  containerImage: {
    marginBottom: 40,
  },
});

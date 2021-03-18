import React, { Component } from "react";
import { Dimensions } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DefaultButton from "../components/DefaultButton";
import firebase from "firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      senha: "",
      nome: "",
      isLoading: false,
      message: "",
      isCompatible: false,
    };
  }

  async registration() {
    this.setState({ isLoading: true });
    const { isCompatible, email, senha } = this.state;
    if (isCompatible == true) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then(() => {
          this.props.navigation.navigate("Menu");
        })
        .catch((error) => {
          this.setState({ message: this.getMessageByError(error.code) });
        });
    }
    if (isCompatible == false) {
      this.setState({ message: "Confirmação de senha incopativel" });
    }
    this.setState({ isLoading: false });
  }

  checkPassword(valor) {
    const { senha } = this.state;
    if (senha == valor) this.setState({ isCompatible: true });
  }

  onChangeHandLer(field, valor) {
    this.setState({
      [field]: valor,
    });
  }

  getMessageByError(code) {
    switch (code) {
      case "auth/email-already-in-use":
        return "Email ja cadastrado.";
      case "auth/invalid-email":
        return "Email inválido.";
      case "auth/operation-not-allowed":
        return "Operação inválida";
    }
  }

  renderMessage() {
    const { message } = this.state;
    if (!message) return null;
    return (
      <View>
        <Text style={styles.errorMessage}>{message}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Cadastro</Text>
        </View>
        <View style={styles.containerDefault}>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.viewInput}
              placeholder="Insira o seu Nome"
              onChangeText={(value) => this.onChangeHandLer("nome", value)}
            ></TextInput>
            <Text style={styles.textInput}>Nome</Text>
          </View>
        </View>
        <View style={styles.containerDefault}>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.viewInput}
              placeholder="Insira o seu E-mail"
              onChangeText={(value) => this.onChangeHandLer("email", value)}
            ></TextInput>
            <Text style={styles.textInput}>E-mail</Text>
          </View>
        </View>
        <View style={styles.containerDefault}>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.viewInput}
              placeholder="Insira a sua Senha"
              secureTextEntry={true}
              onChangeText={(value) => this.onChangeHandLer("senha", value)}
            ></TextInput>
            <Text style={styles.textInput}>Senha</Text>
          </View>
        </View>
        <View style={styles.containerDefault}>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.viewInput}
              placeholder="Confirme a Senha"
              secureTextEntry={true}
              onChangeText={(value) => {
                this.checkPassword(value);
              }}
            ></TextInput>
            <Text style={styles.textInput}>Confirme a senha</Text>
          </View>
        </View>
        {this.renderMessage()}
        <View style={styles.containerDefault}>
          {this.state.isLoading ? (
            <ActivityIndicator color="#00A1E7" />
          ) : (
            <TouchableOpacity
              onPress={() => {
                this.registration();
              }}
            >
              <DefaultButton label="Entrar" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: Math.round(Dimensions.get("screen").height),
    backgroundColor: "#FFFF",
  },
  containerDefault: {
    margin: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    fontFamily: "ShadowsIntoLight",
    color: "#00A1E7",
    fontSize: 30,
  },
  containerTitle: {
    width: 140,
    margin: 20,
    alignItems: "center",
  },
  containerInput: {
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
  textInput: {
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
  errorMessage: {
    fontSize: 16,
    color: "red",
  },
});

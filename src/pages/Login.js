import React, { Component } from "react";
import { Dimensions } from "react-native";
import Logo from "../../assets/logo.png";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import DefaultButton from "../components/DefaultButton";
import LogoEasyStock from "../../assets/logo_easy_stock.jpeg";
import { Login } from "../actions";
import { connect } from "react-redux";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      message: "",
    };
  }
  async login() {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    this.props
      .Login({ email, password })
      .then(() => {
        this.props.navigation.navigate("Menu");
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ message: this.getMessageByError(error.code) });
        this.setState({ isLoading: false });
      });
  }

  getMessageByError(code) {
    switch (code) {
      case "auth/wrong-password":
        return "Senha incorreta.";
      default:
        return "E-mail invalido";
    }
  }

  onChangeHandLer(field, value) {
    this.setState({
      [field]: value,
    });
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
        <Image source={LogoEasyStock} style={{ height: 100, width: 150 }} />
        <Image style={styles.containerImage} source={Logo} />
        <View style={styles.containerDefault}>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.viewInput}
              placeholder="Insira o seu E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
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
              onChangeText={(value) => this.onChangeHandLer("password", value)}
            ></TextInput>
            <Text style={styles.textInput}>Senha</Text>
          </View>
        </View>
        {this.renderMessage()}
        <View style={styles.containerDefault}>
          {this.state.isLoading ? (
            <ActivityIndicator color="#00A1E7" />
          ) : (
            <TouchableOpacity onPress={() => this.login()}>
              <DefaultButton label="Entrar" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.containerDefault}>
          <Text
            style={styles.textRegister}
            onPress={() => {
              this.props.navigation.navigate("Cadastro");
            }}
          >
            Não tem uma conta? Cadastre-se aqui.
          </Text>
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
    backgroundColor: "#ffff",
    height: Math.round(Dimensions.get("screen").height),
  },
  containerDefault: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textRegister: {
    fontFamily: "ShadowsIntoLight",
    color: "#00A1E7",
    textDecorationLine: "underline",
  },
  textTitle: {
    fontFamily: "ShadowsIntoLight",
    color: "#00A1E7",
    fontSize: 30,
  },
  containerImage: {
    marginBottom: 40,
  },
  containerInput: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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

export default connect(null, { Login })(LoginPage);

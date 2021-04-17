import React, { Component } from "react";
import { showMessage } from "react-native-flash-message";
import DefaultButton from "../components/DefaultButton";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import {
  setFieldTag,
  saveTag,
  resetFormTag,
  setAllFieldsTag,
} from "../actions";
class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: "",
    };
  }
  componentDidMount() {
    const { setAllFieldsTag, resetFormTag } = this.props;
    const { params } = this.props.route;

    if (params && params.tagToEdit) {
      setAllFieldsTag(params.tagToEdit);
    } else {
      resetFormTag();
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
    const { tagForm, setFieldTag, saveTag } = this.props;
    return (
      <>
        <StatusBar />
        <View style={styles.container}>
          <View style={styles.containerBackGround}>
            <View style={styles.containerDefault}>
              <Text style={styles.textTitle}>Cadastro de tags</Text>
            </View>
            <View style={styles.containerDefault}>
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.viewInput}
                  placeholder="Insira o nome da tag"
                  value={tagForm.tagName}
                  onChangeText={(value) => setFieldTag("tagName", value)}
                ></TextInput>
                <Text style={styles.textInput}>Tag</Text>
              </View>
            </View>
            {this.renderMessage()}
            <View style={styles.containerDefault}>
              {this.state.isLoading ? (
                <ActivityIndicator color="#00A1E7" />
              ) : (
                <TouchableOpacity
                  onPress={async () => {
                    this.setState({ isLoading: true });
                    try {
                      await saveTag(tagForm);
                      this.props.navigation.navigate("Menu");
                      showMessage({
                        description: "Tag",
                        message: "Tag editada/cadastrada com sucesso",
                        duration: 5000,
                        type: "success",
                      });
                    } catch {
                      this.setState({
                        message: "Erro ao cadastrar/editar tag",
                      });
                    } finally {
                      this.setState({ isLoading: false });
                    }
                  }}
                >
                  <DefaultButton label="Confirmar" />
                </TouchableOpacity>
              )}
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
  containerInput: {
    alignItems: "center",
    justifyContent: "center",
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
const mapStateToProps = (state) => {
  return {
    tagForm: state.tagForm,
  };
};
const mapDispatchToProps = {
  setFieldTag,
  saveTag,
  resetFormTag,
  setAllFieldsTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag);

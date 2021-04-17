import Modal from "react-native-modal";
import React, { Component } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  setFieldTag,
  saveTag,
  resetFormTag,
  setAllFieldsTag,
} from "../actions";
import { connect } from "react-redux";

class TagModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isModalVisible: false,
    };
  }
  componentDidMount() {}

  render() {
    const { tagForm, setFieldTag, saveTag, setAllFieldsTag } = this.props;
    if (this.props.tag && this.state.isModalVisible) {
      setAllFieldsTag(this.props.tag);
    }
    return (
      <>
        <TouchableOpacity
          style={styles.containerOptions}
          onPress={() => {
            this.setState({ ModalVisible: true });
          }}
        >
          <Feather name="edit" size={24} color="#00A1E7" />
          <Text style={styles.textList}>Editar</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible} style={styles.Modal}>
          <View style={styles.containerModal}>
            <Text style={styles.text}>Edição da tag</Text>
            <View style={styles.containerInput}>
              <TextInput
                style={styles.viewInput}
                placeholder="Insira o nome da tag"
                value={tagForm.tagName}
                onChangeText={(value) => setFieldTag("tagName", value)}
              ></TextInput>
              <Text style={styles.textInput}>Tag</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.buttonOption}
                  onPress={() => this.setState({ ModalVisible: false })}
                >
                  <Text style={styles.textCancel}>Cancelar</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: "50%", alignItems: "center" }}>
                {this.state.isLoading ? (
                  <ActivityIndicator color="#00A1E7" />
                ) : (
                  <TouchableOpacity
                    style={styles.buttonOption}
                    onPress={async () => {
                      this.setState({ isLoading: true });
                      try {
                        await saveTag(tagForm);
                        this.setState({ ModalVisible: false });
                      } finally {
                        this.setState({ isLoading: false });
                      }
                    }}
                  >
                    <Text style={styles.textConfirm}>Confirmar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}
const styles = StyleSheet.create({
  Modal: {
    margin: 0,
    flex: 1,
  },
  containerModal: {
    backgroundColor: "#ffff",
    width: "100%",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  text: {
    color: "#00A1E7",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
    fontFamily: "ShadowsIntoLight",
  },
  buttonOption: {
    backgroundColor: "#ffff",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 55,
    elevation: 5,
    marginVertical: 7,
  },
  textCancel: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "ShadowsIntoLight",
  },
  textConfirm: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "ShadowsIntoLight",
  },
  containerOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  textList: {
    color: "#00A1E7",
    fontSize: 20,
    marginLeft: 15,
    fontFamily: "ShadowsIntoLight",
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

export default connect(mapStateToProps, mapDispatchToProps)(TagModal);

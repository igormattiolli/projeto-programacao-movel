import Modal from "react-native-modal";
import { showMessage } from "react-native-flash-message";
import React, { Component } from "react";
import { Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
import { deleteProduct, deleteTag } from "../actions";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

class AlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isLoading: false,
    };
  }
  render() {
    return (
      <>
        {this.props.flag === "product" ? (
          <Entypo
            name="trash"
            size={24}
            color="red"
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.containerOptions}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <Entypo name="trash" size={24} color="red" />
            <Text style={styles.textList}>Excluir</Text>
          </TouchableOpacity>
        )}
        <Modal isVisible={this.state.isModalVisible} style={styles.Modal}>
          <View style={styles.containerModal}>
            <Text style={styles.text}>
              Tem certeza que deseja deletar {this.props.label}?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.buttonOption}
                  onPress={() => this.setState({ isModalVisible: false })}
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
                      if (this.props.flag === "product") {
                        try {
                          this.props.deleteProduct(this.props.item);
                          showMessage({
                            description: "Deleção de produto",
                            message: "Produto deletado com sucesso",
                            duration: 5000,
                            type: "success",
                          });
                        } catch {
                          showMessage({
                            description: "Deleção de produto",
                            message: "Erro ao deletar produto",
                            duration: 5000,
                            type: "danger",
                          });
                        } finally {
                          this.setState({ isModalVisible: false });
                          this.setState({ isLoading: false });
                        }
                      } else if (this.props.flag === "tag") {
                        try {
                          this.props.deleteTag(this.props.item);
                          showMessage({
                            description: "Deleção de Tag",
                            message: "Tag deletada com sucesso",
                            duration: 5000,
                            type: "success",
                          });
                        } catch {
                          showMessage({
                            description: "Deleção de tag",
                            message: "Erro ao deletar tag",
                            duration: 5000,
                            type: "danger",
                          });
                        } finally {
                          this.setState({ isModalVisible: false });
                          this.setState({ isLoading: false });
                        }
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
    backgroundColor: "#00A1E7",
    width: "100%",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
    fontFamily: "ShadowsIntoLight",
  },
  buttonOption: {
    backgroundColor: "#FFFFFF",
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
});

const mapDispatchToProps = {
  deleteProduct,
  deleteTag,
};

export default connect(null, mapDispatchToProps)(AlertModal);

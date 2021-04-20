import React, { Component } from "react";
import DefaultButton from "../components/DefaultButton";
import TagModal from "../components/TagModal";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { setField, saveProduct, setAllFields, resetForm } from "../actions";
import { showMessage } from "react-native-flash-message";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      isLoading: false,
      message: "",
      isCamera: false,
      hasPermission: false,
    };
  }
  async componentDidMount() {
    const { setAllFields, resetForm } = this.props;
    const { params } = this.props.route;

    if (params && params.productToEdit) {
      setAllFields(params.productToEdit);
      this.setState({ flag: true });
    } else {
      resetForm();
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      this.setState({ hasPermission: true });
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

  async viewGaleria() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (result) {
      this.props.setField("imageProduct", result.base64);
    }
  }

  viewForm() {
    const { productForm, setField, saveProduct, navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerBackGround}>
            <View style={styles.containerDefault}>
              {this.state.flag ? (
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
              {productForm.imageProduct ? (
                <TouchableOpacity
                  onPress={() => {
                    this.viewGaleria();
                  }}
                >
                  <Image
                    source={{
                      uri: `data:image/jpg;base64,${productForm.imageProduct}`,
                    }}
                    style={styles.img}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.containerImage}>
                  <AntDesign
                    onPress={() => {
                      Alert.alert(
                        "Inserir imagem",
                        "Escolher imagem a partir da galeria",
                        [
                          {
                            text: "Sair",
                          },
                          {
                            text: "Galeria",
                            onPress: () => {
                              this.viewGaleria();
                            },
                          },
                        ]
                      );
                    }}
                    name="pluscircle"
                    size={50}
                    color="#00A1E7"
                  />
                </View>
              )}
            </View>
            <View style={styles.containerDefault}>
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.viewInput}
                  placeholder="Insira o nome do produto"
                  value={productForm.nameProduct}
                  onChangeText={(value) => setField("nameProduct", value)}
                ></TextInput>
                <Text style={styles.textInput}>Nome</Text>
              </View>
            </View>
            <View style={styles.containerDefault}>
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.viewInput}
                  placeholder="Insira a marca do produto"
                  value={productForm.brandProduct}
                  onChangeText={(value) => setField("brandProduct", value)}
                ></TextInput>
                <Text style={styles.textInput}>Marca</Text>
              </View>
            </View>
            <View style={styles.containerDefault}>
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.viewInput}
                  placeholder="Insira a quantidade do produto"
                  value={productForm.amountProduct}
                  onChangeText={(value) => setField("amountProduct", value)}
                  keyboardType="numeric"
                ></TextInput>
                <Text style={styles.textInput}>Quantidade</Text>
              </View>
            </View>
            <View style={styles.containerModalTag}>
              <TagModal />
              <Text style={styles.textTag}>{productForm.tagProduct}</Text>
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
                      await saveProduct(productForm);
                      navigation.goBack();
                      if (this.state.flag) {
                        showMessage({
                          description: "Edição de produto",
                          message: "Produto editado com sucesso",
                          duration: 5000,
                          type: "success",
                        });
                      } else {
                        showMessage({
                          description: "Cadastro de produto",
                          message: "Produto cadastrado com sucesso",
                          duration: 5000,
                          type: "success",
                        });
                      }
                    } catch {
                      if (this.state.flag) {
                        this.setState({
                          message: "Erro ao editar produto",
                        });
                      } else {
                        this.setState({
                          message: "Erro ao cadastrar produto",
                        });
                      }
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
      </ScrollView>
    );
  }

  render() {
    return this.viewForm();
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
  containerModalTag: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  textTag: {
    fontFamily: "ShadowsIntoLight",
    color: "#00A1E7",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  viewCamera: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#ffff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    productForm: state.productForm,
  };
};

const mapDispatchToProps = {
  setField,
  saveProduct,
  setAllFields,
  resetForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

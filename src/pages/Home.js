import React, { Component } from "react";
import FAB from "react-native-fab";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import imageTeste from "../../assets/imageteste.png";
import AlertModal from "../components/AlertModal";
import HeaderDrawNav from "../components/headerDrawnNav";
import { listProducts } from "../actions";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    const { params } = this.props.route;
    if (params && params.tag) {
      await this.props.listProducts(params.tag.tagName);
    } else {
      await this.props.listProducts();
    }
    this.setState({ isLoading: false });
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color="#00A1E7" />
        </View>
      );
    }
    return (
      <>
        <StatusBar />
        <HeaderDrawNav navigation={this.props.navigation} />
        <View style={styles.container}>
          <FlatList
            data={this.props.products}
            renderItem={({ item }) => (
              <View style={styles.containerViewFaltList}>
                <View style={styles.containerRow}>
                  <View style={styles.containerIcon}>
                    <Feather
                      name="edit"
                      size={24}
                      color="#00A1E7"
                      style={{ marginHorizontal: 15 }}
                      onPress={() => {
                        this.props.navigation.navigate("Cadastro de produtos", {
                          productToEdit: item,
                        });
                      }}
                    />
                    <AlertModal
                      label="o produto"
                      flag={"product"}
                      item={item}
                    />
                  </View>
                  <View style={styles.containerImage}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: `data:image/jpg;base64,${item.imageProduct}`,
                      }}
                    />
                  </View>
                  <View style={{ width: "70%" }}>
                    <View style={{ width: "70%" }}>
                      <Text style={styles.text}>Nome: {item.nameProduct}</Text>
                    </View>
                    <Text style={styles.text}>Marca: {item.brandProduct}</Text>
                    <Text style={styles.text}>
                      Quantidades: {item.amountProduct}
                    </Text>
                    <Text style={styles.text}>Tags: {item.tagProduct}</Text>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.text}>Lista Vazia</Text>
              </View>
            )}
            keyExtractor={(_item, index) => index.toString()}
          />
          <FAB
            buttonColor="#00A1E7"
            iconTextColor="#FFFFFF"
            visible={true}
            onClickAction={() => {
              this.props.navigation.navigate("Cadastro de produtos");
            }}
          />
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
    padding: 10,
  },
  containerViewFaltList: {
    backgroundColor: "#FFFF",
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 6,
    padding: 10,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  text: {
    fontSize: 18,
    color: "#00A1E7",
    fontFamily: "ShadowsIntoLight",
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  containerImage: {
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 35,
  },
  containerIcon: {
    flexDirection: "row",
    marginLeft: 250,
    paddingVertical: 5,
    width: "100%",
    position: "absolute",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => {
  const { productsList } = state;

  if (productsList === null) {
    return { products: productsList };
  }

  const keys = Object.keys(productsList);
  const productsWithId = keys.map((key) => {
    return { ...productsList[key], productId: key };
  });
  return { products: productsWithId };
};
export default connect(mapStateToProps, { listProducts })(Home);

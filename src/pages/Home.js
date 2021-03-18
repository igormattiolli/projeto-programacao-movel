import React, { Component } from "react";
import FAB from "react-native-fab";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import imageTeste from "../../assets/imageteste.png";
import AlertModal from "../components/AlertModal";
import HeaderDrawNav from "../components/headerDrawnNav";
const DATA = [
  {
    id: "1",
    nameProduct: "Cadeira Gamer",
    brandProduct: "ACER",
    amountProduct: 1,
    tagProduct: "Notebook",
  },
  {
    id: "2",
    nameProduct: "First Item",
    brandProduct: "ACER",
    amountProduct: 1,
    tagProduct: "Notebook, Gamer",
  },
  {
    id: "3",
    nameProduct: "First Item",
    brandProduct: "ACER",
    amountProduct: 1,
    tagProduct: "Notebook",
  },
  {
    id: "4",
    nameProduct: "First Item",
    brandProduct: "ACER",
    amountProduct: 1,
    tagProduct: "Notebook",
  },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <StatusBar />
        <HeaderDrawNav navigation={this.props.navigation} />
        <View style={styles.container}>
          <FlatList
            data={DATA}
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
                          flag: true,
                        });
                      }}
                    />
                    <AlertModal label="o produto" flag={true} />
                  </View>
                  <View style={styles.containerImage}>
                    <Image source={imageTeste} />
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
            keyExtractor={(_item, index) => index.toString()}
          />
          <FAB
            buttonColor="#00A1E7"
            iconTextColor="#FFFFFF"
            visible={true}
            onClickAction={() => {
              this.props.navigation.navigate("Cadastro de produtos", {
                flag: false,
              });
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
  },
  containerIcon: {
    flexDirection: "row-reverse",
    paddingVertical: 5,
    width: "100%",
    position: "absolute",
  },
});

import React from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import imageTeste from "../../assets/imageteste.png";
const DATA = [
  {
    id: "1",
    nameProduct: "First Item",
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

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View style={styles.containerViewFaltList}>
              <View style={styles.containerRow}>
                <View style={styles.containerImage}>
                  <Image source={imageTeste} />
                </View>
                <View style={{ width: "70%", borderWidth: 1 }}>
                  <View
                    style={{ flexDirection: "row-reverse", paddingVertical: 5 }}
                  >
                    <Feather
                      name="edit"
                      size={24}
                      color="#00A1E7"
                      style={{ marginHorizontal: 10 }}
                    />
                    <Entypo name="trash" size={24} color="red" />
                  </View>
                  <Text style={styles.text}>Nome: {item.nameProduct}</Text>
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
      </View>
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
  },
  text: {
    fontSize: 18,
    color: "#00A1E7",
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    width: "100%",
  },
  containerImage: {
    borderWidth: 1,
    justifyContent: "center",
  },
});

export default Home;

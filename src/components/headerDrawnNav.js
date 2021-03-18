import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Logo from "../../assets/logo_easy_stock.jpeg";

import Icon from "react-native-vector-icons/FontAwesome";

Icon.loadFont();

export default function HeaderDrawNav({ title, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name="bars" size={30} color="#00A1E7" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerTitle}>
        <Image source={Logo} style={{ height: 40, width: 60 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    height: 60,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffff",
  },
  containerTitle: {
    backgroundColor: "#ffff",
    width: "100%",
    marginLeft: "31%",
  },
  containerButton: {
    justifyContent: "center",
    backgroundColor: "#ffff",
    paddingHorizontal: 10,
  },
});

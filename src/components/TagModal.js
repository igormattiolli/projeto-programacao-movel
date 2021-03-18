import Modal from "react-native-modal";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const DATA = [
  {
    id: "1",
    nameTag: "Cadeira Gamer",
  },
  {
    id: "2",
    nameTag: "First Item",
  },
  {
    id: "3",
    nameTag: "First Item",
  },
  {
    id: "4",
    nameTag: "First Item",
  },
];
const TagModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.containerButton}>
        <TouchableHighlight
          style={{ borderWidth: 0.2, borderRadius: 20, width: "30%" }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <View style={styles.buttonTag}>
            <Text style={styles.textButtonTag}>Tag</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#00A1E7" />
          </View>
        </TouchableHighlight>
      </View>
      <Modal isVisible={isModalVisible} style={styles.Modal}>
        <View style={styles.containerModal}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>{item.nameTag}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(_item, index) => index.toString()}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%", alignItems: "center" }}>
              <TouchableOpacity
                style={styles.buttonOption}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textCancel}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "50%", alignItems: "center" }}>
              <TouchableOpacity style={styles.buttonOption}>
                <Text style={styles.textConfirm}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
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
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
    elevation: 5,
    marginVertical: 7,
  },
  text: {
    color: "#00A1E7",
    fontSize: 20,
    fontWeight: "bold",
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
  containerButton: {
    alignItems: "flex-start",
    width: "90%",
    marginVertical: 14,
  },
  buttonTag: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textButtonTag: {
    color: "#00A1E7",
    fontFamily: "ShadowsIntoLight",
  },
});

export default TagModal;

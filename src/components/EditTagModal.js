import Modal from "react-native-modal";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import DefaultInput from "../components/DefaultInput";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TagModal = ({ tag }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.containerOptions}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Feather name="edit" size={24} color="#00A1E7" />
        <Text style={styles.textList}>Editar</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} style={styles.Modal}>
        <View style={styles.containerModal}>
          <Text style={styles.text}>Edição da tag</Text>
          <DefaultInput label="Tag" labelPlaceHolder={tag} />
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
});

export default TagModal;

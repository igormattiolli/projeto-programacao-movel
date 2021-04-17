import Modal from "react-native-modal";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setField, listTags } from "../actions";

class TagModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }
  componentDidMount() {
    this.props.listTags();
  }
  render() {
    const { setField } = this.props;
    return (
      <>
        <View style={styles.containerButton}>
          <TouchableHighlight
            style={{ borderWidth: 0.2, borderRadius: 20, width: "100%" }}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <View style={styles.buttonTag}>
              <Text style={styles.textButtonTag}>Tag</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#00A1E7" />
            </View>
          </TouchableHighlight>
        </View>
        <Modal isVisible={this.state.isModalVisible} style={styles.Modal}>
          <View style={styles.containerModal}>
            <FlatList
              data={this.props.tags}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setField("tagProduct", item.tagName);
                    this.setState({ isModalVisible: false });
                  }}
                >
                  <Text style={styles.text}>{item.tagName}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(_item, index) => index.toString()}
            />
            <View style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                style={styles.buttonOption}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}
              >
                <Text style={styles.textCancel}>Cancelar</Text>
              </TouchableOpacity>
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
    width: "100%",
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
    marginVertical: 14,
    width: "25%",
    marginRight: 10,
  },
  buttonTag: {
    padding: 4,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  textButtonTag: {
    color: "#00A1E7",
    fontFamily: "ShadowsIntoLight",
  },
});
const mapStateToProps = (state) => {
  const { tagsList } = state;

  if (tagsList === null) {
    return { tags: tagsList };
  }

  const keys = Object.keys(tagsList);
  const tagsWithId = keys.map((key) => {
    return { ...tagsList[key], tagId: key };
  });
  return { tags: tagsWithId };
};
const mapDispatchToProps = {
  setField,
  listTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagModal);

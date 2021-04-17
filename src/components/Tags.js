import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import AlertModal from "../components/AlertModal";
import EditTagModal from "../components/EditTagModal";
import { connect } from "react-redux";
import { listTags, listProducts } from "../actions";
import { Feather } from "@expo/vector-icons";

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openOptions: false,
      openItem: "",
    };
  }
  componentDidMount() {
    this.props.listTags();
  }

  render() {
    const Options = ({ item }) => {
      return (
        <View style={{ backgroundColor: "#CCEAFF" }}>
          <TouchableOpacity
            style={styles.containerOptions}
            onPress={() => {
              this.props.navigation.navigate("Tag", {
                tagToEdit: item,
              });
            }}
          >
            <Feather name="edit" size={24} color="#00A1E7" />
            <Text style={styles.textList}>Editar</Text>
          </TouchableOpacity>
          <View style={styles.containerOptions}>
            <AlertModal label="a tag" flag="tag" item={item} />
          </View>
        </View>
      );
    };
    return (
      <>
        <Text style={styles.textTitle}>Menu de Tags</Text>
        <FlatList
          data={this.props.tags}
          renderItem={({ item }) => (
            <>
              <View style={styles.containerView}>
                <TouchableOpacity
                  style={styles.containerList}
                  onPress={() => {
                    this.props.navigation.navigate("Home", {
                      tag: item,
                    });
                    this.props.listProducts(item.tagName);
                  }}
                >
                  <AntDesign name="tag" size={24} color="#00A1E7" />
                  <View style={{ width: "70%" }}>
                    <Text style={styles.textList}>{item.tagName}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo
                    name="dots-three-vertical"
                    size={24}
                    color="#00A1E7"
                    onPress={() => {
                      this.state.openOptions === true
                        ? this.setState({ openOptions: false })
                        : this.setState({ openOptions: true });
                      this.setState({ openItems: item.tagId });
                    }}
                  />
                </TouchableOpacity>
              </View>
              {this.state.openOptions === true &&
              this.state.openItems === item.tagId ? (
                <Options item={item} />
              ) : null}
            </>
          )}
          keyExtractor={(_item, index) => index.toString()}
          ListHeaderComponent={() => (
            <View style={styles.containerView}>
              <TouchableOpacity
                style={styles.containerList}
                onPress={() => {
                  this.props.navigation.navigate("Home");
                  this.props.listProducts();
                }}
              >
                <AntDesign name="tag" size={24} color="#00A1E7" />
                <View style={{ width: "70%" }}>
                  <Text style={styles.textList}>Todas</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
              }}
              onPress={() => {
                this.props.navigation.navigate("Tag");
              }}
            >
              <AntDesign name="plus" size={24} color="#00A1E7" />
              <Text
                style={{
                  color: "#00A1E7",
                  fontSize: 20,
                  marginLeft: 43,
                  fontFamily: "ShadowsIntoLight",
                }}
              >
                Nova tag
              </Text>
            </TouchableOpacity>
          )}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  drawerStyle: {
    width: 250,
  },
  containerList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  containerView: {
    alignItems: "center",
    flexDirection: "row",
  },
  containerOptions: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  textList: {
    color: "#00A1E7",
    fontSize: 20,
    marginLeft: 15,
    fontFamily: "ShadowsIntoLight",
  },
  textTitle: {
    color: "#00A1E7",
    marginLeft: 20,
    fontSize: 20,
    paddingTop: 10,
    fontFamily: "ShadowsIntoLight",
  },
  containerOptionsEdit: {
    flexDirection: "row",
    alignItems: "center",
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
  listTags,
  listProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Tags);

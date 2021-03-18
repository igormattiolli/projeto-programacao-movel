import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import AlertModal from "../components/AlertModal";
import EditTagModal from "../components/EditTagModal";
import Home from "../pages/Home";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
const Drawer = createDrawerNavigator();
const data = [
  {
    id: "1",
    nameTag: "Cadeira Gamer",
  },
  {
    id: "2",
    nameTag: "Notebook",
  },
  {
    id: "3",
    nameTag: "Teclado",
  },
  {
    id: "4",
    nameTag: "Mouse",
  },
];

export default function Menu() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={styles.drawerStyle}
      drawerContentOptions={{
        labelStyle: {
          fontSize: 18,
          color: "#00A1E7",
          fontFamily: "ShadowsIntoLight",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <>
      <Tags {...props} />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          props.navigation.popToTop();
        }}
        labelStyle={{
          fontSize: 18,
          color: "#00A1E7",
          fontFamily: "ShadowsIntoLight",
        }}
      />
    </>
  );
}

function Tags(props) {
  const [openOptions, setOpenOption] = useState(false);
  const [openItem, setOpenItem] = useState("");
  const Options = ({ tag }) => (
    <View style={{ backgroundColor: "#CCEAFF" }}>
      <View style={styles.containerOptions}>
        <EditTagModal tag={tag} />
      </View>
      <View style={styles.containerOptions}>
        <AlertModal label="a tag" />
      </View>
    </View>
  );
  return (
    <>
      <Text style={styles.textTitle}>Menu de Tags</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <>
            <View style={styles.containerView}>
              <TouchableOpacity
                style={styles.containerList}
                onPress={() => {
                  props.navigation.navigate("Home");
                }}
              >
                <AntDesign name="tag" size={24} color="#00A1E7" />
                <View style={{ width: "70%" }}>
                  <Text style={styles.textList}>{item.nameTag}</Text>
                </View>
              </TouchableOpacity>
              <Entypo
                name="dots-three-vertical"
                size={24}
                color="#00A1E7"
                onPress={() => {
                  openOptions ? setOpenOption(false) : setOpenOption(true);
                  setOpenItem(item.id);
                }}
              />
            </View>
            {openOptions && openItem === item.id ? (
              <Options tag={item.nameTag} />
            ) : null}
          </>
        )}
        keyExtractor={(_item, index) => index.toString()}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
            onPress={() => {
              props.navigation.navigate("Tag");
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
});

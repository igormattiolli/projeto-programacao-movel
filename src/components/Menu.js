import * as React from "react";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import Home from "../pages/Home";
import Tags from "./Tags";
const Drawer = createDrawerNavigator();

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

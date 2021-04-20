import React from "react";
import { LogBox } from "react-native";
import { registerRootComponent } from "expo";
import { Image, StyleSheet, View, ActivityIndicator } from "react-native";
import Login from "./src/pages/Login";
import Products from "./src/pages/Products";
import Register from "./src/pages/Register";
import Tag from "./src/pages/Tag";
import Logo from "./assets/logo_easy_stock.jpeg";
import Menu from "./src/components/Menu";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./src/reducers";
const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(reduxThunk));

function LogoTitle() {
  return (
    <View style={styles.containerTitle}>
      <Image source={Logo} style={{ height: 40, width: 60 }} />
    </View>
  );
}
export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      ShadowsIntoLight: require("./assets/fonts/ShadowsIntoLight.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
    LogBox.ignoreAllLogs();
    if (!firebase.apps.length) {
      var firebaseConfig = {
        apiKey: "AIzaSyB7hQGPYJX1-KxmAbAU0eIQ8kjwM2GdoIE",
        authDomain: "projetomobile-63ea7.firebaseapp.com",
        projectId: "projetomobile-63ea7",
        storageBucket: "projetomobile-63ea7.appspot.com",
        messagingSenderId: "60018478999",
        appId: "1:60018478999:web:5e22c3b75cb2844b163ed2",
        measurementId: "G-5Q02XKY3ZZ",
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.fontsLoaded ? (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Cadastro"
                component={Register}
                options={{
                  headerTitle: (props) => <LogoTitle {...props} />,
                  headerStyle: {
                    backgroundColor: "#fff",
                  },
                  headerTintColor: "#00A1E7",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="Tag"
                component={Tag}
                options={{
                  headerTitle: (props) => <LogoTitle {...props} />,
                  headerStyle: {
                    backgroundColor: "#fff",
                  },
                  headerTintColor: "#00A1E7",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="Cadastro de produtos"
                component={Products}
                options={{
                  headerTitle: (props) => <LogoTitle {...props} />,
                  headerStyle: {
                    backgroundColor: "#fff",
                  },
                  headerTintColor: "#00A1E7",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
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
        )}
      </Provider>
    );
  }
}
registerRootComponent(App);

const styles = StyleSheet.create({
  containerTitle: {
    backgroundColor: "#ffff",
    width: "100%",
    marginLeft: "31%",
  },
});

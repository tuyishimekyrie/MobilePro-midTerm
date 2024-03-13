import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import Signup from "./src/screens/Signup";
import About from "./src/screens/About";
import Login from "./src/screens/Login";
// import Forms from "./src/screens/forms";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* <Stack.Navigator> */}
        {/* <Stack.Screen
          name="Forms"
          component={Forms}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={About}
          // options={{ headerShown: false }}
          options={{
            headerStyle: {
              backgroundColor: "blue", // Change the background color
            },
            headerTintColor: "white", // Change the text color
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          // options={{ headerShown: false }}
          options={{
            headerStyle: {
              backgroundColor: "#062141", // Change the background color
            },
            headerTintColor: "white", // Change the text color
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          // options={{ headerShown: false }}
          options={{
            headerStyle: {
              backgroundColor: "#062141", // Change the background color
            },
            headerTintColor: "white", // Change the text color
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

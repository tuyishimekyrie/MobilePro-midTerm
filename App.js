import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import Signup from "./src/screens/Signup";
import About from "./src/screens/About";
import Login from "./src/screens/Login";
import QuizList from "./src/screens/QuizList";
// import Forms from "./src/screens/forms";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountNavigator from "./src/navigation/AccountNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import AdminNavigator from "./src/navigation/AdminNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";


function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Quiz">
    //     <Stack.Screen
    //       name="Welcome"
    //       component={WelcomeScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="About"
    //       component={About}
    //       options={{
    //         headerStyle: {
    //           backgroundColor: "blue",
    //         },
    //         headerTintColor: "white",           }}
    //     />
    //     <Stack.Screen
    //       name="Signup"
    //       component={Signup}
    //       options={{
    //         headerStyle: {
    //           backgroundColor: "#062141",
    //         },
    //         headerTintColor: "white",
    //       }}
    //     />
    //     <Stack.Screen
    //       name="Login"
    //       component={Login}
    //       options={{
    //         headerStyle: {
    //           backgroundColor: "#062141",
    //         },
    //         headerTintColor: "white",
    //       }}
    //     />
    //     <Stack.Screen
    //       name="Quiz"
    //       component={QuizList}
    //       options={{ headerShown: false }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      {/* <AccountNavigator /> */}
      <AdminNavigator />
      {/* <AuthNavigator /> */}
    </NavigationContainer>
  );
}

export default App;
